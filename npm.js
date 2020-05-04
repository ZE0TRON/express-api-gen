const { exec } = require("child_process");
function createNpmPackage(ora) {
  return new Promise((resolve) => {
    const spinner = ora("Initializing npm package").start();
    exec("npm init -y", (error, stdout, stderr) => {
      if (error) {
        spinner.fail(error);
        console.log(`error: ${error}`);
        resolve(false);
      }
      if (stderr) {
        spinner.fail(error);
        console.log(`stderr: ${stderr}`);

        resolve(false);
      }
      spinner.succeed();
      resolve(true);
    });
  });
}
function installModules(ora) {
  return new Promise((resolve) => {
    const spinner = ora("Installing npm modules").start();
    exec("npm install express body-parser --save", (error, stdout, stderr) => {
      if (error) {
        spinner.fail(error);
        console.log(`error: ${error}`);
        resolve(false);
      }
      spinner.succeed();
      resolve(true);
    });
  });
}

exports.createNpmPackage = createNpmPackage;
exports.installModules = installModules;
