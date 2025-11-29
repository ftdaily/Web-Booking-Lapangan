-- Add columns to rooms table to match frontend fields
ALTER TABLE rooms
  ADD COLUMN `type` varchar(50) DEFAULT NULL,
  ADD COLUMN `capacity` int DEFAULT NULL,
  ADD COLUMN `image` varchar(255) DEFAULT NULL,
  ADD COLUMN `facilities` json DEFAULT (JSON_ARRAY()); -- stores JSON array of facility strings

-- Update existing room data (example) to match frontend sample
UPDATE rooms SET type = 'Badminton', capacity = 4, image = 'https://via.placeholder.com/400x300', facilities = JSON_ARRAY('AC','Shower') WHERE id = 1;
