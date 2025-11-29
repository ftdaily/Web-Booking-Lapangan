-- Optional migration to change default for users.is_active to 0
-- Run this in your MySQL server if desired

ALTER TABLE users
  MODIFY is_active tinyint(1) NOT NULL DEFAULT '0';

-- Note: This will change the default for future inserts; existing records are unchanged.
