INSERT into
  department (department_name)
VALUES
  ('Executive'),
  ('Sales'),
  ('Finance'),
  ('Legal'),
  ('Marketing'),
  ('IT'),
  ('HR');
  
  
INSERT into
  roles (title, salary, department_id)
VALUES ('President', 5000000, 1),
('CEO', 2500000, 1),
('COO', 2500000, 1),
('CFO', 2500000, 1),
('Executive VP', 500000, 1),
  ('Director of HR', 400000, 1),
  ('Director of Sales', 250000, 1),
  ('Director of Marketing', 250000, 1),
  ('General Counsel', 250000, 1),
  ('Executive Assistant', 100000, 1),
  ('Sales Director', 100000, 2),
  ('Sales Manager', 100000, 2),
  ('Salesperson', 60000, 2),
  ('Sales Assistant', 50000, 2),
  ('Lead Architect', 175000, 3),
  ("Tech Consultant", 90000, 3),
  ("Computer Programmer", 130000, 3),
  ('Lawyer', 130000, 4),
  ('Legal Assistant', 60000, 4),
  ('Accountant', 130000, 5),
  ('HR Manager', 120000, 6),
  ('Marketing Manager', 120000, 7),
  ('Marketing Assistant', 45000, 7),
  ('Secretary', 40000, 7);
  
  
INSERT into
  employee (first_name, last_name, role_id, manager_id)
VALUES
  ("Jack", "Bartlet", 1, 1),
  ("Kyle", "Chiu", 2, 1),
  ("Chris", "Stewart", 3, 1),
  ("Mike", "Forge", 4, 1),
  ("Makenna", "Chiu", 5, 1),
  ("Ernesto", "tham", 5, 1),
  ("Rick", "Gustafson", 6, 1),
  ("William", "Queen", 6, 1),
  ("Rich", "Lumbergh", 7, 1),
  ("Tom", "Smykowski", 8, 2),
  ("Tony", "Saprono", 9, 2),
  ("Serena", "King", 10, 2),
  ("Lina", "Paul", 10, 2),
  ("Kimmy", "Granger", 11, 2),
  ("Abbie", "Raine", 12, 2),
  ("Kendra", "Sutherland", 13, 2),
  ("Selena", "Green-Vergas", 14, 3),
  ("Komukai", "Mimako", 15, 3),
  ("Hajime", "Nagumo", 16, 3),
  ("Yue", "Nagumo", 16, 3),
  ("Tio", "Klaus", 17, 3),
  ("Shea", "Haulia", 18, 3),
  ("Kaori", "Shirasaki", 19, 3),
  ("Shizuku", "Yaegashi", 19, 3);
Select
  employee.first_name,
  employee.last_name,
  roles.title,
  roles.salary,
  department.department_name,
  employee_m.first_name as manager_firstname,
  employee_m.last_name as manager_lastname
from
  employee
  join roles on employee.role_id = roles.id
  join department on roles.department_id = department.id
  Left join employee as employee_m on employee.manager_id = employee_m.id;
select
  *
from
  department;
select
  *
from
  roles;
select
  *
from
  employee;

