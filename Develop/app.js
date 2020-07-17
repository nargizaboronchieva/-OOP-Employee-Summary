const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const theTeamMembers = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const employeePrompt = {
  type: 'list',
  name: 'newEmployee',
  message: 'Which type of employee would you like to add?',
  choices: ['Manager', 'Engineer', 'Intern'],
};

const commonInputs = ([
    {
        type: 'input',
        name: 'newName',
        message: 'what is the name of employee you are going to add.'
    },
    {
        type: 'input',
        name: 'newID',
        message: 'Please enter Employee Id you are adding.'
    },
    {
        type: 'input',
        name: 'newEmail',
        message: 'Please add email for Employee you are adding.'
    }
]);

const managerQuestions = () => {
    const managerSpecificPrompt = {
        type: 'input',
        name: 'newManagerOfficeNumber',
        message: 'Please enter engineer office phone number',
    };
    const managerPrompts = commonInputs.concat(managerSpecificPrompt);
    let legibleMgrPrompts = JSON.stringify(managerPrompts);
    console.log(`The manager questions are ${legibleMgrPrompts}`);
    return managerPrompts;
};

const engineerQuestions = () => {
    const engineerSpecificPrompt = {
        type: 'input',
        name: 'newEngineerGitHub',
        message: 'Please enter the GitHub username for the Engineer you are adding.',
    };
    const engineerPrompts = commonInputs.concat(engineerSpecificPrompt);
    let legibleEngineerPrompts = JSON.stringify(engineerPrompts);
    console.log(`The engineer questions are ${legibleEngineerPrompts}`);
    return engineerPrompts;
};

const internQuestions = () => {
    const internSpecificPrompt = {
        type: 'input',
        name: 'newInternSchool',
        message: 'Please give the name of  the school for the Intern we are creating .',
    };
    const internPrompts = commonInputs.concat(internSpecificPrompt);
    let legibleInternPrompts = JSON.stringify(internPrompts);
    console.log(`The intern questions are ${legibleInternPrompts}`);
    return internPrompts;
};

function addMorePrompt(){
    inquirer.prompt({
        type: 'confirm',
        name: 'addAnotherEmployee',
        message: 'Do you want to add another employee?'
    }).then(answers => {
        if(answers.addAnotherEmployee){
            main();
        }else{
            console.log('See you again! Thank you for using our system!');
        }
    });
};

function main() {
  console.log('LET ME HELP YOU TO GENERATE EMPLOYEE SUMMARY');
  selectEmployee();
};

function selectEmployee() {
  inquirer.prompt(employeePrompt).then((answers) => {
    if (answers.newEmployee === 'Manager') {
      console.log('Wonderful! We are going to create a Manager.');
      managerQuestions();
      newManager(managerQuestions);
    } else if (answers.newEmployee === 'Engineer') {
      console.log('Wonderful! We are going to create an Engineer.');
      newEngineer();
    } else {
      console.log('Wonderful! We are going to create an Intern.');
      newIntern();
    }
  });
};

function newManager() {
    inquirer.prompt(managerQuestions()).then((answers) => {
      const newManager = new Manager(answers.newName, answers.newID, answers.newEmail, answers.newManagerOfficeNumber);
      theTeamMembers.push(newManager);
      let legibleArray = JSON.stringify(theTeamMembers);
      console.log(`The team members array so far = ${legibleArray}`);
      let legibleMgrAdded = JSON.stringify(newManager);
      console.log(`The new manager = ${legibleMgrAdded}`);
      return newManager;
    }).then(addMorePrompt);;
  };

function newEngineer() {
  inquirer.prompt(engineerQuestions()).then((answers) => {
    const newEngineer = new Engineer(answers.newName, answers.newID, answers.newEmail, answers.newEngineerGitHub);
    theTeamMembers.push(newEngineer);
    let legibleArray = JSON.stringify(theTeamMembers);
    console.log(`The team members array so far = ${legibleArray}`);
    let legibleEngineerAdded = JSON.stringify(newEngineer);
    console.log(`The new engineer = ${legibleEngineerAdded}`);
    return newEngineer;
  }).then(addMorePrompt);
};

function newIntern() {
    inquirer.prompt(internQuestions()).then((answers) => {
      const newIntern = new Intern(answers.newName, answers.newID, answers.newEmail, answers.newInternSchool);
      theTeamMembers.push(newIntern);
      let legibleArray = JSON.stringify(theTeamMembers);
      console.log(`The team members array so far = ${legibleArray}`);
      let legibleInternAdded = JSON.stringify(newIntern);
      console.log(`The new intern = ${legibleInternAdded}`);
      return newIntern;
    }).then(addMorePrompt);;
  };


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

function init() {
    main();
};

init();