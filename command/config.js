const { inquirer } = require("../lib");
const utils = require("../utils");

module.exports = {
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
    console.log("⚙️ Set your setup:");
    argv.header();
    const conf = argv.storedConfig;
    const { path } = await inquirer.askBasePath();
    conf.set("projects.path", path);
    const git = await inquirer.askGitCredentials();
    conf.set("git.provider", git.provider);
    conf.set("git.url", git.url);
    conf.set("git.username", git.username);
    const password = utils.crypto.encrypt(git.password);
    conf.set("git.password", password);
    console.log();
    return conf;
  }
};
