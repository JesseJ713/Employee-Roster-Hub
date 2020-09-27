// Establishing module requirements
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Questions = require("./lib/Questions");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Object array for userInput
let teamMembers = [];

// This function will first ask base questions standard amongst all employees. Then, depending on which role is defined, it will branch off to ask role specific questions
// This function will repeat itself until the user chooses to end the prompts and not add another employee
function createEmployee() {
  inquirer
    .prompt(Questions.baseEmployeeQuestions)
    .then((answer) => {
      switch (answer.role) {
        case "Engineer":
          inquirer.prompt(Questions.engineerQuestion).then((engineerAnswer) => {
            const engineerData = new Engineer(
              answer.name,
              answer.id,
              answer.email,
              engineerAnswer.github
            );
            teamMembers.push(engineerData);

            restartInquirer();
          });
          break;
        case "Manager":
          inquirer.prompt(Questions.managerQuestion).then((managerAnswer) => {
            const managerData = new Manager(
              answer.name,
              answer.id,
              answer.email,
              managerAnswer.officeNumber
            );
            teamMembers.push(managerData);

            restartInquirer();
          });
          break;
        case "Intern":
          inquirer.prompt(Questions.internQuestion).then((internAnswer) => {
            const internData = new Intern(
              answer.name,
              answer.id,
              answer.email,
              internAnswer.school
            );
            teamMembers.push(internData);

            restartInquirer();
          });
          break;
      }
    })
    .catch((err) => {
      throw err;
    });
}

// This will trigger another cycle of an addition of an employee or break the cycle
function restartInquirer() {
  inquirer.prompt(Questions.newQuestion).then((answer) => {
    switch (answer.role) {
      case "Yes, I would like to add another member ":
        createEmployee();
        break;

      case "No, I would not like to add another member ":
        let html = render(teamMembers);
        createHTML(html);
        break;
    }
  });
}

// Creating HTML template
const createHTML = (html) => {
  fs.writeFileSync(outputPath, html);
};

// Calling to begin asking user for input towards employees
createEmployee();
