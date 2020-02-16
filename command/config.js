const { inquirer } = require("../lib");
const utils = require("../utils");

module.exports = {
  exec: async conf => {
    console.log("⚙️ Set your setup:");
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
