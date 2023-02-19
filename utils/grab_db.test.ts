import { promises as fs } from "fs";
import path from "path";
import { generateDbTypes, modifyDbTypes } from "./grab_db";

const dbFilePath = path.join(__dirname, "lib/db.types.ts");

describe("generateDbTypes", () => {
  it("generates a db.types.ts file", async () => {
    await generateDbTypes();
    const fileExists = await fs
      .access(dbFilePath)
      .then(() => true)
      .catch(() => false);
    expect(fileExists).toBe(true);
  });
});

describe("modifyDbTypes", () => {
  it("removes the first two lines and the last two lines from the db.types.ts file", async () => {
    const contentsBefore = await fs.readFile(dbFilePath, "utf8");
    await modifyDbTypes();
    const contentsAfter = await fs.readFile(dbFilePath, "utf8");
    const numLinesBefore = contentsBefore.split("\n").length;
    const numLinesAfter = contentsAfter.split("\n").length;
    expect(numLinesAfter).toBe(numLinesBefore - 4);
  });
});
