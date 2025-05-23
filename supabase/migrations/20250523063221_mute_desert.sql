/*
  # Authentication tracking tables

  1. New Tables
    - `auth_tracking`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `event_type` (text) - 'signup' or 'login'
      - `metadata` (jsonb) - additional event data
      - `ip_address` (text)
      - `user_agent` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `auth_tracking` table
    - Add policy for authenticated users to read their own data
    - Add policy for service role to insert data
*/

-- Create auth tracking table
CREATE TABLE IF NOT EXISTS auth_tracking (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  event_type text NOT NULL CHECK (event_type IN ('signup', 'login')),
  metadata jsonb DEFAULT '{}'::jsonb,
  ip_address text,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE auth_tracking ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can read own auth tracking data"
  ON auth_tracking
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can insert auth tracking data"
  ON auth_tracking
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS auth_tracking_user_id_idx ON auth_tracking(user_id);
CREATE INDEX IF NOT EXISTS auth_tracking_event_type_idx ON auth_tracking(event_type);
CREATE INDEX IF NOT EXISTS auth_tracking_created_at_idx ON auth_tracking(created_at);