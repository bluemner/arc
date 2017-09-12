CREATE TABLE DATABASE_COLUMN(
	id 	BIGINT 	NOT NULL AUTO_INCREMENT COMMENT 'primary system key',
	database_entity BIGINT	NOT NULL,
	database_field_type NVARCHAR(128) NOT NULL,
	name VARCHAR(256) 	NOT NULL,
	description NVARCHAR(512) NULL,
	PRIMARY KEY (id),
	CONSTRAINT FK_DATABASE_TYPE_DATABASE_TYPE_ID  FOREIGN KEY (database) REFERENCES database(id)
)COMMENT 'FIELD used to keep track of database records'
;