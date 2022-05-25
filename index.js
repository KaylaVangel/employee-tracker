const inquirer = require('inquirer');



const viewDepartments = () => {

}

const viewRoles = () => {

}

const viewEmployees = () => {

}

const addDepartment = () => {

}

const addRole = () => {

}

const addEmployee = () => {

}

const editEmployee = () => {

}


const menu = () => {
    console.log(menu);

    return inquirer.prompt([
        {
            type: 'checkbox',
            name: "menu",
            message: "What do you want to do?",
            choices: ["View all departments", "View all roles", "View all employees", "Add a department",
                "Add a role", "Add an employee", "update an employee role"],

        }
    ]).then(choice => {

        switch (choice.menu[0]) {
            case "View all departments":
                viewDepartments();
                break;
            case "View all roles":
                viewRoles();
                break;
            case "View all employees":
                viewEmployees();
                break;
            case "Add a department":
                viewDepartments();
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



