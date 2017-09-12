--
-- Entity table
-- 
CREATE TABLE DATABASE_TYPE(
	id BIGINT NOT NULL COMMENT 'primary key',
	name NVARCHAR(100) NOT NULL COMMENT 'Text Name of Database',
	PRIMARY KEY  (id)
) COMMENT 'Database type information ex DB2, MSSQL, MYSQL'
;
