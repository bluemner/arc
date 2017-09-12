CREATE TABLE DATABASE_ENTITY(
	id 		BIGINT 			NOT NULL AUTO_INCREMENT COMMENT 'primary system entity key',
	database BIGINT		NOT NULL,
	name 	VARCHAR(256) 	NOT NULL,
	description NVARCHAR(512) NULL,
	PRIMARY KEY (id),
	CONSTRAINT FK_DATABASE_TYPE_DATABASE_TYPE_ID  FOREIGN KEY (database) REFERENCES database(id)
)COMMENT 'Entity used to keep track of database records'
;