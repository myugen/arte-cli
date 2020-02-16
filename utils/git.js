module.exports = {
  builRemote: (repository, username, password) =>
    `https://${username}:${password}@${repository}`
};
