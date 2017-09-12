--
-- Entity table
-- 
CREATE TABLE ENTITY_TYPE(
	id INT NOT NULL COMMENT 'primary key',
	name NVARCHAR(100) NOT NULL COMMENT 'Text Name of Entity',
	description NVARCHAR(1000) NULL COMMENT 'Text Descrption of Entity',
	PRIMARY KEY  (id)
)COMMENT 'Entity Type Description '
;