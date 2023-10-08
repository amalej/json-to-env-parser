import { jsonToEnv } from "../src/index";

const simpleJsonEnvs = [
  {
    json: {
      project_id: "this-is-a-project-id",
    },
    env: `PROJECT_ID=this-is-a-project-id\n`,
  },
  {
    json: {
      api_key: "fake-api-key",
    },
    env: `API_KEY=fake-api-key\n`,
  },
  {
    json: {
      app_id: "fake-app-id",
    },
    env: `APP_ID=fake-app-id\n`,
  },
  {
    json: {
      project_id: "this-is-a-project-id",
      api_key: "fake-api-key",
      app_id: "fake-app-id",
    },
    env: `PROJECT_ID=this-is-a-project-id\nAPI_KEY=fake-api-key\nAPP_ID=fake-app-id\n`,
  },
];

const jsonWithArrEnvs = [
  {
    json: {
      project_id: "this-is-a-project-id",
      item: ["item 0", "item 1", "item 2"],
    },
    env: `PROJECT_ID=this-is-a-project-id\nITEM_0=item 0\nITEM_1=item 1\nITEM_2=item 2\n`,
  },
  {
    json: {
      project_id: "this-is-a-project-id",
      item: ["item 0", "item 1", "item 2"],
      app_id: "fake-app-id",
    },
    env: `PROJECT_ID=this-is-a-project-id\nITEM_0=item 0\nITEM_1=item 1\nITEM_2=item 2\nAPP_ID=fake-app-id\n`,
  },
  {
    json: {
      project_id: "this-is-a-project-id",
      item: ["item 0", "item 1", "item 2"],
      app_id: "fake-app-id",
      tokens: ["abc-token", "def-token", "ghi-token"],
    },
    env: `PROJECT_ID=this-is-a-project-id\nITEM_0=item 0\nITEM_1=item 1\nITEM_2=item 2\nAPP_ID=fake-app-id
TOKENS_0=abc-token\nTOKENS_1=def-token\nTOKENS_2=ghi-token\n`,
  },
];

const jsonWithNestedValEnvs = [
  {
    json: {
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
    },
    env: `PROJECT_ID=this-is-a-project-id\nITEM_0=item 0\nITEM_1=item 1\nITEM_2=item 2\nAPP_ID=fake-app-id
TOKENS_0=abc-token\nTOKENS_1=def-token\nTOKENS_2=ghi-token
USERS_0_NAME=Uno\nUSERS_0_EMAIL=uno@gmail.com\nUSERS_1_NAME=Dos\nUSERS_1_EMAIL=dos@gmail.com\n`,
  },
];

describe("Convert simple JSON to ENV format", () => {
  for (let jsonEnv of simpleJsonEnvs) {
    it("Should correctly convert simple json", () => {
      const env = jsonToEnv(jsonEnv.json);
      expect(env).toEqual(jsonEnv.env);
    });
  }
});

describe("Convert JSON with arrays to ENV format", () => {
  for (let jsonEnv of jsonWithArrEnvs) {
    it("Should correctly convert normal json with arrays", () => {
      const env = jsonToEnv(jsonEnv.json);
      expect(env).toEqual(jsonEnv.env);
    });
  }
});

describe("Convert JSON with nested values to ENV format", () => {
  for (let jsonEnv of jsonWithNestedValEnvs) {
    it("Should correctly convert normal json with nested values", () => {
      const env = jsonToEnv(jsonEnv.json);
      expect(env).toEqual(jsonEnv.env);
    });
  }
});
