const { exec } = require("child_process");
function createNpmPackage(ora) {
  return new Promise((resolve) => {
    const spinner = ora("Initializing npm package").start();
    exec("npm init -y", (error, stdout, stderr) => {
      if (error) {
        spinner.fail(error.message);
        console.log(`error: ${error.message}`);
        resolve(false);
      }
      if (stderr) {
        spinner.fail(error.message);
        console.log(`stderr: ${stderr}`);

        resolve(false);
      }
      spinner.success();
      resolve(true);
    });
  });
}
function installModules(ora) {
  return new Promise((resolve) => {
    const spinner = ora("Installing npm modules").start();
    exec("npm install express body-parser --save", (error, stdout, stderr) => {
      if (error) {
        spinner.fail(error.message);
        console.log(`error: ${error.message}`);
        resolve(false);
      }
      if (stderr) {
        spinner.fail(error.message);
        console.log(`stderr: ${stderr}`);

        resolve(false);
      }
      spinner.success();
      resolve(true);
    });
  });
}

exports.createNpmPackage = createNpmPackage;
exports.installModules = installModules;
