import { jsonToEnv } from "../src/index";

const simpleJsonEnvs = [
  {
    json: {
      project_id: "this-is-a-project-id",
    },
    env: `PROJECT_ID=this-is-a-project-id\n`,
    envLower: `project_id=this-is-a-project-id\n`,
  },
  {
    json: {
      project_id: "this-is-a-project-id",
      project_number: 1234567890,
    },
    env: `PROJECT_ID=this-is-a-project-id\nPROJECT_NUMBER=1234567890\n`,
    envLower: `project_id=this-is-a-project-id\nproject_number=1234567890\n`,
  },
  {
    json: {
      appId: "fake-app-id",
      projectId: "this-is-a-project-id",
    },
    env: `APP_ID=fake-app-id\nPROJECT_ID=this-is-a-project-id\n`,
    envLower: `app_id=fake-app-id\nproject_id=this-is-a-project-id\n`,
    envJoinCamelCase: `APPID=fake-app-id\nPROJECTID=this-is-a-project-id\n`,
  },
  {
    json: {
      api_key: "fake-api-key",
    },
    env: `API_KEY=fake-api-key\n`,
    envLower: `api_key=fake-api-key\n`,
  },
  {
    json: {
      app_id: "fake-app-id",
    },
    env: `APP_ID=fake-app-id\n`,
    envLower: `app_id=fake-app-id\n`,
  },
  {
    json: {
      project_id: "this-is-a-project-id",
      api_key: "fake-api-key",
      app_id: "fake-app-id",
    },
    env: `PROJECT_ID=this-is-a-project-id\nAPI_KEY=fake-api-key\nAPP_ID=fake-app-id\n`,
    envLower: `project_id=this-is-a-project-id\napi_key=fake-api-key\napp_id=fake-app-id\n`,
  },
];

const jsonWithArrEnvs = [
  {
    json: {
      project_id: "this-is-a-project-id",
      item: ["item 0", "item 1", "item 2"],
    },
    env: `PROJECT_ID=this-is-a-project-id\nITEM_0=item 0\nITEM_1=item 1\nITEM_2=item 2\n`,
    envLower: `project_id=this-is-a-project-id\nitem_0=item 0\nitem_1=item 1\nitem_2=item 2\n`,
  },
  {
    json: {
      projectId: "this-is-a-project-id",
      storedItem: ["item 0", "item 1", "item 2"],
    },
    env: `PROJECT_ID=this-is-a-project-id\nSTORED_ITEM_0=item 0\nSTORED_ITEM_1=item 1\nSTORED_ITEM_2=item 2\n`,
    envLower: `project_id=this-is-a-project-id\nstored_item_0=item 0\nstored_item_1=item 1\nstored_item_2=item 2\n`,
    envJoinCamelCase: `PROJECTID=this-is-a-project-id\nSTOREDITEM_0=item 0\nSTOREDITEM_1=item 1\nSTOREDITEM_2=item 2\n`,
  },
  {
    json: {
      project_id: "this-is-a-project-id",
      item: ["item 0", "item 1", "item 2"],
      app_id: "fake-app-id",
    },
    env: `PROJECT_ID=this-is-a-project-id\nITEM_0=item 0\nITEM_1=item 1\nITEM_2=item 2\nAPP_ID=fake-app-id\n`,
    envLower: `project_id=this-is-a-project-id\nitem_0=item 0\nitem_1=item 1\nitem_2=item 2\napp_id=fake-app-id\n`,
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
    envLower: `project_id=this-is-a-project-id\nitem_0=item 0\nitem_1=item 1\nitem_2=item 2\napp_id=fake-app-id
tokens_0=abc-token\ntokens_1=def-token\ntokens_2=ghi-token\n`,
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
      services: {
        database: {
          location: "PH",
          type: "SQL",
        },
        android_app: {
          name: "android app service",
          language: "Kotlin",
        },
      },
    },
    env: `PROJECT_ID=this-is-a-project-id\nITEM_0=item 0\nITEM_1=item 1\nITEM_2=item 2\nAPP_ID=fake-app-id
TOKENS_0=abc-token\nTOKENS_1=def-token\nTOKENS_2=ghi-token
USERS_0_NAME=Uno\nUSERS_0_EMAIL=uno@gmail.com\nUSERS_1_NAME=Dos\nUSERS_1_EMAIL=dos@gmail.com
SERVICES_DATABASE_LOCATION=PH\nSERVICES_DATABASE_TYPE=SQL
SERVICES_ANDROID_APP_NAME=android app service\nSERVICES_ANDROID_APP_LANGUAGE=Kotlin\n`,
  },
  {
    json: {
      quiz: {
        sport: {
          q1: {
            question: "Which one is correct team name in NBA?",
            options: [
              "New York Bulls",
              "Los Angeles Kings",
              "Golden State Warriros",
              "Huston Rocket",
            ],
            answer: "Huston Rocket",
          },
        },
        maths: {
          q1: {
            question: "5 + 7 = ?",
            options: ["10", "11", "12", "13"],
            answer: "12",
          },
          q2: {
            question: "12 - 8 = ?",
            options: ["1", "2", "3", "4"],
            answer: "4",
          },
        },
      },
    },
    env: `QUIZ_SPORT_Q1_QUESTION=Which one is correct team name in NBA?\nQUIZ_SPORT_Q1_OPTIONS_0=New York Bulls
QUIZ_SPORT_Q1_OPTIONS_1=Los Angeles Kings\nQUIZ_SPORT_Q1_OPTIONS_2=Golden State Warriros\nQUIZ_SPORT_Q1_OPTIONS_3=Huston Rocket
QUIZ_SPORT_Q1_ANSWER=Huston Rocket\nQUIZ_MATHS_Q1_QUESTION=5 + 7 = ?\nQUIZ_MATHS_Q1_OPTIONS_0=10\nQUIZ_MATHS_Q1_OPTIONS_1=11
QUIZ_MATHS_Q1_OPTIONS_2=12\nQUIZ_MATHS_Q1_OPTIONS_3=13\nQUIZ_MATHS_Q1_ANSWER=12\nQUIZ_MATHS_Q2_QUESTION=12 - 8 = ?\nQUIZ_MATHS_Q2_OPTIONS_0=1
QUIZ_MATHS_Q2_OPTIONS_1=2\nQUIZ_MATHS_Q2_OPTIONS_2=3\nQUIZ_MATHS_Q2_OPTIONS_3=4\nQUIZ_MATHS_Q2_ANSWER=4\n`,
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

describe("Convert simple JSON to lowercase ENV format", () => {
  for (let jsonEnv of simpleJsonEnvs) {
    it("Should correctly convert simple json", () => {
      const env = jsonToEnv(jsonEnv.json, { capitalize: false });
      expect(env).toEqual(jsonEnv.envLower);
    });
  }
});

describe("Convert simple JSON to joined camel case ENV format", () => {
  for (let jsonEnv of simpleJsonEnvs) {
    if (jsonEnv.envJoinCamelCase !== undefined) {
      it("Should correctly convert simple json", () => {
        const env = jsonToEnv(jsonEnv.json, { splitCamelCase: false });
        expect(env).toEqual(jsonEnv.envJoinCamelCase);
      });
    }
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

describe("Convert JSON with arrays to lowercase ENV format", () => {
  for (let jsonEnv of jsonWithArrEnvs) {
    it("Should correctly convert normal json with arrays", () => {
      const env = jsonToEnv(jsonEnv.json, { capitalize: false });
      expect(env).toEqual(jsonEnv.envLower);
    });
  }
});

describe("Convert JSON with arrays to joined camel case ENV format", () => {
  for (let jsonEnv of jsonWithArrEnvs) {
    if (jsonEnv.envJoinCamelCase !== undefined) {
      it("Should correctly convert normal json with arrays", () => {
        const env = jsonToEnv(jsonEnv.json, { splitCamelCase: false });
        expect(env).toEqual(jsonEnv.envJoinCamelCase);
      });
    }
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
