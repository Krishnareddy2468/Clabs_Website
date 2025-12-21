-- Storage policies for all buckets
-- Run this in Supabase SQL Editor after creating the buckets

-- Policies for school-logos bucket
CREATE POLICY "Public read access for school logos"
ON storage.objects FOR SELECT
USING (bucket_id = 'school-logos');

CREATE POLICY "Authenticated users can upload school logos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'school-logos' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update school logos"
ON storage.objects FOR UPDATE
USING (bucket_id = 'school-logos' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete school logos"
ON storage.objects FOR DELETE
USING (bucket_id = 'school-logos' AND auth.role() = 'authenticated');

-- Policies for event-images bucket
CREATE POLICY "Public read access for event images"
ON storage.objects FOR SELECT
USING (bucket_id = 'event-images');

CREATE POLICY "Authenticated users can upload event images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'event-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update event images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'event-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete event images"
ON storage.objects FOR DELETE
USING (bucket_id = 'event-images' AND auth.role() = 'authenticated');

-- Policies for gallery-images bucket
CREATE POLICY "Public read access for gallery images"
ON storage.objects FOR SELECT
USING (bucket_id = 'gallery-images');

CREATE POLICY "Authenticated users can upload gallery images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'gallery-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update gallery images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'gallery-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete gallery images"
ON storage.objects FOR DELETE
USING (bucket_id = 'gallery-images' AND auth.role() = 'authenticated');
