require("dotenv").config({ path: "./.env.local" });
const fs = require("fs");
const { promisify } = require("util");
const exec = promisify(require("child_process").exec);

const dbFilePath = "./lib/db.types.ts";

async function generateDbTypes() {
  try {
    const { stdout, stderr } = await exec(
      `yarn supabase gen types typescript --db-url postgres://postgres:${process.env.SUPABASE_DB_PW}@db.${process.env.SUPABASE_DB_URL}.supabase.co:6543/postgres > ${dbFilePath}`
    );
    console.log("stdout:", stdout);
    console.error("stderr:", stderr);
  } catch (err) {
    console.error(err);
  }
}

function modifyDbTypes() {
  // Read the contents of the db.types.ts file
  const contents = fs.readFileSync(dbFilePath, "utf8");

  // Remove the first 2 lines of the input text
  const contentsWithoutFirstTwoLines = contents.split("\n").slice(2).join("\n");

  // Remove the last 2 lines of the input text
  const contentsWithoutLastTwoLines = contentsWithoutFirstTwoLines
    .split("\n")
    .slice(0, -2)
    .join("\n");

  // Overwrite the input file with the modified text
  fs.writeFileSync(dbFilePath, contentsWithoutLastTwoLines, "utf8");
}

async function run() {
  await generateDbTypes();
  modifyDbTypes();
}

run();
