const inquirer = require("inquirer");
const connection = require("./utils/connection.js");
const questions = require("./utils/questions.js");
const table = require("console.table");


start();


//Starting up App
async function start() {

    const userChoice = await inquirer.prompt(questions.initialQuestion);

    switch (userChoice.initial) {

        case `Add an employee`:
            addEmployee();
            break;
        case `Add a department`:
            addDepartment();
            break;
        case `Add a role`:HTMLTemplateElement
            addNewRole();
            break;
        case `View departments`:
            printDepartments();
            break;
        case `View employees`:
            printEmployees();
            break;
        case `Update employee role`:
            updateRole();
            break;
        case `View all employees by manager`:
            employeesByManager();
            break;
        case `Remove employee`:
            rmEmployee();
            break;
        case `View all employees by department`:
            employeesByDepartment();
            break;
        case `View all roles`:
            printRoles();
            break;
        case `Remove roles`:
            rmRole();
            break;
        case `Quit`:
            connection.end();
            break;
        default:
            connection.end();

    }

}

//Adding aditional employees
async function addEmployee() {

    let qry = `SELECT id as value, CONCAT(first_name, ' ', last_name) as name FROM employee`
    connection.query(qry, async (err, employees) => {

        qry = `SELECT id as value, title as name FROM roles`
        connection.query(qry, async (err, roles) => {

            const newEmp = await inquirer.prompt(questions.addEmployee(roles, employees));
            qry = `INSERT INTO employee SET ?`
            connection.query(qry, newEmp, function (err) {

                if (err) throw err;
                console.log(`New employee was added successfully!`);
                
                start();
            });
        })
    })
}

//Adding additional Departments
async function addDepartment() {

    const departmentDetails = await inquirer.prompt(addDepartmentQuestions)
    connection.query(`INSERT INTO department SET ?`, {

            name: departmentDetails.department_name
        },
        function (err) {
            if (err) throw err;
            console.log(`New department was added successfully!`);
            
            start();
        }
    );
}

//Adding Roles
async function addNewRole() {

    const roleDetails = await inquirer.prompt(addRole)
    connection.query(`INSERT INTO role SET ?`, {

            title: roleDetails.titleRole,
            salary: roleDetails.salary,
            department_id: roleDetails.departmentIDrole
        },
        function (err) {

            if (err) throw err;
            console.log(`New department was added successfully!`);
            
            start();
        }
    );
}

//Updating Roles
async function updateRole() {
   
    connection.query(`SELECT * FROM employee`, async (err, employee) => {
        
        const {

            worker,
            newrole
        } = await inquirer.prompt([{

                type: `list`,
                message: `Choose an employee to update:`,
                name: `worker`,
                choices: () => {

                    return employee.map((employee) => employee.last_name);
                },
            },
            {
                type: `list`,
                message: `What is this employee's new role?`,
                name: `newrole`,
                choices: () => {
                    return employee.map((employee) => employee.role_id);
                }
            }
        ]);
        connection.query(

            `UPDATE employee SET ? WHERE ?`,
            [{
                    role_id: newrole,
                },
                {
                    last_name: worker,
                },
            ],
            function (err, res) {

                if (err) throw err;
                console.log(res.affectedRows + ` products updated!\n`);
                console.table(employee);
                start();
            }
        );
    })
}

function printDepartments() {

    connection.query(`SELECT * FROM department`, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

function printEmployees() {

    connection.query(`SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name AS department FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id`, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

function printRoles() {

    connection.query(`SELECT title FROM role`, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

function employeesByManager() {

    connection.query(`SELECT * FROM employee`, async (err, employee) => {

        const {

            managerID
        } = await inquirer.prompt([{

            type: `list`,
            message: `Choose a manager:`,
            name: `managerID`,
            choices: () => {

                return employee.map((manager) => manager.manager_id);
            },
        }, ]);
        connection.query(`SELECT first_name, last_name FROM employee WHERE manager_id=${managerID}`, function (err, res) {
            if (err) throw err;
            console.table(res);
            start();
        });
    })
}

function employeesByDepartment() {
    connection.query(`SELECT * FROM department`, async (err, department) => {
       
        const {

            departmentName
        } = await inquirer.prompt([{

            type: `list`,
            message: `Select a Department:`,
            name: `departmentName`,
            choices: () => {

                return department.map((department) => department.name);
            }
        }]);
        connection.query(`SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name AS department FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id`, function (err, res) {
            if (err) throw err;
            console.table(res.filter((name) => departmentName === name.department));
            start();
        });
    })
}

//Deleting Roles
async function rmRole() {

    connection.query(`SELECT * FROM role`, async (err, role) => {

        const {

            roleName
        } = await inquirer.prompt([{

            type: `list`,
            message: `Select a role to delete:`,
            name: `roleName`,
            choices: () => {

                return role.map((role) => role.title);
            }
        }]);
        console.log(roleName);
        connection.query(`DELETE FROM role WHERE ?`, {

                title: roleName
            },
            function (err, res) {

                if (err) throw err;
                console.table(role);
                start();
            });
    })
}

//Deleting Employees
function rmEmployee() {

    connection.query(`SELECT * FROM employee`, async (err, employee) => {

        const {

            employeeName
        } = await inquirer.prompt([{

            type: `list`,
            message: `Select an employee to delete:`,
            name: `employeeName`,
            choices: () => {

                return employee.map((employee) => `${employee.last_name}`);
            }
        }]);
        connection.query(`DELETE FROM employee WHERE ?`, {

                last_name: employeeName
            },
            function (err, res) {

                if (err) throw err;
                console.table(res);
                start();
            });
    })
}
