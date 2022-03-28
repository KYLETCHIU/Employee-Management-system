const inquirer = require("inquirer");
const con = require("./utils/connection.js");
const {add_Role, add_Department, delete_Employee, get_DepartmentId, add_Employee, update_EmployeeRole, view_AllEmployeesByDepartment, 
    view_AllEmployees, view_AllDepartments, view_AllRoles, get_EmployeeNames,get_FirstAndLastName, get_EmployeeId, get_RoleId, get_DepartmentNames, get_Roles,
    get_ManagerNames } = require('./utils/DBQueryHelper')

let cTable = require("console.table");

async function appPrompt() {
    return inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to do?",
                name: "action",
                choices: [
                  "Add department",
                  "Add employee",
                  "Add role",
                  "Remove employee",
                  "Update employee role",
                  "View all departments",
                  "View all employees",
                  "View all employees by department",
                  "View all roles",
                  "Exit"
                ]
            }
        ])
}

async function get_AddEmployeeInfo() {
    const managers = await get_ManagerNames(con);
    const roles = await get_Roles(con);
    return inquirer
        .prompt([
            {
                type: "input",
                name: "first_name",
                message: "What is the employee's first name?"
            },
            {
                type: "input",
                name: "last_name",
                message: "What is the employee's last name?"
            },
            {
                type: "list",
                message: "What is the employee's role?",
                name: "role",
                choices: [
                   
                    ...roles
                ]
            },
            {
                type: "list",
                message: "Who is the employee's manager?",
                name: "manager",
                choices: [
                  
                    ...managers
                ]
            }
        ])
}

async function get_RemoveEmployeeInfo() {
    const employees = await get_EmployeeNames(con);
    return inquirer
    .prompt([
        {
            type: "list",
            message: "Which employee do you want to remove?",
            name: "employeeName",
            choices: [
            
                ...employees
            ]
        }
    ])
}

async function get_DepartmentInfo() {
    return inquirer
    .prompt([
        {
            type: "input",
            message: "What is the name of the new department?",
            name: "departmentName"
        }
    ])
}

async function get_RoleInfo() {
    const departments = await get_DepartmentNames(con);
    return inquirer
    .prompt([
        {
            type: "input",
            message: "What is the title of the new role?",
            name: "roleName"
        },
        {
            type: "input",
            message: "What is the salary of the new role?",
            name: "salary"
        },
        {
            type: "list",
            message: "Which department uses this role?",
            name: "departmentName",
            choices: [
           
                ...departments
            ]
        }
    ])
}

async function get_UpdateEmployeeRoleInfo() {
    const employees = await get_EmployeeNames(con);
    const roles = await get_Roles(con);
    return inquirer
        .prompt([
            {
                type: "list",
                message: "Which employee do you want to update?",
                name: "employeeName",
                choices: [
                 
                    ...employees
                ]
            },
            {
                type: "list",
                message: "What is the employee's new role?",
                name: "role",
                choices: [
                    
                    ...roles
                ]
            }
        ])

}

async function main() {
    let endWhileLoop = false;
    while(!endWhileLoop) {
        const prompt = await appPrompt();

        switch(prompt.action) {
            case 'Add department': {
                const newDepartmentName = await get_DepartmentInfo();
                await add_Department(newDepartmentName, con);
                break;
            }

            case 'Add employee': {
                const newEmployee = await get_AddEmployeeInfo();
                console.log("add an employee");
                console.log(newEmployee);
                await add_Employee(newEmployee, con);
                break;
            }

            case 'Add role': {
                const newRole = await get_RoleInfo();
                console.log("add a role");
                await add_Role(newRole, con);
                break;
            }

            case 'Remove employee': {
                const employee = await get_RemoveEmployeeInfo();
                await delete_Employee(employee, con);
                break;
            }
            
            case 'Update employee role': {
                const employee = await get_UpdateEmployeeRoleInfo();
                await update_EmployeeRole(employee, con);
                break;
            }

            case 'View all departments': {
                await view_AllDepartments(con);
                break;
            }

            case 'View all employees': {
                await view_AllEmployees(con);
                break;
            }

            case 'View all employees by department': {
                await view_AllEmployeesByDepartment(con);
                break;
            }

            case 'View all roles': {
                await view_AllRoles(con);
                break;
            }

            case 'Exit': {
                endWhileLoop = true;
                process.exit(0); 
                return;
            }

          
        }
    }
}

// Close your database connection when Node exits
process.on("exit", async function(code) {
    await con.close();
    return console.log(`About to exit with code ${code}`);
});

main();