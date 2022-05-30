const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');



const viewDepartments = async () => {
    const sql = 'Select * From department';
    db.query(sql, (err, rows) => {
        if (err) throw err
        console.table(rows)
        menu();
    })
};

const viewRoles = async () => {
    const sql = 'SELECT role.id, role.title, role.salary, department.department_name FROM role LEFT JOIN department ON role.department_id = department.id';
    db.query(sql, (err, rows) => {
        if (err) throw err
        console.table(rows)
        menu();
    })


};

const viewEmployees = async () => {
    const sql = 'SELECT t2.id, t2.first_name, t2.last_name, t2.title, t2.department_name, employee.first_name as manager_first_name, employee.last_name as manager_last_name FROM (SELECT employee.id, first_name, last_name, title, salary, department_name, manager_id FROM employee INNER JOIN (SELECT role.id, role.title, role.salary, department.department_name FROM role LEFT JOIN department ON role.department_id = department.id) t1 ON employee.role_id = t1.id) t2 LEFT JOIN employee ON t2.manager_id = employee.id'
    db.query(sql, (err, rows) => {
        if (err) throw err
        console.table(rows)
        menu();
    })
};

const addDepartment = async () => {
    inquirer.prompt([
        {
            type: 'input',
            name: "departmentName",
            message: 'What is your departments name? (Required)',
        },
    ]).then((answers) => {
        const sql = `INSERT INTO department (department_name) VALUES (?)`;
        const params = answers.departmentName;
        db.query(sql, params, (err, rows) => {
            if (err) throw err;
            console.log("Success.");
            menu();
        }
        )
    })
}

const addRole = async () => {
    inquirer.prompt([
        {
            type: 'input',
            name: "title",
            message: 'What is your title? (Required)',
        },
        {
            type: 'input',
            name: "salary",
            message: 'What is your salary? (Required)',
        },
        {
            type: 'input',
            name: "department",
            message: 'What is your department? (Required)',
        },


    ]).then((answers) => {
        const deptIdSql = `Select id from department Where department_name = (?)`;
        const deptIdParams = answers.department;
        let deptId;
        db.query(deptIdSql, deptIdParams, (err, rows) => {
            if (err) throw err;
            deptId = rows[0].id;
            const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
            const params = [answers.title, answers.salary, deptId];
            db.query(sql, params, (error, rowses) => {
                if (err) throw err;
                console.log("Success.");
                menu();
            }
            )
        });



    })
};



const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: "firstName",
            message: 'What is your first name? (Required)',
        },
        {
            type: 'input',
            name: "lastName",
            message: 'What is your last name? (Required)',
        },
        {
            type: 'input',
            name: "role",
            message: 'What is your role? (Required)',
        },
        {
            type: 'input',
            name: "managerFirst",
            message: 'What is your managers first name?',
        },
        {
            type: 'input',
            name: "managerLast",
            message: 'What is your managers last name?',
        }
    ]).then((answers) => {
        const roleSql = `SELECT id FROM role WHERE role.title LIKE "${answers.role}"`;
        let roleId;
        db.query(roleSql, (err, rows) => {
            if (err) throw err;
            roleId = rows[0].id;

            const man = `SELECT id FROM employee WHERE first_name LIKE "${answers.managerFirst}" AND last_name LIKE "${answers.managerLast}"`;
            let managerId;
            db.query(man, (err, rows) => {
                if (err) throw err;
                managerId = rows[0].id;

                const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id ) VALUES (?, ?, ?, ?)`;
                const params = [answers.firstName, answers.lastName, roleId, managerId];
                db.query(sql, params, (err, rows) => {
                    if (err) throw err;
                    console.log("Success.");
                    menu();
                })

            });

        });





    })

};

const updateEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: "employee",
            message: 'Please enter the id number of the employee you would like to update. (Required)',
        },
        {
            type: 'input',
            name: "role",
            message: 'What is the new role of this employee? (Required)',
        },

    ]).then((answers) => {
        let upRol = `UPDATE employee SET role_id = ${answers.role} WHERE id = ${answers.employee} `;
        db.query(upRol, (err, rows) => {
            if (err) throw err;
            console.log(rows);
            console.log("Success.");
            menu();
        });


    });
};


const menu = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: "menu",
            message: "What do you want to do?",
            choices: ["View all departments", "View all roles", "View all employees", "Add a department",
                "Add a role", "Add an employee", "update an employee role"],

        }
    ]).then(choice => {
        switch (choice.menu) {
            case "View all departments":
                viewDepartments()
                break;
            case "View all roles":
                viewRoles();
                break;
            case "View all employees":
                viewEmployees();
                break;
            case "Add a department":
                addDepartment();
                break;
            case "Add a role":
                addRole();
                break;
            case "Add an employee":
                addEmployee();
                break;
            case "update an employee role":
                updateEmployee();
                break;
            default:
        }

    })

}



const init = () => {
    menu()
}

init();

