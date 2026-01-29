-- Create automations table
CREATE TABLE IF NOT EXISTS automations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  documentation TEXT, -- Markdown content
  link TEXT, -- Hostinger/Automation execution link
  flow_data JSONB, -- React Flow nodes and edges
  status TEXT DEFAULT 'active', -- active, inactive, maintenance
  last_sync TIMESTAMP WITH TIME ZONE,
  category TEXT,
  frequency TEXT
);

-- RLS Policies
ALTER TABLE automations ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON automations
  FOR SELECT USING (true);

-- Allow admin only write access (using service role or specific email)
CREATE POLICY "Allow admin all access" ON automations
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');
