import { promises as fs } from "fs";
import { dbFilePath } from "./grab_db";

describe("generateDbTypes", async () => {
  it("checks for a db.types.ts file", async () => {
    const fileExists = await fs
      .access(dbFilePath)
      .then(() => true)
      .catch(() => false);
    expect(fileExists).toBe(true);
  });
});

describe("modifyDbTypes", async () => {
  it("checks for correct type generation", async () => {
    const contentsBefore = await fs.readFile(dbFilePath, "utf8");
    const firstLine = contentsBefore.split("\n")[0];
    expect(firstLine).toBe("export type Json =");

    // expect(firstLine).not.toMatch(/^postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)$/);
  });
});
