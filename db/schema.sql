DROP DATABASE IF EXISTS fgcb3fjdlgn6zikd;

CREATE DATABASE fgcb3fjdlgn6zikd;

USE fgcb3fjdlgn6zikd;

CREATE TABLE department (
  id INT AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) NULL,
  salary INT NULL,
  department_id INT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NULL,
  manager_id INT NULL,
  FOREIGN KEY (role_id) REFERENCES roles(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id),
  PRIMARY KEY (id)
);