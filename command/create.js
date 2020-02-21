const simpleGit = require("simple-git/promise");
const makedir = require("make-dir");
const ora = require("ora");

const utils = require("../utils");
const { inquirer } = require("../lib");
const config = require("./config");
const settings = require("../settings");

module.exports = dependencies => ({
  command: "create",
  describe: "Create project structure",
  builder: yargs =>
    yargs.option("config", {
      description: "Provide a config file",
      alias: "c",
      type: "string"
    }),
  handler: async argv => {
    const spinner = ora(settings.ora());
    const conf = utils.config.isValid(dependencies.storedConfig)
      ? dependencies.storedConfig
      : await config.exec(defaultConf);

    dependencies.header();
    console.log("💻 Set the correct info:");
    console.log();
    const { group, year, project } = await inquirer.askProjectParams();

    console.log();
    spinner.start("Doing the magic ✨");

    const path = conf.get("projects.path");
    const git = conf.get("git");
    const projectDirectory = await makedir(
      `${path}/${group.toUpperCase()}/${year}-${project}`
    );
    if (utils.file.pathExists(`${projectDirectory}/${project}`)) {
      spinner.info(`The project structure was already created`);
    } else {
      const repository = `${git.url}/${group}/${project}`;
      const password = utils.crypto.decrypt(git.password);
      const remote = utils.git.builRemote(repository, git.username, password);
      simpleGit(projectDirectory)
        .silent(true)
        .clone(remote)
        .then(() =>
          spinner.succeed(
            `Finished, project structure created at ${projectDirectory}`
          )
        )
        .catch(err => spinner.fail(`Ups! Something went wrong. ${err}`));
    }
  }
});
