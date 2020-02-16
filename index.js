#!/usr/bin/env node
const Configstore = require("configstore");

const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const ora = require("ora");

const pkg = require("./package.json");
const settings = require("./settings");
const command = require("./command");
const { arguments } = require("./utils");

const header = () => {
  console.log(
    chalk
      .hex("#0072CE")
      .bold(figlet.textSync("arte_", { horizontalLayout: "full" }))
  );
  console.log();
  console.log(
    chalk.hex("#26D07C").underline("Welcome to ARTE Command Line Interface")
  );
  console.log();
};

const init = args => {
  const conf = new Configstore(pkg.name);
  const spinner = ora(settings.ora());
  header();
  if (arguments.exists(args, "help")) {
    command.help.exec();
  }
  if (arguments.exists(args, "config")) {
    command.config.exec(conf);
  }
  if (arguments.exists(args, "run")) {
    command.run.exec(conf);
  }
  console.log();
};

clear();
init(process.argv);
