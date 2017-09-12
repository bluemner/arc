--
<<<<<<< HEAD
-- Entity table
-- 
CREATE TABLE DATABASE_TYPE(
	id BIGINT NOT NULL COMMENT 'primary key',
	name NVARCHAR(100) NOT NULL COMMENT 'Text Name of Database',
	PRIMARY KEY  (id)
) COMMENT 'Database type information ex DB2, MSSQL, MYSQL'
;
=======
-- DATABASE table
-- 
CREATE TABLE DATABASE_TYPE(
	id BIGINT NOT NULL COMMENT 'primary key',
	name NVARCHAR(100) NOT NULL COMMENT 'Text Name of DATABASE',
	description NVARCHAR(1000) NULL COMMENT 'Text Descrption of DATABASE',
	PRIMARY KEY  (id)
)COMMENT 'DATABASE Type Description '
;
>>>>>>> 05cd3931e83b8e64fb647f27883dbd86e6255660
