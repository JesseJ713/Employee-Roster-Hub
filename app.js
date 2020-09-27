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

let html = "";

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
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
            placeholderEngineer(engineerData);

            restartInquirer();
          });
          break;
        case "Manager":
          inquirer.prompt(Questions.managerQuestion).then((managerAnswer) => {
            const managerData = new Manager(
              answer.name,
              answer.id,
              answer.email,
              managerAnswer.github
            );
            placeholderManager(managerData);

            restartInquirer();
          });
          break;
        case "Intern":
          inquirer.prompt(Questions.internQuestion).then((internAnswer) => {
            const internData = new Intern(
              answer.name,
              answer.id,
              answer.email,
              internAnswer.github
            );
            placeholderIntern(internData);

            restartInquirer();
          });
          break;
      }
    })
    .catch((err) => {
      throw err;
    });
}

function restartInquirer() {
  inquirer.prompt(Questions.newQuestion).then((answer) => {
    switch (answer.role) {
      case "Yes, I would like to add another member ":
        createEmployee();
        break;

      case "No, I would not like to add another member ":
        createHTML();
        break;
    }
  });
}

function placeholderEngineer(engineerData) {
  fs.readFile("./templates/engineer.html", "utf8", function (err, data) {
    const userData = data
      .replace("{{ name }}", engineerData.name)
      .replace("{{ role }}", engineerData.role)
      .replace("{{ id }}", engineerData.id)
      .replace("{{ email }}", engineerData.email)
      .replace("{{ github }}", engineerData.github);

    html += userData;
  });
}

function placeholderManager(managerData) {
  fs.readFile("./templates/manager.html", "utf8", function (err, data) {
    const userData = data
      .replace("{{ name }}", managerData.name)
      .replace("{{ role }}", managerData.role)
      .replace("{{ id }}", managerData.id)
      .replace("{{ email }}", managerData.email)
      .replace("{{ officeNumber }}", managerData.officeNumber);

    html += userData;
  });
}

function placeholderIntern(internData) {
  fs.readFile("./templates/intern.html", "utf8", function (err, data) {
    const userData = data
      .replace("{{ name }}", internData.name)
      .replace("{{ role }}", internData.role)
      .replace("{{ id }}", internData.id)
      .replace("{{ email }}", internData.email)
      .replace("{{ school }}", internData.school);

    html += userData;
  });
}

createEmployee();
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
