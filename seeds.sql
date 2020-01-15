DROP DATABASE IF EXISTS E_M_S;
CREATE DATABASE E_M_S;

USE E_M_S;

CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);


CREATE TABLE role(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INT(10) NOT NULL,
  FOREIGN KEY(department_id)REFERENCES department (id),
  PRIMARY KEY (id)
);


CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT(10) NOT NULL,
  manager_id INT(10),
  FOREIGN KEY(role_id)REFERENCES role (id),
  FOREIGN KEY(manager_id)REFERENCES employee (id),
  PRIMARY KEY (id)
);
