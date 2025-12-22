-- Create featured_videos table
CREATE TABLE IF NOT EXISTS featured_videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  youtube_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_featured_videos_active ON featured_videos(active);
CREATE INDEX IF NOT EXISTS idx_featured_videos_order ON featured_videos(display_order);

-- Enable RLS
ALTER TABLE featured_videos ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access for active videos
CREATE POLICY "Allow public read access for active videos"
  ON featured_videos
  FOR SELECT
  USING (active = true);

-- Create policy to allow all operations (for service role)
CREATE POLICY "Allow all for service role"
  ON featured_videos
  FOR ALL
  USING (true)
  WITH CHECK (true);
