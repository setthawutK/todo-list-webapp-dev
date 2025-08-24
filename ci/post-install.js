const { join, sep } = require("path");
const { exec } = require("child_process");
const { promisify } = require("util");
const exec$ = promisify(exec);
const { existsSync } = require("fs");

const isRebuild = process.argv.indexOf("--rebuild") !== -1;

// .bin
const BIN = join("node_modules", ".bin") + sep;

// Dependencies
const PREBUILD = ["utilities"];

// Project Available
const PROJECTS = ["photo"];

exec$("git diff -r --name-only --no-commit-id HEAD")
  .then(({ stdout }) => {
    const batch = [];

    checkAndBuildProjects(batch, stdout, PREBUILD);
    checkAndBuildProjects(batch, stdout, PROJECTS);

    if (batch.length) {
      return new Promise((resolve, reject) => {
        const ps = exec(batch.join(" && "));

        ps.stdout.pipe(process.stdout);
        ps.stderr.pipe(process.stderr);

        ps.on("close", (code) => {
          code > 0 ? reject() : resolve();
        });
      });
    }

    return Promise.resolve();
  })
  .then(() => console.info("[CI:info] Complete"));

function checkAndBuildProjects(batch, stdout, projects) {
  console.info(`[CI:info] Checking Projects ${projects.join(", ")}`);

  for (const project of projects) {
    if (
      isRebuild ||
      !existsSync(`library/${project}/dist`) ||
      RegExp(`^library[\\\\\\/]${project}`, "m").test(stdout)
    ) {
      console.info(`[CI:info] Build ${project}`);

      batch.push(`${BIN}ng build --configuration production ${project}`);
    } else {
      console.info(`[CI:info] Skip Build ${project}`);
    }
  }
}
