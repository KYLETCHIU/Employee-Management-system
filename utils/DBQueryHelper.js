async function get_ManagerNames(con) {
    let query = "SELECT * FROM employee WHERE manager_id IS NOT NULL";

    const rows = await con.query(query);

    let employeeNames = [];
    for (const employee of rows) {
        employeeNames.push(employee.first_name + " " + employee.last_name);
    }
    return employeeNames;
}

async function get_Roles(con) {
    let query = "SELECT title FROM roles";
    const rows = await con.query(query);


    let roles = [];
    for (const row of rows) {
        roles.push(row.title);
    }

    return roles;
}

async function get_DepartmentNames(con) {
    let query = "SELECT department_name FROM department";
    const rows = await con.query(query);


    let departments = [];
    for (const row of rows) {
        departments.push(row.department_name);
    }

    return departments;
}


async function get_DepartmentId(departmentName, con) {
    let query = "SELECT * FROM department WHERE department.department_name=?";
    let args = [departmentName];
    const rows = await con.query(query, args);
    return rows[0].id;
}


async function get_RoleId(roleName, con) {
    let query = "SELECT * FROM roles WHERE roles.title=?";
    let args = [roleName];
    const rows = await con.query(query, args);
    return rows[0].id;
}


function get_FirstAndLastName(fullName) {

    let employee = fullName.split(" ");
    if (employee.length == 2) {
        return employee;
    }

    const last_name = employee[employee.length - 1];
    let first_name = " ";
    for (let i = 0; i < employee.length - 1; i++) {
        first_name = first_name + employee[i] + " ";
    }
    return [first_name.trim(), last_name];
}


async function get_EmployeeId(fullName, con) {

    let employee = get_FirstAndLastName(fullName);

    let query = 'SELECT id FROM employee WHERE employee.first_name=? AND employee.last_name=?';
    let args = [employee[0], employee[1]];
    const rows = await con.query(query, args);
    return rows[0].id;
}

async function get_EmployeeNames(con) {
    let query = "SELECT * FROM employee";
   

    const rows = await con.query(query);
    let employeeNames = [];
    for (const employee of rows) {
        employeeNames.push(employee.first_name + " " + employee.last_name);
    }
    return employeeNames;
}

async function view_AllRoles(con) {
    console.log("");

    let query = "SELECT * FROM roles";
    const rows = await con.query(query);
    console.table(rows);
    return rows;
}

async function view_AllDepartments(con) {


    let query = "SELECT * FROM department";
    const rows = await con.query(query);
    console.table(rows);
}

async function view_AllEmployees(con) {
    console.log("");


    let query = "SELECT * FROM employee";
    const rows = await con.query(query);
    console.table(rows);
}

async function view_AllEmployeesByDepartment(con) {

    console.log("");
    let query = "SELECT first_name, last_name, department.department_name FROM ((employee INNER JOIN roles ON role_id = roles.id) INNER JOIN department ON department_id = department.id);";
    const rows = await con.query(query);
    console.table(rows);
}



async function update_EmployeeRole(employeeInfo, con) {

    const roleId = await get_RoleId(employeeInfo.role, con);
    const employee = get_FirstAndLastName(employeeInfo.employeeName, con);

    let query = 'UPDATE employee SET role_id=? WHERE employee.first_name=? AND employee.last_name=?';
    let args = [roleId, employee[0], employee[1]];
    const rows = await con.query(query, args);
    console.log(`Updated employee ${employee[0]} ${employee[1]} with role ${employeeInfo.role}`);
}

async function add_Employee(employeeInfo, con) {
    let roleId = await get_RoleId(employeeInfo.role, con);
    let managerId = await get_EmployeeId(employeeInfo.manager, con);


    let query = "INSERT into employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)";
    let args = [employeeInfo.first_name, employeeInfo.last_name, roleId, managerId];
    const rows = await con.query(query, args);
    console.log(`Added employee ${employeeInfo.first_name} ${employeeInfo.last_name}.`);
}

async function delete_Employee(employeeInfo, con) {
    const employeeName = get_FirstAndLastName(employeeInfo.employeeName);

    let query = "DELETE from employee WHERE first_name=? AND last_name=?";
    let args = [employeeName[0], employeeName[1]];
    const rows = await con.query(query, args);
    console.log(`Employee removed: ${employeeName[0]} ${employeeName[1]}`);
}

async function add_Department(departmentInfo, con) {
    const departmentName = departmentInfo.departmentName;
    let query = 'INSERT into department (department_name) VALUES (?)';
    let args = [departmentName];
    const rows = await con.query(query, args);
    console.log(`Added department named ${departmentName}`);
}

async function add_Role(roleInfo, con) {

    const departmentId = await get_DepartmentId(roleInfo.departmentName, con);
    const salary = roleInfo.salary;
    const title = roleInfo.roleName;
    let query = 'INSERT into roles (title, salary, department_id) VALUES (?,?,?)';
    let args = [title, salary, departmentId];
    const rows = await con.query(query, args);
    console.log(`Added role ${title}`);
}





module.exports = {
    add_Role, add_Department, delete_Employee, get_DepartmentId, add_Employee, update_EmployeeRole, view_AllEmployeesByDepartment,
    view_AllEmployees, view_AllDepartments, view_AllRoles, get_EmployeeNames, get_FirstAndLastName, get_EmployeeId, get_RoleId, get_DepartmentNames, get_Roles,
    get_ManagerNames
};