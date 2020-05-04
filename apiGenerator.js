const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");
const appDir = path.dirname(require.main.filename);
function createApiDirs(ora) {
  return new Promise((resolve) => {
    const spinner = ora("Creating directories").start();
    exec(
      "mkdir api api/routes api/models api/controllers",
      (error, stdout, stderr) => {
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
        spinner.succeed();
        resolve(true);
      }
    );
  });
}

function createIndexJs(ora) {
  const spinner = ora("Creating index.js").start();
  try {
    const content = fs.readFileSync(appDir + "/templates/index.template.js");
    fs.writeFileSync("index.js", content);
  } catch (e) {
    spinner.fail(e);
    console.log(e);
    return;
  }
  spinner.succeed();
}

function createRoutesIndex(ora, routes) {
  const spinner = ora("Creating index route").start();
  let routeTexts = "";
  let routingTexts = "";
  for (let route of routes) {
    routeTexts += `const ${route}Router = require("./${route}");\n`;
    routingTexts += `router.use("/${route}",${route}Router);\n`;
  }

  const content = `// Router index\nconst express = require("express");\n${routeTexts}\nconst router = express.Router();\n${routingTexts}\n\nmodule.exports = router;`;
  try {
    fs.writeFileSync("api/routes/index.js", content);
  } catch (e) {
    spinner.fail(e);
    console.log(e);
    return;
  }
  spinner.succeed();
}

function createModels(ora, models) {
  const spinner = ora("Creating models").start();
  for (model of models) {
    try {
      fs.writeFileSync(`api/models/${model}.js`, `//Model ${model}`);
    } catch (e) {
      spinner.fail(e);
      console.log(e);
      return;
    }
  }
  spinner.succeed();
}

function createControllers(ora, routes, models) {
  const spinner = ora("Creating controllers").start();
  for (let controller of routes) {
    try {
      if (models.includes(controller)) {
        fs.writeFileSync(
          `api/controllers/${controller}.js`,
          `// Controller ${controller}\nconst ${
            controller.charAt(0).toUpperCase() + controller.slice(1)
          } = require("../models/${controller}");`
        );
      } else {
        fs.writeFileSync(
          `api/controllers/${controller}.js`,
          `// Controller ${controller}`
        );
      }
    } catch (e) {
      spinner.fail(e);
      console.log(e);
      return;
    }
  }
  spinner.succeed();
}

function createRoutes(ora, routes) {
  const spinner = ora("Creating routes").start();
  for (let route of routes) {
    try {
      fs.writeFileSync(
        `api/routes/${route}.js`,
        `// Router ${route}\nconst express = require("express");\nconst ${route}Controller = require("../controllers/${route}");\n\nconst router = express.Router();\n\nmodule.exports = router;`
      );
    } catch (e) {
      spinner.fail(e);
      console.log(e);
      return;
    }
  }
  spinner.succeed();
}
module.exports.createApiDirs = createApiDirs;
module.exports.createIndexJs = createIndexJs;
module.exports.createRoutesIndex = createRoutesIndex;
module.exports.createModels = createModels;
module.exports.createControllers = createControllers;
module.exports.createRoutes = createRoutes;
