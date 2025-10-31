/*
  # Create Properties Table and Authentication

  1. New Tables
    - `properties`
      - `id` (uuid, primary key) - Unique identifier for each property
      - `property_number` (text) - Display number (e.g., "A1", "B2")
      - `title` (text) - Property title
      - `description` (text) - Detailed description
      - `price` (integer) - Price in HUF
      - `area` (integer) - Area in square meters
      - `rooms` (integer) - Number of rooms
      - `floor` (integer) - Floor number
      - `images` (text array) - Array of image URLs
      - `floor_plan` (text, nullable) - Floor plan image URL
      - `status` (text) - Property status (available, sold, reserved)
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `properties` table
    - Public can read available properties
    - Only authenticated users can create/update/delete properties

  3. Important Notes
    - Images will be stored in Supabase Storage
    - RLS ensures data security
    - Status field controls property visibility
*/

CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_number text NOT NULL UNIQUE,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  price integer NOT NULL,
  area integer NOT NULL,
  rooms integer NOT NULL DEFAULT 1,
  floor integer NOT NULL DEFAULT 0,
  images text[] NOT NULL DEFAULT '{}',
  floor_plan text,
  status text NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'sold', 'reserved')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view available properties"
  ON properties
  FOR SELECT
  USING (status = 'available' OR auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can insert properties"
  ON properties
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update properties"
  ON properties
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete properties"
  ON properties
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_property_number ON properties(property_number);
