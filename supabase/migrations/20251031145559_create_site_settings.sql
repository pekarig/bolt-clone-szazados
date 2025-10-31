/*
  # Create Site Settings Table

  1. New Tables
    - `site_settings`
      - `id` (uuid, primary key) - Unique identifier
      - `key` (text, unique) - Setting key (e.g., 'homepage_title', 'logo_url')
      - `value` (text) - Setting value
      - `type` (text) - Type of setting (text, image, json)
      - `category` (text) - Category (homepage, technical, gallery, general)
      - `description` (text) - Description of the setting
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `site_settings` table
    - Public can read settings
    - Only authenticated users can update settings

  3. Default Settings
    - Homepage hero title
    - Homepage hero subtitle
    - Homepage hero images
    - Technical page content
    - Gallery images
    - Logo URL
*/

CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  value text NOT NULL DEFAULT '',
  type text NOT NULL DEFAULT 'text' CHECK (type IN ('text', 'image', 'json', 'html')),
  category text NOT NULL DEFAULT 'general' CHECK (category IN ('homepage', 'technical', 'gallery', 'general')),
  description text DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view site settings"
  ON site_settings
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert settings"
  ON site_settings
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update settings"
  ON site_settings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete settings"
  ON site_settings
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_site_settings_key ON site_settings(key);
CREATE INDEX IF NOT EXISTS idx_site_settings_category ON site_settings(category);

INSERT INTO site_settings (key, value, type, category, description) VALUES
('homepage_hero_title', 'Modern lakások Budapest szívében', 'text', 'homepage', 'Főoldal főcím'),
('homepage_hero_subtitle', 'Találja meg álmai otthonát prémium környezetben', 'text', 'homepage', 'Főoldal alcím'),
('homepage_hero_images', '["https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg", "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg", "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"]', 'json', 'homepage', 'Főoldal slider képek (JSON array)'),
('technical_content', '<h2>Műszaki leírás</h2><p>Itt találhatók az épület műszaki részletei...</p>', 'html', 'technical', 'Műszaki oldal tartalma'),
('logo_url', 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg', 'image', 'general', 'Oldal logó URL'),
('gallery_images', '[]', 'json', 'gallery', 'Galéria képek (JSON array)')
ON CONFLICT (key) DO NOTHING;
