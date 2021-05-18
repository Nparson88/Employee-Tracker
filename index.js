const inquirer = require('inquirer')
const mySQL = require('mysql')
const consoleTable = require('console.table')


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
        'View all roles',
        'View all departments',
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
            case "View all roles":
                roles();
                break;
            case "View all departments":
                departments();
                break;
            case "Add new role":
                addRole();
                break;
            case "Add new department":
                addDepartment();
                break;
            case "finished":
              connection.end()
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
            type: 'input',
            name: 'role',
            message: 'Role ID of new employee',
        },
        {
            type: 'input',
            name: 'ManageAssign',
            message: "New employee's managerID",
        }

    ]).then((res) => {
        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [res.firstName, res.lastName, res.role, res.manageAssign],
         (err, res) => {
        if (err) throw err;
        console.table(res)
        appStart()
       })
    })
}
const employeeUpdate = () =>{
    inquirer.prompt([
        {
            type : 'input',
            name : 'id',
            message: "ID of employee you wish to update",
        }
      ])
        .then((res) => {
    
          const newId = res.id
          inquirer.prompt([
            {
              name: "role",
              type: "input",
              message: "Updated role ID of employee ",
            }
          ])
            .then((res) => {
    
              const updatedRole = res.role
              const data = "UPDATE employee SET role_id=? WHERE id=?"
                connection.query(data, [updatedRole, newId], 
                (err, res) => {
                if (err) throw err;
                console.table(res);
                appStart();
              });
            });
        });
    }
const employeeList = () => {
    connection.query ('SELECT employee.id, employee.manager_id,employee.first_name, employee.last_name, role.title, role.salary, department.name AS department FROM employee LEFT JOIN role ON (employee.role_id = role.id) LEFT JOIN department ON (department.id = role.department_id)',
    (err,res) => {
        if (err) throw err
    console.table(res)
    appStart()
})
}
const roles = () => {
    connection.query('SELECT * FROM role', 
    (err,res) => {
        if (err) throw err
    console.table(res)
    appStart()
})
}
const departments = () => {
    connection.query('SELECT * FROM department',
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
        },
        {
            type: 'input',
            name: 'id',
            message: 'Add department id'
        }
    ]).then((res) => {
        connection.query('INSERT INTO role SET ?',
            {
                title: res.title,
                salary: res.salary,
                department_id: res.id
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
        },
        {
            type: 'input',
            name : 'id',
            message: 'assign a number for department id'
        }
    ]).then((res) => {
        connection.query('INSERT INTO department SET ?',
            {
                name: res.newDep,
                id : res.id
            },
            (err) => {
                if (err) throw err
                console.table(res)
                appStart()
            }
        )    
    })
}

