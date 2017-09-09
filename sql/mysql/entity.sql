--
-- Entity table
-- 
CREATE TABLE ENTITY(
	id BIGINT NOT NULL AUTO_INCREMENT COMMENT 'primary system entity key',
	type INT NOT NULL COMMENT 'entity type field',
	PRIMARY KEY  (id),
	CONSTRAINT FK_ENTITY_RELATIONSHIP_SOURCE_ENTITY_ID  FOREIGN KEY (type) REFERENCES ENTITY(id)
) COMMENT 'All primary concepts will be grouped as entites'
;
