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
