ALTER TABLE public.job_offers ADD COLUMN IF NOT EXISTS image_path TEXT;

CREATE POLICY "Job images are readable by everyone"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'job-images');

CREATE POLICY "Authenticated can upload job images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'job-images');

CREATE POLICY "Authenticated can update job images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'job-images')
WITH CHECK (bucket_id = 'job-images');

CREATE POLICY "Authenticated can delete job images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'job-images');