import path from "path";
import { jsonFileToEnv } from "../src";

describe("Test reading JSON files", () => {
  it("Shoud parse the JSON file and output it in an env format", async () => {
    const env = await jsonFileToEnv(path.join("tests", "jsonFiles", "0.json"));

    expect(env).toEqual("PROJECT_ID=this-is-a-project-id\n");
  });

  it("Shoud parse the JSON file and output it in an env format", async () => {
    const env = await jsonFileToEnv(path.join("tests", "jsonFiles", "1.json"));

    expect(env).toEqual(
      "PROJECT_ID=this-is-a-project-id\nAPI_KEY=fake-api-key\nAPP_ID=fake-app-id\n"
    );
  });

  it("Shoud parse the JSON file and output it in an env format", async () => {
    const env = await jsonFileToEnv(path.join("tests", "jsonFiles", "2.json"));

    expect(env).toEqual(
      "PROJECT_ID=this-is-a-project-id\nITEM_0=item 0\nITEM_1=item 1\nITEM_2=item 2\n"
    );
  });

  it("Shoud parse the JSON file and output it in an env format", async () => {
    const env = await jsonFileToEnv(path.join("tests", "jsonFiles", "3.json"));

    expect(env).toEqual(
      "PROJECT_ID=this-is-a-project-id\nITEM_0=item 0\nITEM_1=item 1\nITEM_2=item 2\nAPP_ID=fake-app-id\n"
    );
  });

  it("Shoud parse the JSON file and output it in an env format", async () => {
    const env = await jsonFileToEnv(path.join("tests", "jsonFiles", "4.json"));

    expect(env).toEqual(
      `PROJECT_ID=this-is-a-project-id\nITEM_0=item 0\nITEM_1=item 1\nITEM_2=item 2\nAPP_ID=fake-app-id
TOKENS_0=abc-token\nTOKENS_1=def-token\nTOKENS_2=ghi-token\n`
    );
  });

  it("Shoud parse the JSON file and output it in an env format", async () => {
    const env = await jsonFileToEnv(path.join("tests", "jsonFiles", "5.json"));

    expect(env).toEqual(
      `PROJECT_ID=this-is-a-project-id\nITEM_0=item 0\nITEM_1=item 1\nITEM_2=item 2\nAPP_ID=fake-app-id
TOKENS_0=abc-token\nTOKENS_1=def-token\nTOKENS_2=ghi-token
USERS_0_NAME=Uno\nUSERS_0_EMAIL=uno@gmail.com\nUSERS_1_NAME=Dos\nUSERS_1_EMAIL=dos@gmail.com\n`
    );
  });
});
