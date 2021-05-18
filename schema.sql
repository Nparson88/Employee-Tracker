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
INSERT INTO department (id,name)
   value  (1,"Management"),
           (2,"Sales"),
           (3,"Engineering"),
           (4,"Production"),
           (5,"Shipping");
INSERT INTO role(id,title, salary, department_id)
   value (1,"Foreman", 80000, 1),
           (2,"HR Representative", 75000, 1),
           (3,"Lead Engineer", 100000, 3),
           (4,"Engineer", 60000, 3),
           (5,"Sales Representative", 65000, 2),
           (6,"Fabricator", 45000, 4),
           (7,"Machine Operator", 32000, 4),
           (8,"Logistics Manager", 40000, 5);
INSERT INTO employee(first_name, last_name, manager_id, role_id)
   value ("J. Jonah", "Jameson", null, 1),
           ("Peter", "Parker" ,2, 4),
           ("Bruce", "Banner", null, 3),
           ("Stephen", "Strange", 1, 5),
           ("Lois", "Lane", null, 2),
           ("Pepper", "Potts",1, 5),
           ("Lex","Luthor",1, 6);
           
SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;