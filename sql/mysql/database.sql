<<<<<<< HEAD
--
-- Entity table
-- 
CREATE TABLE DATABASE(
	id BIGINT NOT NULL AUTO_INCREMENT COMMENT 'primary system entity key',
	type INT NOT NULL COMMENT 'entity type field',
	PRIMARY KEY  (id),
	CONSTRAINT FK_DATABASE_TYPE_DATABASE_TYPE  FOREIGN KEY (type) REFERENCES DATABASE_TYPE(id)
) COMMENT 'All primary concepts will be grouped as entites'
;
=======
CREATE TABLE DATABASE(
	id 		BIGINT 			NOT NULL AUTO_INCREMENT COMMENT 'primary system entity key',
	entity_id BIGINT 		NOT NULL,
	type 	INT 			NOT NULL COMMENT 'entity type field',
	name 	VARCHAR(256) 	NOT NULL,
	server 	VARCHAR(256) 	NOT NULL,
	description NVARCHAR(512) NULL,
	PRIMARY KEY (id),
	CONSTRAINT FK_DATABASE_TYPE_DATABASE_TYPE_ID  FOREIGN KEY (type) REFERENCES DATABASE(id)
)COMMENT 'Entity used to keep track of database records'
;
>>>>>>> 05cd3931e83b8e64fb647f27883dbd86e6255660
