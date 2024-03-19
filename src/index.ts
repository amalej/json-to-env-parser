import { mkdir, readFile, writeFile } from "fs/promises";
import { dirname } from "path";

interface ParserOptions {
  /**
   * Capitalizes all characters. Converts `app_id` -> `APP_ID`.
   * @default true Capitalize all letters by default.
   */
  capitalize?: boolean;
  /**
   * The parent key. If value is set to `REACT` and JSON is `{"id": "unique id"}`,
   * then the ouput .env would be `REACT_ID=unique id`.
   * @default "" Don't add a parent key by default.
   */
  parentKey?: string;
  /**
   * Convert camel case strings into snake case. Converts `appId` -> `app_id`.
   * @default true Automatically split camel cases by default.
   */
  splitCamelCase?: boolean;
}

const DEFAULT_PARSER_OPTIONS = {
  capitalize: true,
  parentKey: "",
  splitCamelCase: true,
};

/**
 * Convert a JSON object to an .env formatted string.
 * @param json The JSON object tot be converted.
 * @param options Options during parsing.
 * @returns env string.
 */
export const jsonToEnv = (
  json: Object,
  options: ParserOptions = DEFAULT_PARSER_OPTIONS
): string => {
  options.capitalize = options.capitalize ?? true;
  options.parentKey = options.parentKey ?? "";
  options.splitCamelCase = options.splitCamelCase ?? true;
  const _parentKey = options.parentKey === "" ? "" : `${options.parentKey}_`;
  const keys = Object.keys(json);
  let env = "";
  for (let key of keys) {
    const _key = options.splitCamelCase
      ? key.replace(/[A-Z]/g, (letter) => `_${letter.toLocaleLowerCase()}`)
      : key;
    if (Array.isArray(json[key])) {
      const arr: Array<any> = json[key];
      for (let index in arr) {
        if (typeof json[key][index] !== "object") {
          const finalKey = options.capitalize
            ? `${_parentKey}${_key}_${index}`.toUpperCase()
            : `${_parentKey}${_key}_${index}`;
          env += `${finalKey}=${json[key][index]}\n`;
        } else {
          env += jsonToEnv(json[key][index], {
            capitalize: options.capitalize,
            parentKey: `${_parentKey}${_key}_${index}`,
            splitCamelCase: options.splitCamelCase,
          });
        }
      }
    } else if (typeof json[key] === "object") {
      env += jsonToEnv(json[key], {
        capitalize: options.capitalize,
        parentKey: `${_parentKey}${_key}`,
        splitCamelCase: options.splitCamelCase,
      });
    } else {
      const finalKey = options.capitalize
        ? `${_parentKey}${_key}`.toUpperCase()
        : `${_parentKey}${_key}`;
      env += `${finalKey}=${json[key]}\n`;
    }
  }
  return env;
};

/**
 * Convert a JSON object to an .env formatted string then writes it to a file.
 * @param filePath
 * @param json The JSON object tot be converted.
 * @param options Options during parsing.
 */
export const jsonToEnvFile = async (
  filePath: string,
  json: Object,
  options: ParserOptions = DEFAULT_PARSER_OPTIONS
): Promise<void> => {
  const env = jsonToEnv(json, options);
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, env);
};

/**
 * Reads the contents of a JSON file then convert it to a .env formatted string.
 * @param filePath Path of the JSON file to read.
 * @param options Options during parsing.
 * @returns env string.
 */
export const jsonFileToEnv = async (
  filePath: string,
  options: ParserOptions = DEFAULT_PARSER_OPTIONS
): Promise<string> => {
  const buf = await readFile(filePath);
  const json = JSON.parse(buf.toString());
  return jsonToEnv(json, options);
};

/**
 * Reads the contents of a JSON file then convert it to a .env formatted string
 * then write the output to a file.
 * @param filePath Path of the JSON file to read.
 * @param envFilePath Path to create the .env file.
 * @param options Options during parsing.
 */
export const jsonFileToEnvFile = async (
  jsonFilePath: string,
  envFilePath: string,
  options: ParserOptions = DEFAULT_PARSER_OPTIONS
): Promise<void> => {
  const buf = await readFile(jsonFilePath);
  const json = JSON.parse(buf.toString());
  await jsonToEnvFile(envFilePath, json, options);
};
