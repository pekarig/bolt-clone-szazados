/*
  # Add balcony and orientation fields to properties

  1. Changes
    - Add `balcony` (boolean) - Whether property has a balcony
    - Add `orientation` (text) - Property orientation (North, South, East, West, etc.)

  2. Notes
    - Existing properties will have NULL values, which is acceptable
    - These fields enhance property details for better listings
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'properties' AND column_name = 'balcony'
  ) THEN
    ALTER TABLE properties ADD COLUMN balcony boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'properties' AND column_name = 'orientation'
  ) THEN
    ALTER TABLE properties ADD COLUMN orientation text;
  END IF;
END $$;
