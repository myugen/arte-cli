const ora = require("ora");

const { inquirer } = require("../lib");
const utils = require("../utils");
const settings = require("../settings");

module.exports = dependencies => ({
  command: "config",
  describe: "Setup the CLI",
  builder: yargs =>
    yargs
      .option("file", {
        description: "Provide a config file",
        alias: "file",
        type: "string"
      })
      .check(argv => {
        if (argv.file && !utils.file.pathExists(argv.file)) {
          throw new Error("Filepath is not a readable file");
        } else {
          return true;
        }
      }),
  handler: async argv => {
    const spinner = ora(settings.ora());
    const conf = dependencies.storedConfig;
    console.log("⚙️ Set your setup:");
    dependencies.header();
    const { path } = await inquirer.askBasePath();
    console.log();
    const git = await inquirer.askGitCredentials();
    spinner.start("Setting your setup");
    conf.set("projects.path", path);
    conf.set("git.provider", git.provider);
    conf.set("git.url", git.url);
    conf.set("git.username", git.username);
    const password = utils.crypto.encrypt(git.password);
    conf.set("git.password", password);
    spinner.succeed("Configuration has setted succesfully 👍");
    console.log();

    return conf;
  }
});
