const inquirer = require('inquirer')
const mySQL = require('mysql')
const consoleTable = require('console.table')
const { listenerCount } = require('node:events')
const { resolveSoa } = require('node:dns')
const { allowedNodeEnvironmentFlags } = require('node:process')

const connect = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user:'root',
    password:'root',
    database:'Employees_db'
})

const appStart = () => {
    inquirer.prompt({
            type: list,
            name:'startPrompt',
            message: 'please choose one of the following',
            choices:[('Add employee'),
                     ('Update employee'),
                     ('All employees'),
                     ('Sort employees by role'),
                     ('Sort employees by department'),
                     ('Add new role'),
                     ('Add new department')
                     ('finished')
                    ],
                  
    }).then((res) => {
        switch (res.startPrompt) {
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
