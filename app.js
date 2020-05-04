const { Command } = require("commander");
const ora = require("ora");
const { parseList } = require("./parser");
const { createNpmPackage, installModules } = require("./npm");
const {
  createApiDirs,
  createIndexJs,
  createRoutesIndex,
  createModels,
  createControllers,
  createRoutes,
} = require("./apiGenerator");

const program = new Command();
program.version("1.0.0");

program
  .option("-d, --debug", "output extra debugging")
  .option(
    "-r, --routes <routes>",
    "The routes for the api comma-separated list",
    parseList
  )
  .option(
    "-m, --models <models>",
    "The data models for the api comma-separated list",
    parseList
  );

program.parse(process.argv);

(async () => {
  // Ora initializing npm package
  // npm init -y
  await createNpmPackage(ora);
  // npm install express body-parser --save
  await installModules(ora);
  // mkdir api
  await createApiDirs(ora);
  // write index.js
  createIndexJs(ora);
  // write api/routes/index.js
  createRoutesIndex(ora, program.routes);
  // write model for every model
  createModels(ora, program.models);
  // write controller for every route import model if match
  createControllers(ora, program.routes, program.models);
  // write router for every route import controller
  createRoutes(ora, program.routes);
})();

console.log(program.routes);
console.log(program.models);
