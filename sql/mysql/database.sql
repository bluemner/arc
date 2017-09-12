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
