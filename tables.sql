DROP DATABASE IF EXISTS cintas_backup;
CREATE DATABASE cintas_backup;

-- abcs Acap Backup Control System.

USE cintas_backup;

-- Tabla de ubicaciones donde estarán las cintas
CREATE TABLE locations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  location VARCHAR (100) UNIQUE NOT NULL,
  description TEXT,
  status bit DEFAULT 1
); 

-- Tabla de estados de las cintas (vitbl_studentgente, caducada, triturada...)
CREATE TABLE status (
  id INT AUTO_INCREMENT PRIMARY KEY,
  state VARCHAR (100) UNIQUE NOT NULL,
  description TEXT
);

-- Tabla de las cintas de backup
CREATE TABLE cintas (
  id BINARY (16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
  locations_id INT NOT NULL,
  status_id INT NOT NULL,
  FOREIGN KEY (locations_id) REFERENCES locations (id),
  FOREIGN KEY (status_id) REFERENCES status (id),
  label VARCHAR (50) NOT NULL,
  description TEXT,
  creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  expiry_date DATETIME NOT NULL,
  retention_date DATETIME NOT NULL,
  status bit DEFAULT 1
);

-- Tabla de los puestos de trabajo de los usuarios
CREATE TABLE positions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  position VARCHAR (100) NOT NULL UNIQUE,
  description TEXT,
  status BIT DEFAULT 1
);

-- Tabla de los privilegios dentro del sistema
CREATE TABLE privileges (
  id INT AUTO_INCREMENT PRIMARY KEY,
  privilege VARCHAR (100) NOT NULL UNIQUE,
  description TEXT,
  status BIT DEFAULT 1
);

-- Tabla intermedia entre que relacionda todos los privilegios que tiene cada puesto
CREATE TABLE positions_privileges (
  position_id INT NOT NULL,
  privilege_id INT NOT NULL,
  FOREIGN KEY (id_position) REFERENCES positions (id),
  FOREIGN KEY (id_privilege) REFERENCES privileges (id),
  PRIMARY KEY (id_position, id_privilege)
);

-- Tabla de usuarios del sistema
CREATE TABLE users (
  id BINARY (16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
  position_id INT NOT NULL,
  FOREIGN KEY (id_position) REFERENCES positions (id),
  employee_number VARCHAR (20) NOT NULL UNIQUE,
  username VARCHAR (100) NOT NULL,
  email VARCHAR (50) NOT NULL UNIQUE,
  password VARCHAR (255) NOT NULL,
  creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  status BIT DEFAULT 1
);

-- Tabla de carpetas de evidencias cuando se trituren las cintas o cualquier tipo de evidencia
CREATE TABLE folders_of_evidence (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR (255) NOT NULL,
  descripcion TEXT,
  status BIT DEFAULT 1
);

-- Tabla de evidencia (fotos, documentos...)
CREATE TABLE evidence (
  id INT AUTO_INCREMENT PRIMARY KEY,
  path VARCHAR(255) DEFAULT '',
  name VARCHAR (255) DEFAULT '',
  size VARCHAR (100) DEFAULT '',
  extension VARCHAR (50) DEFAULT '',
  evidence_date DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla que relacionas las evidencias que posee cada carpeta
CREATE TABLE evidence_of_the_folders (
  folder_id INT NOT NULL,
  evidence_id INT NOT NULL,
  FOREIGN KEY (id_folder) REFERENCES folders_of_evidence(id),
  FOREIGN KEY (id_evidence) REFERENCES evidence(id),
  PRIMARY KEY (id_folder, id_evidence)
);

use prueba_java;
SELECT BIN_TO_UUID(id) id, description, creation_date, expiry_date, label, retention_date, status, locations_id, status_id FROM cintas;

INSERT INTO branch_offices (name) VALUES ('E30');
INSERT INTO branch_offices (name) VALUES ('Centro de datos');

INSERT INTO locations (location) VALUES ('E30');
INSERT INTO locations (location) VALUES ('Centro de datos');
INSERT INTO status (state) VALUES ('Vigente');
INSERT INTO status (state) VALUES ('Caducado');
INSERT INTO status (state) VALUES ('Eliminado');

INSERT INTO positions (position) VALUES ('administrador');

insert INTO privileges (privilege) VALUES ('Visualizar cintas');
insert INTO privileges (privilege) VALUES ('Crear cinta');
insert INTO privileges (privilege) VALUES ('Editar cinta');
insert INTO privileges (privilege) VALUES ('Eliminar cinta');
insert INTO privileges (privilege) VALUES ('Visualizar usuarios');
insert INTO privileges (privilege) VALUES ('Crear usuario');
insert INTO privileges (privilege) VALUES ('Editar usuario');
insert INTO privileges (privilege) VALUES ('Eliminar usuario');
insert INTO privileges (privilege) VALUES ('Asignar privilegios');
insert INTO privileges (privilege) VALUES ('Ver evidencias');
insert INTO privileges (privilege) VALUES ('Añadir evidencia');
insert INTO privileges (privilege) VALUES ('Editar evidencia');
insert INTO privileges (privilege) VALUES ('Eliminar evidencia');
insert INTO privileges (privilege) VALUES ('Generar reportes');

SELECT * FROM privileges;

select BIN_TO_UUID(id), username, employee_number, password FROM users;
SELECT * FROM positions_privileges;
SELECT * FROM positions;
SELECT * FROM locations;
SELECT * FROM status;