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
    //foreign key/join?//
    const sql = 'select * from role';
    db.query(sql, (err, rows) => {
        if (err) throw err
        console.table(rows)
        menu();
    })


};

const viewEmployees = async () => {
    //foreign key/join?//
    const sql = 'select * from employee';
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
        console.log(answers);
        const deptIdSql = `Select id from department Where department_name = (?)`;
        const deptIdParams = answers.department;

        const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
        const params = [answers.title, answers.salary, answers.department];
        db.query(sql, params, (err, rows) => {
            if (err) throw err;
            console.log("Success.");
            menu();
        }
        )
    })

}

const addEmployee = () => {
    inquirer.prompt[{
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
        message: 'What is your managers last name?'
    },
]).then((answers) => {
        console.log(answers);
        const sql = `INSERT INTO employee (first_name, last_name, role, ) VALUES (?, ?, ?)`;
        const params = [answers.title, answers.salary, answers.department];
        db.query(sql, params, (err, rows) => {
            if (err) throw err;
            console.log("Success.");
            menu();
        }
        )
    })

}

const editEmployee = () => {
    const sql = `UPDATE role SET role = ? 
    WHERE id = ?`;


}


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



