const inquirer = require("inquirer");
const getenv = require("getenv");

module.exports = {
  askBasePath: () => {
    const questions = [
      {
        name: "path",
        type: "input",
        message: "Enter your projects base directory:",
        default: () => getenv("HOME"),
        validate: value =>
          value.length ? true : "Please enter your projects base directory."
      }
    ];

    return inquirer.prompt(questions);
  },
  askGitCredentials: () => {
    const questions = [
      {
        name: "provider",
        type: "list",
        message: "Select the repository provider:",
        choices: ["GitLab", "Github", "Bitbucket"],
        filter: value => value.toUpperCase()
      },
      {
        name: "url",
        type: "input",
        message: "Enter your repository URL:",
        validate: value =>
          value.length ? true : "Please enter your repository URL."
      },
      {
        name: "username",
        type: "input",
        message: "Enter your LDAP username:",
        validate: value =>
          value.length ? true : "Please enter your LDAP username."
      },
      {
        name: "password",
        type: "password",
        message: "Enter your password:",
        validate: value => (value.length ? true : "Please enter your password.")
      }
    ];

    return inquirer.prompt(questions);
  },
  askProjectParams: () => {
    const questions = [
      {
        name: "group",
        type: "input",
        message: "Enter the group to which the project belongs:",
        validate: value =>
          value.length
            ? true
            : "Please enter the group to which the project belongs."
      },
      {
        name: "year",
        type: "number",
        message: "Enter the year of the project:",
        validate: value =>
          Number.isInteger(value) ? true : "Please enter a valid year.",
        default: () => new Date().getFullYear()
      },
      {
        name: "project",
        type: "input",
        message: "Enter the name of the project:",
        validate: value =>
          value.length ? true : "Please enter the name of the project."
      }
    ];

    return inquirer.prompt(questions);
  }
};
