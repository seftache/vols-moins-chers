-- Ajout de la colonne email dans la table users
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS email TEXT;

-- Ajout de la colonne email dans la table waitlist
ALTER TABLE public.waitlist ADD COLUMN IF NOT EXISTS email TEXT;

-- Ajout d'une option pour s'inscrire via Telegram (id du chat)
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS telegram_chat_id TEXT;
ALTER TABLE public.waitlist ADD COLUMN IF NOT EXISTS telegram_chat_id TEXT;
