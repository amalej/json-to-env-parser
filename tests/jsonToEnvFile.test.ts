import path from "path";
import { jsonToEnvFile } from "../src";
import { config } from "dotenv";
import { mkdir, readdir, rmdir, stat, unlink } from "fs/promises";

describe("Test reading JSON files", () => {
  beforeAll(async () => {
    const outDir = path.join(__dirname, "jsonToEnvFiles");
    try {
      await stat(outDir);
    } catch (err) {
      if (err.code === "ENOENT") {
        await mkdir(outDir);
      } else {
        throw new Error(`Unknown error occured: ${err.message}`);
      }
    }
  });

  it("Shoud parse the JSON file and output it in an env format", async () => {
    const outFilePath = path.join("tests", "jsonToEnvFiles", ".env.0");
    await jsonToEnvFile(outFilePath, {
      project_id: "this-is-a-project-id",
    });

    config({ path: outFilePath, override: true });

    expect(process.env.PROJECT_ID).toEqual("this-is-a-project-id");
  });

  it("Shoud parse the JSON file and output it in an env format", async () => {
    const outFilePath = path.join("tests", "jsonToEnvFiles", ".env.1");
    await jsonToEnvFile(outFilePath, {
      project_id: "this-is-a-project-id",
      api_key: "fake-api-key",
      app_id: "fake-app-id",
    });

    config({ path: outFilePath, override: true });

    expect(process.env.PROJECT_ID).toEqual("this-is-a-project-id");
    expect(process.env.API_KEY).toEqual("fake-api-key");
    expect(process.env.APP_ID).toEqual("fake-app-id");
  });

  it("Shoud parse the JSON file and output it in an env format", async () => {
    const outFilePath = path.join("tests", "jsonToEnvFiles", ".env.2");
    await jsonToEnvFile(outFilePath, {
      project_id: "this-is-a-project-id",
      api_key: "fake-api-key",
      app_id: "fake-app-id",
    });

    config({ path: outFilePath, override: true });

    expect(process.env.PROJECT_ID).toEqual("this-is-a-project-id");
    expect(process.env.API_KEY).toEqual("fake-api-key");
    expect(process.env.APP_ID).toEqual("fake-app-id");
  });

  it("Shoud parse the JSON file and output it in an env format", async () => {
    const outFilePath = path.join("tests", "jsonToEnvFiles", ".env.3");
    await jsonToEnvFile(outFilePath, {
      project_id: "this-is-a-project-id",
      item: ["item 0", "item 1", "item 2"],
    });

    config({ path: outFilePath, override: true });

    expect(process.env.PROJECT_ID).toEqual("this-is-a-project-id");
    expect(process.env.ITEM_0).toEqual("item 0");
    expect(process.env.ITEM_1).toEqual("item 1");
    expect(process.env.ITEM_2).toEqual("item 2");
  });

  it("Shoud parse the JSON file and output it in an env format", async () => {
    const outFilePath = path.join("tests", "jsonToEnvFiles", ".env.4");
    await jsonToEnvFile(outFilePath, {
      project_id: "this-is-a-project-id",
      item: ["item 0", "item 1", "item 2"],
      app_id: "fake-app-id",
    });

    config({ path: outFilePath, override: true });

    expect(process.env.PROJECT_ID).toEqual("this-is-a-project-id");
    expect(process.env.ITEM_0).toEqual("item 0");
    expect(process.env.ITEM_1).toEqual("item 1");
    expect(process.env.ITEM_2).toEqual("item 2");
    expect(process.env.APP_ID).toEqual("fake-app-id");
  });

  it("Shoud parse the JSON file and output it in an env format", async () => {
    const outFilePath = path.join("tests", "jsonToEnvFiles", ".env.5");
    await jsonToEnvFile(outFilePath, {
      project_id: "this-is-a-project-id",
      item: ["item 0", "item 1", "item 2"],
      app_id: "fake-app-id",
      tokens: ["abc-token", "def-token", "ghi-token"],
    });

    config({ path: outFilePath, override: true });

    expect(process.env.PROJECT_ID).toEqual("this-is-a-project-id");
    expect(process.env.ITEM_0).toEqual("item 0");
    expect(process.env.ITEM_1).toEqual("item 1");
    expect(process.env.ITEM_2).toEqual("item 2");
    expect(process.env.APP_ID).toEqual("fake-app-id");
    expect(process.env.TOKENS_0).toEqual("abc-token");
    expect(process.env.TOKENS_1).toEqual("def-token");
    expect(process.env.TOKENS_2).toEqual("ghi-token");
  });

  it("Shoud parse the JSON file and output it in an env format", async () => {
    const outFilePath = path.join("tests", "jsonToEnvFiles", ".env.6");
    await jsonToEnvFile(outFilePath, {
      project_id: "this-is-a-project-id",
      item: ["item 0", "item 1", "item 2"],
      app_id: "fake-app-id",
      tokens: ["abc-token", "def-token", "ghi-token"],
      users: [
        {
          name: "Uno",
          email: "uno@gmail.com",
        },
        {
          name: "Dos",
          email: "dos@gmail.com",
        },
      ],
    });

    config({ path: outFilePath, override: true });

    expect(process.env.PROJECT_ID).toEqual("this-is-a-project-id");
    expect(process.env.ITEM_0).toEqual("item 0");
    expect(process.env.ITEM_1).toEqual("item 1");
    expect(process.env.ITEM_2).toEqual("item 2");
    expect(process.env.APP_ID).toEqual("fake-app-id");
    expect(process.env.TOKENS_0).toEqual("abc-token");
    expect(process.env.TOKENS_1).toEqual("def-token");
    expect(process.env.TOKENS_2).toEqual("ghi-token");
    expect(process.env.USERS_0_NAME).toEqual("Uno");
    expect(process.env.USERS_0_EMAIL).toEqual("uno@gmail.com");
    expect(process.env.USERS_1_NAME).toEqual("Dos");
    expect(process.env.USERS_1_EMAIL).toEqual("dos@gmail.com");
  });

  afterAll(async () => {
    const dirPath = path.join("tests", "jsonToEnvFiles");
    try {
      const files = await readdir(dirPath);

      const deleteFilePromises = files.map((file) =>
        unlink(path.join(dirPath, file))
      );

      await Promise.all(deleteFilePromises);
      await rmdir(dirPath);
    } catch (err) {
      console.log(err);
    }
  });
});
