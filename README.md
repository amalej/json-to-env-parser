# JSON to ENV parser [![github](https://img.shields.io/badge/GitHub-repository-blue)](https://github.com/amalej/json-to-env-parser) [![npm](https://img.shields.io/npm/v/json-to-env-parser)](https://www.npmjs.com/package/json-to-env-parser) [![npm](https://img.shields.io/npm/dt/json-to-env-parser)](https://www.npmjs.com/package/json-to-env-parser?activeTab=versions)

A library to convert JSON objects/files into ENV object/files

## Sample

### Simple JSON

JSON

```json
{
  "project_id": "this-is-a-project-id"
}
```

ENV

```dosini
PROJECT_ID=this-is-a-project-id
```

### JSON with arrays

JSON

```json
{
  "project_id": "this-is-a-project-id",
  "item": ["item 0", "item 1", "item 2"]
}
```

ENV

```dosini
PROJECT_ID=this-is-a-project-id
ITEM_0=item 0
ITEM_1=item 1
ITEM_2=item 2
```

### JSON with nested values

JSON

```json
{
  "project_id": "this-is-a-project-id",
  "item": ["item 0", "item 1", "item 2"],
  "app_id": "fake-app-id",
  "tokens": ["abc-token", "def-token", "ghi-token"],
  "users": [
    {
      "name": "Uno",
      "email": "uno@gmail.com"
    },
    {
      "name": "Dos",
      "email": "dos@gmail.com"
    }
  ],
  "services": {
    "database": {
      "location": "PH",
      "type": "SQL"
    },
    "android_app": {
      "name": "android app service",
      "language": "Kotlin"
    }
  }
}
```

ENV

```dosini
PROJECT_ID=this-is-a-project-id
ITEM_0=item 0
ITEM_1=item 1
ITEM_2=item 2
APP_ID=fake-app-id
TOKENS_0=abc-token
TOKENS_1=def-token
TOKENS_2=ghi-token
USERS_0_NAME=Uno
USERS_0_EMAIL=uno@gmail.com
USERS_1_NAME=Dos
USERS_1_EMAIL=dos@gmail.com
SERVICES_DATABASE_LOCATION=PH
SERVICES_DATABASE_TYPE=SQL
SERVICES_ANDROID_APP_NAME=android app service
SERVICES_ANDROID_APP_LANGUAGE=Kotlin
```
