-- Audit Flash — Lead Magnet #1
-- Run this on the dedicated Supabase instance via SQL Editor

CREATE TABLE IF NOT EXISTS audit_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),

  -- Profil
  first_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company_name TEXT NOT NULL,
  sector TEXT NOT NULL,
  team_size INTEGER NOT NULL,
  revenue_range TEXT NOT NULL,

  -- Audit
  selected_process TEXT NOT NULL,
  answers JSONB NOT NULL,

  -- Resultats calcules
  annual_cost NUMERIC NOT NULL,
  cost_breakdown JSONB NOT NULL,
  radar_scores JSONB NOT NULL,
  suggested_stack JSONB NOT NULL,
  automation_monthly_cost NUMERIC NOT NULL,
  roi_weeks INTEGER NOT NULL,

  -- Tracking
  pdf_sent BOOLEAN DEFAULT FALSE,
  pdf_sent_at TIMESTAMPTZ,
  calendly_clicked BOOLEAN DEFAULT FALSE,
  source TEXT,
  utm_campaign TEXT,
  utm_medium TEXT,

  -- RGPD
  consent_rgpd BOOLEAN NOT NULL DEFAULT FALSE,
  consent_date TIMESTAMPTZ DEFAULT now(),
  data_deletion_date TIMESTAMPTZ DEFAULT (now() + INTERVAL '12 months')
);

CREATE INDEX IF NOT EXISTS idx_audit_leads_email ON audit_leads(email);
CREATE INDEX IF NOT EXISTS idx_audit_leads_created_at ON audit_leads(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_leads_sector ON audit_leads(sector);

ALTER TABLE audit_leads ENABLE ROW LEVEL SECURITY;

-- Anonymous users can only insert (with consent)
CREATE POLICY "Allow anonymous insert"
  ON audit_leads FOR INSERT
  TO anon
  WITH CHECK (consent_rgpd = TRUE);

-- Service role has full access (for n8n workflow)
CREATE POLICY "Service role full access"
  ON audit_leads FOR ALL
  TO service_role
  USING (TRUE);
