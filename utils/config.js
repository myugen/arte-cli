module.exports = {
  isValid: conf => {
    if (!conf.has("projects.path")) {
      return false;
    }

    if (!conf.has("git.provider")) {
      return false;
    }

    if (!conf.has("git.url")) {
      return false;
    }

    if (!conf.has("git.username")) {
      return false;
    }

    if (!conf.has("git.password")) {
      return false;
    }

    return true;
  }
};
