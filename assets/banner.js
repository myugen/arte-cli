const chalk = require("chalk");
const figlet = require("figlet");

const banner = `
${chalk
  .hex("#0072CE")
  .bold(figlet.textSync("arte_", { horizontalLayout: "full" }))}
    
${chalk.hex("#26D07C").underline("Welcome to ARTE Command Line Interface")}
`;

module.exports = banner;
