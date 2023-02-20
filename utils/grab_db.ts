// eslint-disable-next-line import/no-extraneous-dependencies
import dotenv from "dotenv";
import fs from "fs";
import { exec } from "child_process";
import { promisify } from "util";

dotenv.config({ path: "./.env.local" });

export const dbFilePath = "./lib/db.types.ts";
export const generateDbTypes = async () => {
  try {
    await promisify(exec)(
      `yarn supabase gen types typescript --db-url postgres://postgres:${process.env.SUPABASE_DB_PW}@db.${process.env.SUPABASE_DB_URL}.supabase.co:6543/postgres > ${dbFilePath}`
    );
    return true;
  } catch (err) {
    return false;
  }
};

const modifyDbTypes = () => {
  //   // Read the contents of the db.types.ts file
  const contents = fs.readFileSync(dbFilePath, "utf8");

  // Remove the first 2 lines of the input text
  const contentsWithoutFirstTwoLines = contents.split("\n").slice(1).join("\n");

  // Remove the last 2 lines of the input text
  const contentsWithoutLastTwoLines = contentsWithoutFirstTwoLines
    .split("\n")
    .slice(0, -2)
    .join("\n");

  //   // Overwrite the input file with the modified text
  fs.writeFileSync(dbFilePath, contentsWithoutLastTwoLines, "utf8");
};

if (require.main === module) {
  const run = async () => {
    const didItRun = await generateDbTypes();
    if (didItRun) {
      modifyDbTypes();
    }
  };
  run();
}
