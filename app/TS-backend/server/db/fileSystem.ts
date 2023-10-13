import * as path from "path";
import fs from "fs";
import util from "util";
import { app } from "electron";
const appPath = app.getPath("userData");

const checkDatabaseFileStatus = async () => {
  try {
    await fs.promises.access(path.resolve(`${appPath}/${"./data.txt"}`));
    return true;
  } catch (error) {
    return false;
  }
};

const createDatabaseFile = async () => {
  await fs.promises.appendFile(path.resolve(`${appPath}/${"./data.txt"}`), "");
};
export const getDatabaseData = async (): Promise<string> => {
  const fileExists: boolean = await checkDatabaseFileStatus();
  if (!fileExists) await createDatabaseFile();
  const getBufferedFile = await fs.promises.readFile(
    `${appPath}/${"./data.txt"}`
  );
  const string: string = getBufferedFile.toString();
  return string;
};

export const insertDatabaseData = async (
  encryptedData: string
): Promise<boolean> => {
  const writeFile = util.promisify(fs.writeFile);
  await writeFile(path.resolve(appPath, "./data.txt"), encryptedData);
  return true;
};

export const cleanDatabase = async (): Promise<boolean> => {
  const writeFile = util.promisify(fs.writeFile);
  await writeFile(path.resolve(appPath, "./data.txt"), "");
  return true;
};