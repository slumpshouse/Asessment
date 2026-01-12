-- Initial migration: create published_images table
CREATE TABLE IF NOT EXISTS published_images (
  id SERIAL PRIMARY KEY,
  image_url TEXT NOT NULL,
  prompt TEXT NOT NULL,
  hearts INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
