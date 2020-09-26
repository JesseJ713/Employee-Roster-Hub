// Establishing questions for Inquirer that will display to the user

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
    type: "list",
    message: "Please choose from the list the role of the employee: ",
    name: ["Engineer", "Intern", "Manager"],
  },
];
