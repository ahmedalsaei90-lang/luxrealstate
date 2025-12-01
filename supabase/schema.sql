-- Elite Properties Kuwait - Database Schema
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/iqkpghwqqfjrfabzyybs/sql

-- =============================================================================
-- 1. PROFILES TABLE (extends auth.users)
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id AND role = (SELECT role FROM public.profiles WHERE id = auth.uid()));

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- =============================================================================
-- 2. PROPERTIES TABLE
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,

  -- Basic Info
  title TEXT NOT NULL,
  description TEXT,
  listing_type TEXT NOT NULL CHECK (listing_type IN ('sale', 'rent')),
  property_type TEXT NOT NULL,
  price NUMERIC NOT NULL,

  -- Location
  governorate TEXT NOT NULL,
  area TEXT NOT NULL,
  block TEXT,
  street TEXT,
  building TEXT,

  -- Details
  bedrooms INTEGER,
  bathrooms INTEGER,
  area_sqm NUMERIC,
  floor_number INTEGER,
  total_floors INTEGER,
  year_built INTEGER,
  furnishing TEXT CHECK (furnishing IN ('furnished', 'semi-furnished', 'unfurnished')),

  -- Features
  amenities TEXT[] DEFAULT '{}',

  -- Images
  images TEXT[] DEFAULT '{}',
  featured_image_url TEXT,

  -- Status & Moderation
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'sold', 'rented')),
  rejection_reason TEXT,
  featured BOOLEAN DEFAULT FALSE,

  -- Analytics
  views INTEGER DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  approved_at TIMESTAMPTZ,

  -- Search optimization
  search_vector TSVECTOR GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(description, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(area, '')), 'C') ||
    setweight(to_tsvector('english', coalesce(governorate, '')), 'C')
  ) STORED
);

-- Create index for full-text search
CREATE INDEX IF NOT EXISTS properties_search_idx ON public.properties USING GIN (search_vector);

-- Create index for common queries
CREATE INDEX IF NOT EXISTS properties_status_idx ON public.properties (status);
CREATE INDEX IF NOT EXISTS properties_user_id_idx ON public.properties (user_id);
CREATE INDEX IF NOT EXISTS properties_listing_type_idx ON public.properties (listing_type);
CREATE INDEX IF NOT EXISTS properties_governorate_idx ON public.properties (governorate);
CREATE INDEX IF NOT EXISTS properties_price_idx ON public.properties (price);

-- Enable RLS
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Properties Policies

-- Anyone can view approved properties
CREATE POLICY "Approved properties are viewable by everyone"
  ON public.properties FOR SELECT
  USING (status = 'approved');

-- Users can view their own properties (any status)
CREATE POLICY "Users can view their own properties"
  ON public.properties FOR SELECT
  USING (auth.uid() = user_id);

-- Admins can view all properties
CREATE POLICY "Admins can view all properties"
  ON public.properties FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Users can insert their own properties
CREATE POLICY "Users can insert their own properties"
  ON public.properties FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own pending/rejected properties
CREATE POLICY "Users can update their own non-approved properties"
  ON public.properties FOR UPDATE
  USING (auth.uid() = user_id AND status IN ('pending', 'rejected'))
  WITH CHECK (auth.uid() = user_id);

-- Admins can update any property (for approval/rejection)
CREATE POLICY "Admins can update any property"
  ON public.properties FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Users can delete their own properties
CREATE POLICY "Users can delete their own properties"
  ON public.properties FOR DELETE
  USING (auth.uid() = user_id);

-- Admins can delete any property
CREATE POLICY "Admins can delete any property"
  ON public.properties FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- =============================================================================
-- 3. FAVORITES TABLE
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Prevent duplicate favorites
  UNIQUE(user_id, property_id)
);

-- Create index for user favorites lookup
CREATE INDEX IF NOT EXISTS favorites_user_id_idx ON public.favorites (user_id);

-- Enable RLS
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- Favorites Policies
CREATE POLICY "Users can view their own favorites"
  ON public.favorites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add favorites"
  ON public.favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their own favorites"
  ON public.favorites FOR DELETE
  USING (auth.uid() = user_id);

-- =============================================================================
-- 4. INQUIRIES TABLE
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,

  -- Sender Info (for non-logged-in users)
  sender_name TEXT NOT NULL,
  sender_email TEXT NOT NULL,
  sender_phone TEXT,

  -- Message
  message TEXT NOT NULL,

  -- Status
  status TEXT NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  read_at TIMESTAMPTZ,
  replied_at TIMESTAMPTZ
);

-- Create indexes
CREATE INDEX IF NOT EXISTS inquiries_owner_id_idx ON public.inquiries (owner_id);
CREATE INDEX IF NOT EXISTS inquiries_property_id_idx ON public.inquiries (property_id);
CREATE INDEX IF NOT EXISTS inquiries_status_idx ON public.inquiries (status);

-- Enable RLS
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Inquiries Policies

-- Property owners can view inquiries for their properties
CREATE POLICY "Owners can view their property inquiries"
  ON public.inquiries FOR SELECT
  USING (auth.uid() = owner_id);

-- Senders can view their own inquiries
CREATE POLICY "Senders can view their own inquiries"
  ON public.inquiries FOR SELECT
  USING (auth.uid() = sender_id);

-- Anyone can send an inquiry (insert)
CREATE POLICY "Anyone can send inquiries"
  ON public.inquiries FOR INSERT
  WITH CHECK (true);

-- Owners can update inquiry status
CREATE POLICY "Owners can update inquiry status"
  ON public.inquiries FOR UPDATE
  USING (auth.uid() = owner_id);

-- Admins can view all inquiries
CREATE POLICY "Admins can view all inquiries"
  ON public.inquiries FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- =============================================================================
-- 5. FUNCTIONS & TRIGGERS
-- =============================================================================

-- Function to handle new user signup (auto-create profile)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER handle_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_properties_updated_at
  BEFORE UPDATE ON public.properties
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Function to increment property views
CREATE OR REPLACE FUNCTION public.increment_property_views(property_uuid UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.properties
  SET views = views + 1
  WHERE id = property_uuid AND status = 'approved';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================================================
-- 6. STORAGE BUCKETS
-- =============================================================================

-- Create storage bucket for property images
INSERT INTO storage.buckets (id, name, public)
VALUES ('property-images', 'property-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies for property-images bucket

-- Anyone can view property images
CREATE POLICY "Property images are publicly viewable"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'property-images');

-- Authenticated users can upload images
CREATE POLICY "Authenticated users can upload property images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'property-images'
    AND auth.role() = 'authenticated'
  );

-- Users can update their own images
CREATE POLICY "Users can update their own property images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'property-images'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Users can delete their own images
CREATE POLICY "Users can delete their own property images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'property-images'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- =============================================================================
-- 7. INITIAL ADMIN USER (Optional - Update with your email)
-- =============================================================================

-- After you sign up with your admin email, run this to make yourself admin:
-- UPDATE public.profiles SET role = 'admin' WHERE email = 'your-admin-email@example.com';

-- =============================================================================
-- DONE! Your database is ready.
-- =============================================================================
