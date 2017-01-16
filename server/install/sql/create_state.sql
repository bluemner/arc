/* State
 *╔═══════════════════════════════════════════════╗
 *║ State                                         ║
 *╠══════════════════════════════╤════════════════╣
 *║Name                          │ Type           ║ 
 *╠══════════════════════════════╪════════════════╣
 *║id                            │INT (PK)        ║
 *╟──────────────────────────────┼────────────────╢
 *║name                          │VARCHAR(50)     ║
 *╟──────────────────────────────┼────────────────╢
 *║process                       │INT (FK)        ║
 *╟──────────────────────────────┼────────────────╢
 *║state_type                    │INT (FK)        ║
 *╟──────────────────────────────┼────────────────╢
 *║created                       │DateTime        ║
 *╟──────────────────────────────┼────────────────╢
 *║completed                     │DATETIME        ║
 *╟──────────────────────────────┼────────────────╢
 *║active                        │BIT             ║
 *╚══════════════════════════════╧════════════════╝
 */
CREATE TABLE State(id INT NOT NULL AUTO_INCREMENT,
                      name VARCHAR(50) NOT NULL ,
                      Process INT NOT NULL,
                      owner INT NOT NULL,
                      created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                      completed DATETIME NULL,
                      active BIT NOT NULL DEFAULT 0,
                      PRIMARY KEY (id) );