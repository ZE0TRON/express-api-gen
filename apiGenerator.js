export function createApiDirs(ora) {
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
        spinner.success();
        resolve(true);
      }
    );
  });
}

export function createIndexJs(ora) {
  return new Promise((resolve) => {});
}

export function createRoutesIndex(ora, routes) {
  return new Promise((resolve) => {});
}

export function createModels(ora, models) {
  return new Promise((resolve) => {});
}

export function createControllers(ora, routes, models) {
  return new Promise((resolve) => {});
}

export function createRoutes(ora, routes) {
  return new Promise((resolve) => {});
}
