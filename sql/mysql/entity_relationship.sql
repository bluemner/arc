--
-- Entity table
-- 
CREATE TABLE ENTITY_RELATIONSHIP(
	source BIGINT NOT NULL COMMENT 'Soruce entity id',
	target  BIGINT NOT NULL COMMENT 'Target entity id',
	PRIMARY KEY  (id),
	FOREIGN KEY ('FK_ENTITY_RELATIONSHIP_SOURCE_ENTITY_ID') REFERENCES ENTITY('id')
	FOREIGN KEY ('FK_ENTITY_RELATIONSHIP_TARGET_ENTITY_ID') REFERENCES ENTITY('id') 
)COMMENT 'Allows for joing of Any core entity to any core entity, thus creating a relationship'
