SELECT 
	table_name,
	column_name,
	column_type
FROM 
	information_schema.columns  
WHERE
	table_schema = 'ARC';