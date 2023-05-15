import * as path from "path";
import fs from "fs";
import util from 'util';

export const getDatabaseData = async (): Promise<string> => {
   const readfile = util.promisify(fs.readFile);
   return readfile(path.resolve(__dirname, "./db/data.txt"),"utf8");
}

export const insertDatabaseData = async (encryptedData: string): Promise<boolean> => {
  const writeFile = util.promisify(fs.writeFile);
  await writeFile(path.resolve(__dirname, "./db/data.txt"), encryptedData);
  // Custom value, as writeFile returns nothing
  return true
}