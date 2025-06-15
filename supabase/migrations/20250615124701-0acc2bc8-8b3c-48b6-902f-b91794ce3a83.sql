
-- 1. USER MANAGEMENT
-- Create an enum type for application roles
CREATE TYPE public.app_role AS ENUM ('admin');

-- Create a table for public user profiles
CREATE TABLE public.profiles (
  id uuid NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  updated_at timestamp with time zone,
  full_name text,
  avatar_url text
);

-- Set up Row Level Security (RLS) for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Create a table for user roles
CREATE TABLE public.user_roles (
  id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- Set up Row Level Security (RLS) for user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles, preventing RLS recursion
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

-- Define RLS policies for user_roles
CREATE POLICY "Admins can manage user roles." ON public.user_roles FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users can view their own roles." ON public.user_roles FOR SELECT USING (auth.uid() = user_id);

-- This trigger automatically creates a profile for a new user.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 2. CONTENT TABLES

-- Products Table
CREATE TABLE public.products (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT,
    image_url TEXT,
    specifications JSONB
);
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Products are viewable by everyone." ON public.products FOR SELECT USING (true);
CREATE POLICY "Admins can manage products." ON public.products FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Projects Table
CREATE TABLE public.projects (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    location TEXT,
    start_date DATE,
    end_date DATE,
    status TEXT,
    hero_image_url TEXT,
    gallery_images JSONB,
    specifications JSONB
);
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Projects are viewable by everyone." ON public.projects FOR SELECT USING (true);
CREATE POLICY "Admins can manage projects." ON public.projects FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Services Table
CREATE TABLE public.services (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    image_url TEXT
);
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Services are viewable by everyone." ON public.services FOR SELECT USING (true);
CREATE POLICY "Admins can manage services." ON public.services FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Careers Table
CREATE TABLE public.careers (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    location TEXT,
    type TEXT,
    department TEXT,
    is_active BOOLEAN DEFAULT true
);
ALTER TABLE public.careers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Careers are viewable by everyone." ON public.careers FOR SELECT USING (true);
CREATE POLICY "Admins can manage careers." ON public.careers FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Contact Messages Table
CREATE TABLE public.contact_messages (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT,
    email TEXT,
    subject TEXT,
    message TEXT,
    is_read BOOLEAN DEFAULT false
);
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage contact messages." ON public.contact_messages FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Support Tickets Table
CREATE TABLE public.support_tickets (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT,
    email TEXT,
    subject TEXT,
    message TEXT,
    is_read BOOLEAN DEFAULT false,
    status TEXT DEFAULT 'open'
);
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage support tickets." ON public.support_tickets FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Business Locations Table
CREATE TABLE public.locations (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    address TEXT,
    city TEXT,
    country TEXT,
    phone TEXT,
    email TEXT
);
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Locations are viewable by everyone." ON public.locations FOR SELECT USING (true);
CREATE POLICY "Admins can manage locations." ON public.locations FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- 3. STORAGE BUCKET FOR MEDIA
-- Create a bucket for general media uploads.
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Define policies for the media bucket.
CREATE POLICY "Media is publicly viewable." ON storage.objects
  FOR SELECT USING ( bucket_id = 'media' );

CREATE POLICY "Admins can manage media." ON storage.objects
  FOR ALL USING ( bucket_id = 'media' AND public.has_role(auth.uid(), 'admin') );

