/* Database Create SQL: (You might want to change name...)
   Example database create command
   NOTE: Please change the admin user name and password
         Else you will face a 99% chance of getting hacked (which sucks....)

   create database ARC;
   grant all privileges on ARC.* to 'arc_admin'@'localhost' identified by "arc_password"; 
 */


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

/* Task 
 *╔═══════════════════════════════════════════════╗
 *║ Task                                          ║
 *╠══════════════════════════════╤════════════════╣
 *║Name                          │ Type           ║ 
 *╠══════════════════════════════╪════════════════╣ 
 *║id                            │INT (PK)        ║
 *╟──────────────────────────────┼────────────────╢
 *║name                          │VARCHAR(50)     ║
 *╟──────────────────────────────┼────────────────╢
 *║task_type                     │INT (FK)        ║
 *╟──────────────────────────────┼────────────────╢
 *║created                       │DateTime        ║
 *╟──────────────────────────────┼────────────────╢
 *║active                        │BIT             ║
 *╚══════════════════════════════╧════════════════╝
 */
 /*CREATE TABLE Task (id INT , name VARCHAR(50), task_type, INT);
*/