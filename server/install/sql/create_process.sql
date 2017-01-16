/* Process
 *╔═══════════════════════════════════════════════╗
 *║ Process                                       ║
 *╠══════════════════════════════╤════════════════╣
 *║ Name                         │ Type           ║ 
 *╠══════════════════════════════╪════════════════╣
 *║ id                           │INT (PK)        ║
 *╟──────────────────────────────┼────────────────╢
 *║ name                         │VARCHAR(50)     ║
 *╟──────────────────────────────┼────────────────╢
 *║ current_state                │INT (FK)        ║
 *╟──────────────────────────────┼────────────────╢
 *║ owner                        │INT (FK)        ║
 *╟──────────────────────────────┼────────────────╢
 *║ created                      │DateTime        ║
 *╟──────────────────────────────┼────────────────╢
 *║ completed                    │DATETIME        ║
 *╟──────────────────────────────┼────────────────╢
 *║ active                       │BIT             ║
 *╚══════════════════════════════╧════════════════╝
 */
CREATE TABLE Process(id INT NOT NULL AUTO_INCREMENT,
                      name VARCHAR(50) NOT NULL ,
                      current_state INT NOT NULL,
                      owner INT NOT NULL,
                      created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                      completed DATETIME NULL,
                      active BIT NOT NULL DEFAULT 0,
                      PRIMARY KEY (id) );
