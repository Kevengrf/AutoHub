-- Drop old restrictive policy
DROP POLICY IF EXISTS "Allow admin all access" ON automations;

-- Create new policy for authenticated users (admins)
CREATE POLICY "Allow authenticated users all access" ON automations
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);
