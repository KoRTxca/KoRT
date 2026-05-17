-- Holographic Datacore & Security Gatekeeper Protocols
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS sovereign_knights (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS holographic_datacore (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_ai VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    tags TEXT[],
    ingested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS knight_status (
    sovereign_id UUID REFERENCES sovereign_knights(id) PRIMARY KEY,
    designation VARCHAR(100) NOT NULL,
    threat_level VARCHAR(20) DEFAULT 'CLEAR',
    mental_stability_index INT DEFAULT 100,
    last_eval TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION check_internal_threat()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.mental_stability_index < 30 THEN
        NEW.threat_level = 'INTERNAL_THREAT';
        -- Lady of the Lake auto-logs mitigation action into Datacore
        INSERT INTO holographic_datacore (source_ai, content, tags)
        VALUES ('Lady of the Lake', 'Threat mitigated and Protocol Sir Kay primed for ' || NEW.designation, ARRAY['security', 'internal_threat']);
    ELSIF NEW.mental_stability_index < 60 THEN
        NEW.threat_level = 'ELEVATED';
    ELSE
        NEW.threat_level = 'CLEAR';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER invoke_the_guard BEFORE UPDATE ON knight_status FOR EACH ROW EXECUTE FUNCTION check_internal_threat();
