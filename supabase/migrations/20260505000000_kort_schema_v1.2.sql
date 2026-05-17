CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Knights (Sovereign Core - Sphere 0)
CREATE TABLE IF NOT EXISTS knights (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL, 
  master_key_hash text,
  digital_dollars_balance bigint DEFAULT 0,
  mental_health_snapshot jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Spherical Nodes (Spheres 0-5)
CREATE TABLE IF NOT EXISTS spherical_nodes (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  knight_id uuid REFERENCES knights NOT NULL,
  sphere_level smallint CHECK (sphere_level BETWEEN 0 AND 5),
  parent_node_id uuid REFERENCES spherical_nodes,
  name text NOT NULL,
  encryption_root text,
  data jsonb,
  access_policy jsonb,
  mesh_node_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Capability-based access policies (templates)
CREATE TABLE IF NOT EXISTS access_policy_templates (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  sphere_level smallint NOT NULL,
  policy_definition jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Membership
CREATE TABLE IF NOT EXISTS sphere_memberships (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  knight_id uuid REFERENCES knights NOT NULL,
  spherical_node_id uuid REFERENCES spherical_nodes NOT NULL,
  role text NOT NULL,
  capability_token text,
  xception_contract_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(knight_id, spherical_node_id)
);

-- Xception Jobs
CREATE TABLE IF NOT EXISTS xception_jobs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  spherical_node_id uuid REFERENCES spherical_nodes,
  title text NOT NULL,
  description text,
  required_skills jsonb,
  digital_dollars numeric,
  status text CHECK (status IN ('open', 'awarded', 'completed', 'cancelled')),
  awarded_knight_id uuid REFERENCES knights,
  awarded_at timestamptz,
  referral_from_rep_bot boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
