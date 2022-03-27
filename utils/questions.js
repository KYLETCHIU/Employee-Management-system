module.exports = {

    //Opening Question
    initialQuestion: {
        type: "list",
        message: "What would you like to do?",
        name: "initial",
        choices: ["Add Employee",
            "Add Department",
            "Add Role",
            "View Departments",
            "View Employees",
            "Update Employee's Role",
            "View All Employees by Manager",
            "Remove Employee",
            "View All Employees by Ddepartment",
            "View All Roles",
            "Add a Role",
            "Remove Roles",
            "Exit"
        ]
    },

    //Adding Employees
    addEmployee: (roles, employees) => [{
            type: "input",
            message: "Employee's first name?",
            name: "first_name",
        },
        {
            type: "input",
            message: "Employee's last name?",
            name: "last_name",
        },
        {
            type: "list",
            message: "Employee's roleID?",
            name: "role_id",
            choices: roles
        },
        {
            type: "list",
            message: "Name of employee's manager?",
            name: "manager_id",
            choices: employees
        }
    ],

    //Adding Departments
    addDepartmentQuestions: {
        type: "input",
        message: "Name of your department?",
        name: "department_name",
    },

    //Adding Roles
    addRole: [{
            type: "input",
            message: "Title of your new role?",
            name: "titleRole",
        },
        {
            type: "input",
            message: "Salary for this role?",
            name: "salary",
        },
        {
            type: "input",
            message: "Department id for this role?",
            name: "departmentIDrole",
        }
    ],

    //Removing Roles
    removeRole: {
        type: "list",
        message: "Employee's role?",
        name: "roleRemoval",
        choices: ["Manager", "Associate", "Soft"]
    },

    //Quitting
    quit: {
        type: "list",
        message: "Sure you would like to quit?",
        name: "quit",
        choices: ["Yes", "No"]
    },

    //Removing Employees
    removeEmployee: {
        type: "list",
        message: "Employee's role?",
        name: "employeeRemoval",
        choices: ["Manager", "Associate", "Soft"]
    }
}