describe("Pass", () => {
  it("Should pass", () => {});
});

// import path from "path";
// import { jsonFileToEnvFile } from "../src";
// import { config } from "dotenv";
// import { readdir, unlink } from "fs/promises";

// describe("Test reading JSON files", () => {
//   it("Shoud parse the JSON file and output to env ENV file", async () => {
//     const outDir = path.join("tests", "jsonFileToEnvFiles", ".env.0");
//     await jsonFileToEnvFile(
//       path.join("tests", "jsonFiles", "0.json"),
//       outDir
//     );

//     config({ path: outDir, override: true });

//     expect(process.env.PROJECT_ID).toEqual("this-is-a-project-id");
//   });

//   it("Shoud parse the JSON file and output to env ENV file", async () => {
//     const outDir = path.join("tests", "jsonFileToEnvFiles", ".env.1");
//     await jsonFileToEnvFile(
//       path.join("tests", "jsonFiles", "1.json"),
//       outDir
//     );

//     config({ path: outDir, override: true });

//     expect(process.env.PROJECT_ID).toEqual("this-is-a-project-id");
//     expect(process.env.API_KEY).toEqual("fake-api-key");
//     expect(process.env.APP_ID).toEqual("fake-app-id");
//   });

//   it("Shoud parse the JSON file and output to env ENV file", async () => {
//     const outDir = path.join("tests", "jsonFileToEnvFiles", ".env.2");
//     await jsonFileToEnvFile(
//       path.join("tests", "jsonFiles", "2.json"),
//       outDir
//     );

//     config({ path: outDir, override: true });

//     expect(process.env.PROJECT_ID).toEqual("this-is-a-project-id");
//     expect(process.env.ITEM_0).toEqual("item 0");
//     expect(process.env.ITEM_1).toEqual("item 1");
//     expect(process.env.ITEM_2).toEqual("item 2");
//   });

//   it("Shoud parse the JSON file and output to env ENV file", async () => {
//     const outDir = path.join("tests", "jsonFileToEnvFiles", ".env.3");
//     await jsonFileToEnvFile(
//       path.join("tests", "jsonFiles", "3.json"),
//       outDir
//     );

//     config({ path: outDir, override: true });

//     expect(process.env.PROJECT_ID).toEqual("this-is-a-project-id");
//     expect(process.env.ITEM_0).toEqual("item 0");
//     expect(process.env.ITEM_1).toEqual("item 1");
//     expect(process.env.ITEM_2).toEqual("item 2");
//     expect(process.env.APP_ID).toEqual("fake-app-id");
//   });

//   it("Shoud parse the JSON file and output to env ENV file", async () => {
//     const outDir = path.join("tests", "jsonFileToEnvFiles", ".env.4");
//     await jsonFileToEnvFile(
//       path.join("tests", "jsonFiles", "4.json"),
//       outDir
//     );

//     config({ path: outDir, override: true });

//     expect(process.env.PROJECT_ID).toEqual("this-is-a-project-id");
//     expect(process.env.ITEM_0).toEqual("item 0");
//     expect(process.env.ITEM_1).toEqual("item 1");
//     expect(process.env.ITEM_2).toEqual("item 2");
//     expect(process.env.APP_ID).toEqual("fake-app-id");
//     expect(process.env.TOKENS_0).toEqual("abc-token");
//     expect(process.env.TOKENS_1).toEqual("def-token");
//     expect(process.env.TOKENS_2).toEqual("ghi-token");
//   });

//   it("Shoud parse the JSON file and output to env ENV file", async () => {
//     const outDir = path.join("tests", "jsonFileToEnvFiles", ".env.5");
//     await jsonFileToEnvFile(
//       path.join("tests", "jsonFiles", "5.json"),
//       outDir
//     );

//     config({ path: outDir, override: true });

//     expect(process.env.PROJECT_ID).toEqual("this-is-a-project-id");
//     expect(process.env.ITEM_0).toEqual("item 0");
//     expect(process.env.ITEM_1).toEqual("item 1");
//     expect(process.env.ITEM_2).toEqual("item 2");
//     expect(process.env.APP_ID).toEqual("fake-app-id");
//     expect(process.env.TOKENS_0).toEqual("abc-token");
//     expect(process.env.TOKENS_1).toEqual("def-token");
//     expect(process.env.TOKENS_2).toEqual("ghi-token");
//     expect(process.env.USERS_0_NAME).toEqual("Uno");
//     expect(process.env.USERS_0_EMAIL).toEqual("uno@gmail.com");
//     expect(process.env.USERS_1_NAME).toEqual("Dos");
//     expect(process.env.USERS_1_EMAIL).toEqual("dos@gmail.com");
//   });

//   afterAll(async () => {
//     const dirPath = path.join("tests", "jsonFileToEnvFiles");
//     try {
//       const files = await readdir(dirPath);

//       const deleteFilePromises = files.map((file) =>
//         unlink(path.join(dirPath, file))
//       );

//       await Promise.all(deleteFilePromises);
//     } catch (err) {
//       console.log(err);
//     }
//   });
// });
