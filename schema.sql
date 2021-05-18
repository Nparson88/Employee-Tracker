DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
USE employees_db;
​
CREATE TABLE department (
   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(30)
);
​
CREATE TABLE role (
   id INT AUTO_INCREMENT PRIMARY KEY,
   title VARCHAR(30) NOT NULL,
   salary DECIMAL NOT NULL,
   department_id INT
);
​
CREATE TABLE employee (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
   manager_id INT UNSIGNED,
   role_id INT,
   first_name VARCHAR(30) NOT NULL,
   last_name VARCHAR(30) NOT NULL,
   FOREIGN KEY (role_id) REFERENCES role(id),
   FOREIGN KEY (manager_id) REFERENCES employee(id)
);
​
INSERT INTO department (name)
   value  ("Management"),
           ("Sales"),
           ("Engineering"),
           ("Production"),
           ("Shipping");
INSERT INTO role(title, salary, department_id)
   value ("Foreman", 80000, 1),
           ("HR Representative", 75000, 1),
           ("Lead Engineer", 100000, 3),
           ("Engineer", 60000, 3),
           ("Sales Representative", 65000, 2),
           ("Fabricator", 45000, 4),
           ("Machine Operator", 32000, 4),
           ("Logistics Manager", 40000, 5);
INSERT INTO employee(first_name, last_name, role_id)
   value ("J. Jonah", "Jameson", 1),
           ("Peter", "Parker" , 2),
           ("Bruce", "Banner", 2),
           ("Stephen", "Strange", 3),
           ("Lois", "Lane", 1),
           ("Pepper", "Potts", 2),
           ("Lex","Luthor", 4);
           
SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;