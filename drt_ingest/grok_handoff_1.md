```sql
CREATE TABLE IF NOT EXISTS academy_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  progress INTEGER DEFAULT 0,
  badge TEXT,
  completed_at TIMESTAMPTZ,
  last_updated TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

ALTER TABLE academy_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own academy progress" ON academy_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own academy progress" ON academy_progress FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own academy progress" ON academy_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
```
