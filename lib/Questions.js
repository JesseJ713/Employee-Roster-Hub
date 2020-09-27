// Establishing questions for Inquirer that will display to the user
const newQuestion = [
  {
    type: "list",
    message: "Would you like to add a team member? ",
    name: "role",
    choices: [
      "Yes, I would like to add another member ",
      "No, I would not like to add another member ",
    ],
  },
];

const baseEmployeeQuestions = [
  {
    type: "input",
    message: "Please provide the name of the employee: ",
    name: "name",
  },
  {
    type: "input",
    message: "Please provide the ID of the employee: ",
    name: "id",
  },
  {
    type: "input",
    message: "Please provide the email of the employee: ",
    name: "email",
  },
  {
    type: "list",
    message: "Please choose from the list the role of the employee: ",
    name: "role",
    choices: ["Engineer", "Intern", "Manager"],
  },
];

const engineerQuestion = [
  {
    type: "input",
    message: "Please provide the Github username of the engineer: ",
    name: "github",
  },
];

const internQuestion = [
  {
    type: "input",
    message: "Please provide the school of the intern: ",
    name: "school",
  },
];

const managerQuestion = [
  {
    type: "input",
    message: "Please provide the identifying office number of the manager: ",
    name: "officeNumber",
  },
];

module.exports = {
  newQuestion,
  baseEmployeeQuestions,
  engineerQuestion,
  internQuestion,
  managerQuestion,
};
