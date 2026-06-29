-- ==========================================
-- SCHÉMA DE BASE DE DONNÉES UNIQUE VOYAGE
-- ==========================================

-- 1. Création de la table 'users' liée à Supabase Auth
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  whatsapp_number TEXT UNIQUE NOT NULL,
  is_vip BOOLEAN DEFAULT false,
  referrals_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Configuration de la sécurité (RLS) pour 'users'
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Politique : Un utilisateur ne peut lire QUE ses propres données
CREATE POLICY "Les utilisateurs peuvent voir leurs propres données"
ON public.users
FOR SELECT
USING (auth.uid() = id);

-- Politique : Un utilisateur ne peut modifier QUE ses propres données
CREATE POLICY "Les utilisateurs peuvent modifier leurs propres données"
ON public.users
FOR UPDATE
USING (auth.uid() = id);

-- 3. Création de la table 'waitlist' pour la page d'accueil
CREATE TABLE public.waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  whatsapp_number TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Configuration de la sécurité (RLS) pour 'waitlist'
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Politique : Autoriser n'importe qui (même anonyme) à s'inscrire sur la liste d'attente
CREATE POLICY "Tout le monde peut s'inscrire sur la waitlist"
ON public.waitlist
FOR INSERT
WITH CHECK (true);

-- Politique : Seuls les administrateurs pourraient lire la liste (par défaut, personne ne peut lire avec RLS activé et sans politique SELECT)
-- (Laisser vide empêche les visiteurs de lire les numéros des autres)

-- ==========================================
-- (Optionnel) TRIGGER POUR AUTO-CRÉATION
-- ==========================================
-- Créer automatiquement une ligne dans public.users quand un compte est créé dans auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, whatsapp_number)
  -- Supabase Auth stockera le numéro dans new.phone si vous utilisez l'OTP WhatsApp
  VALUES (new.id, COALESCE(new.phone, new.raw_user_meta_data->>'whatsapp_number', ''));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ==========================================
-- 5. TABLE DETECTED_DEALS (Deals détectés par le cron)
-- ==========================================
CREATE TABLE public.detected_deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Infos vol
  origin TEXT NOT NULL DEFAULT 'ABJ',
  destination TEXT NOT NULL,
  destination_name TEXT,
  airline TEXT,
  airline_name TEXT,
  departure_date DATE NOT NULL,
  return_date DATE,
  price_fcfa INTEGER NOT NULL,
  currency TEXT DEFAULT 'XOF',

  -- Contexte marché
  average_price_fcfa INTEGER,      -- prix moyen constaté sur la route
  discount_percent NUMERIC(5,2),   -- % de réduction vs le prix moyen
  is_lowest_price BOOLEAN DEFAULT false,

  -- Hébergement suggéré
  hotel_name TEXT,
  hotel_price_fcfa INTEGER,
  hotel_stars INTEGER,

  -- Pipeline IA
  is_processed BOOLEAN DEFAULT false,    -- L'IA a-t-elle traité cette offre ?
  is_sent BOOLEAN DEFAULT false,         -- L'alerte a-t-elle été envoyée aux membres ?
  sent_at TIMESTAMP WITH TIME ZONE,

  -- Métadonnées source
  source TEXT DEFAULT 'travelpayouts', -- fournisseur de données
  raw_data JSONB,                       -- données brutes de l'API
  detected_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,

  -- Empêcher les doublons (même vol, même date, même prix)
  UNIQUE (destination, departure_date, price_fcfa, airline)
);

-- RLS : lecture uniquement par les fonctions serveur (aucun accès client direct)
ALTER TABLE public.detected_deals ENABLE ROW LEVEL SECURITY;

-- Index pour les requêtes fréquentes
CREATE INDEX idx_deals_unprocessed ON public.detected_deals (is_processed) WHERE is_processed = false;
CREATE INDEX idx_deals_destination ON public.detected_deals (destination, departure_date);
CREATE INDEX idx_deals_detected_at ON public.detected_deals (detected_at DESC);

-- ==========================================
-- 6. TABLE PAYMENTS (Historique des paiements Paystack)
-- ==========================================
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  reference TEXT UNIQUE NOT NULL,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'XOF',
  email TEXT,
  status TEXT DEFAULT 'success',
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Un utilisateur ne peut voir que ses propres paiements
CREATE POLICY "Les utilisateurs voient leurs propres paiements"
ON public.payments
FOR SELECT
USING (auth.uid() = user_id);

-- ==========================================
-- 7. TABLE PREMIUM_ITINERARIES (Itinéraires générés par l'IA)
-- ==========================================
CREATE TABLE public.premium_itineraries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id UUID REFERENCES public.detected_deals(id) ON DELETE CASCADE,

  -- Destination
  destination TEXT NOT NULL,
  destination_name TEXT,

  -- Données structurées (JSON)
  flight_details JSONB NOT NULL,
  hotel_details JSONB NOT NULL,
  daily_program JSONB NOT NULL,

  -- Métadonnées
  ai_model TEXT DEFAULT 'gemini',
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,

  UNIQUE (deal_id)
);

ALTER TABLE public.premium_itineraries ENABLE ROW LEVEL SECURITY;

-- Index pour les requêtes fréquentes
CREATE INDEX idx_itineraries_destination ON public.premium_itineraries (destination);
CREATE INDEX idx_itineraries_generated ON public.premium_itineraries (generated_at DESC);
