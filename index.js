const inquirer = require('inquirer')
const mySQL = require('mysql')
const consoleTable = require('console.table')
const managers = ['J. Jonah Jameson', 'Bruce Banner']
//const { listenerCount } = require('node:events')
//const { resolveSoa } = require('node:dns')
//const { allowedNodeEnvironmentFlags } = require('node:process')

const connection = mySQL.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'employees_db'
})
connection.connect((err) => {
    if (err) throw err
    appStart()
})

const appStart = () => {
    inquirer.prompt({
        type: 'list',
        name: 'start',
        message: 'please choose one of the following',
        choices: ['Add employee',
        'Update employee',
        'All employees',
        'Sort employees by role',
        'Sort employees by department',
        'Add new role',
        'Add new department',
            'finished'
        ],

    }).then((res) => {
        switch (res.start) {
            case "Add employee":
                addEmployee();
                break;
            case "Update employee":
                employeeUpdate();
                break;
            case "All employees":
                employeeList();
                break;
            case "Sort employees by role":
                roles();
                break;
            case "Sort employees by department":
                departments();
                break;
            case "Add new role":
                addRole();
                break;
            case "Add new department":
                addDepartment();
                break;
            case "finished":
                allDone();
                break;

        }
    })
}
const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'First name of new employee'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'last name of new employee'
        },
        {
            type: 'list',
            name: 'role',
            message: 'Job title/role of new employee',
            choices: roles()
        },
        {
            type: 'list',
            name: 'ManageAssign',
            message: "New employee's manager",
            choices: managers
        }

    ]).then((res) => {
       connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [res.firstName, res.lastName, res.role, res.manageAssign]', 
       (err, res) => {
        if (err) throw err;
        console.table(res)
        appStart()
       })
    })
}
const employeeUpdate = () => {
    connection.query('SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id;')
    inquirer.prompt([
        {
            name: "lastName",
            type: "rawlist",
            choices: () => {
                const lastNames = []
                for (var i = 0; i < res.length; i++) {
                    lastNames.push(res[i].last_name)
                }
                return lastNames;
            },
            message: "Last name of desired employee? ",
        },
        {
            name: "newRole",
            type: "rawlist",
            message: "new title of selected employee ",
            choices: roles()
        },
    ]).then((res) => {
        var roleId = selectRole().indexOf(res.role) + 1
        connection.query("UPDATE employee SET WHERE ?",
            {
                last_name: val.lastName
            },
            {
                role_id: roleId
            },
            (err) => {
                if (err) throw err
                console.table(res)
                appStart()
            })

    })
}
const employeeList = () => {
    connection.query ('SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name AS department FROM employee LEFT JOIN role ON (employee.role_id = role.id) LEFT JOIN department ON (department.id = role.department_id)',
    (err,res) => {
        if (err) throw err
    console.table(res)
    appStart()
})
}
const roles = () => {
    connection.query('SELECT employee.first_name, employee.last_name, role.title AS title FROM employee JOIN role ON employee.role_id = role.id;', 
    (err,res) => {
        if (err) throw err
    console.table(res)
    appStart()
})
}
const departments = () => {
    connection.query('SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;',
    (err,res) => {
        if (err) throw err
    console.table(res)
    appStart()
    })
}
const addRole = () => {
    const query = 'SELECT role.title AS title, role.salary AS salary FROM role'
    connection.query(query)
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: "Job title name"
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Salary of new title'
        }
    ]).then((res) => {
        connection.query('INSERT INTO role SET ?',
            {
                title: res.title,
                salary: res.salary
            },
            (err) => {
                if (err) throw err
                console.table(res)
                appStart()
            })
    })
}
const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDep',
            message: 'Name of new department'
        }
    ]).then((res) => {
        connection.query('INSERT INTO department SET ?',
            {
                name: res.name
            },
            (err) => {
                if (err) throw err
                console.table(res)
                appStart()
            }
        )    
    })
}

