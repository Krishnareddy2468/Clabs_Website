-- Add the amount column to events table
BEGIN
	IF NOT EXISTS (
		SELECT 1 
		FROM user_tab_columns 
		WHERE table_name = 'EVENTS' AND column_name = 'AMOUNT'
	) THEN
		EXECUTE IMMEDIATE 'ALTER TABLE events ADD amount DECIMAL(10, 2) DEFAULT 0';
	END IF;
END;

-- Verify the column was added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'events';
