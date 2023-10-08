import { readFile, writeFile } from "fs/promises";

export const jsonToEnv = (
  json: Object,
  capitalize: boolean = true,
  parentKey: string = ""
) => {
  const _parentKey = parentKey === "" ? "" : `${parentKey}_`;
  const keys = Object.keys(json);
  let env = "";
  for (let key of keys) {
    if (Array.isArray(json[key])) {
      const arr: Array<any> = json[key];
      for (let index in arr) {
        if (typeof json[key][index] !== "object") {
          const finalKey = capitalize
            ? `${_parentKey}${key}_${index}`.toUpperCase()
            : `${_parentKey}${key}_${index}`;
          env += `${finalKey}=${json[key][index]}\n`;
        } else {
          env += jsonToEnv(
            json[key][index],
            capitalize,
            `${_parentKey}${key}_${index}`
          );
        }
      }
    } else if (typeof json[key] === "object") {
      env += jsonToEnv(json[key], capitalize, `${_parentKey}${key}`);
    } else {
      const finalKey = capitalize
        ? `${_parentKey}${key}`.toUpperCase()
        : `${_parentKey}${key}`;
      env += `${finalKey}=${json[key]}\n`;
    }
  }
  return env;
};

export const jsonToEnvFile = async (
  filePath: string,
  json: Object,
  capitalize: boolean = true,
  parentKey: string = ""
) => {
  const env = jsonToEnv(json, capitalize, parentKey);
  await writeFile(filePath, env);
};

export const jsonFileToEnv = async (
  filePath: string,
  capitalize: boolean = true,
  parentKey: string = ""
) => {
  const buf = await readFile(filePath);
  const json = JSON.parse(buf.toString());
  return jsonToEnv(json, capitalize, parentKey);
};

export const jsonFileToEnvFile = async (
  jsonFilePath: string,
  envFilePath: string,
  capitalize: boolean = true,
  parentKey: string = ""
) => {
  const buf = await readFile(jsonFilePath);
  const json = JSON.parse(buf.toString());
  await jsonToEnvFile(envFilePath, json, capitalize, parentKey);
};
