-- Add video_url column (will error if already exists; migration runner will ignore duplicate column error)
ALTER TABLE products ADD COLUMN video_url VARCHAR(500);
