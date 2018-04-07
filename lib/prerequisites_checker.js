var check = require('check-node-version');
var colors = require('colors');

function PrerequisitesChecker(callback) {
  // NOTE: Old Node.js and NPM versions don't support the new ES6-style syntax,
  // thus breaks with SyntaxError as reported by people
  // here - https://github.com/vishaltelangre/music-dl/issues/5
  // and here: https://github.com/vishaltelangre/music-dl/issues/4.
  check({ node: ">= 6.3.1", npm: ">= 5.0.3" }, {}, function (err, result) {
    var versions = result.versions || {};

    if (err) console.error(err);

    var printErrorIfVersionNotSatisfied = function (tool) {
      if (versions[tool].isSatisfied) return;

      var message = "✗ Please upgrade `"
        + tool.bold
        + "` to version "
        + versions[tool].wanted.range.bold
        + " or latest. Current "
        + tool
        + " version is "
        + versions[tool].version
        + ".";

      console.error(message.red)
    }

    printErrorIfVersionNotSatisfied('node');
    printErrorIfVersionNotSatisfied('npm');

    if (versions.node.isSatisfied &&
        versions.npm.isSatisfied &&
        (typeof callback === "function")) {
      callback();
    }
  });
}

module.exports = PrerequisitesChecker;
