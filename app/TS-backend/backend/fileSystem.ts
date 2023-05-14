import * as path from "path";
import fs from "fs";
import util from 'util';

export const getDatabaseData = async (): Promise<string> => {
   const readfile = util.promisify(fs.readFile);
   return readfile(path.resolve(__dirname, "./db/data.txt"),"utf8");
}

export const insertDatabaseData = async (encryptedData: string): Promise<void> => {
  if (encryptedData.length === 0 || encryptedData === "") throw "No data submitted, canceling post request"
  const writeFile = util.promisify(fs.writeFile);
  return writeFile(path.resolve(__dirname, "./db/data.txt"), encryptedData);
}


