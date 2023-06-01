import {
  v4 as uuidv4
} from "uuid";
import CryptoJS from "crypto-js";
import {
  userCredentialsArray,
  userCredentialObject,
  backendResponse
} from "../../@types/@type-module"
import {
  insertDatabaseData,
  getDatabaseData
} from "./db/fileSystem";

console.log("You shouldn't see this in frontend");

// TODO find if javascript offers another way to see true objects
export const isObject = (value: unknown): boolean => {
  return (
      typeof value === 'object' &&
      value !== null &&
      !Array.isArray(value)
  );
}

export const generateId = () => uuidv4();

export const removeItem = (id: string, data: userCredentialsArray): userCredentialsArray => {
  if (!id)
      throw new Error("No id was submitted");
  if (!Array.isArray(data))
      throw new Error("Couldn't compile and delete data");
  return data.filter(obj => obj.id !== id);
};

export const createAndAppendId = (dataEntries: userCredentialObject) => {
  const generatedId: string = uuidv4();
  if (!generatedId || typeof generatedId !== "string") throw new Error("No id could be created");
  return {
      ...dataEntries,
      id: generatedId,
  };
}

export const updateItem = (newData: userCredentialObject, data: userCredentialsArray): userCredentialsArray => {
  if (!isObject(newData) || !Array.isArray(data)) throw new Error("Couldn't compile or create data")
  const idExists: userCredentialsArray = data.filter(obj => obj.id === newData.id);
  if (idExists.length <= 0) throw new Error("No id could be matched");
  return data.map((data) => (data.id === newData.id ? {
      ...data,
      ...newData
  } : data))
};

export const InsertItem = (newData: userCredentialObject, data: userCredentialsArray): userCredentialsArray => {
  if (!isObject(newData) || !Array.isArray(data)) throw new Error("Couldn't compile or create data")
  return [...data,
  newData
];
};

export const encryptData = (data: string, key: string): string => {
  // More info on encrypt safety: https://crypto.stackexchange.com/questions/52633/is-there-a-practical-way-to-crack-an-aes-encryption-password
  const encrypt: CryptoJS.lib.CipherParams = CryptoJS.AES.encrypt(
      data,
      key, {
          iv: CryptoJS.enc.Hex.parse(uuidv4()),
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
      }
  );
  if (!encrypt) return "Couldn't decrypt data";
  return encrypt.toString();
};

export const decryptData = (encryptedData: string, key: string): string => {
  let decrypt = CryptoJS.AES.decrypt(encryptedData, key);
  try {
      return decrypt.toString(CryptoJS.enc.Utf8);
  } catch (error) {
      throw new Error("Your key is incorrect");
  }
};

export const sanitizeEncryptedData = (encryptedData: string, key: string): userCredentialsArray => {
  if (!key)
      throw new Error("No key was submitted")
  const decryptedData: string = decryptData(encryptedData, key)
  if (!decryptedData || typeof decryptedData !== "string") throw new Error("Your key is incorrect");
  return JSON.parse(decryptedData);
};

export const encryptAndInsertDatabaseData = async (data: userCredentialsArray, key: string): Promise < boolean > => {
  if (!key)
      throw new Error("No key was submitted")
  const stringifiedData: string = JSON.stringify(data)
  if (typeof stringifiedData !== "string") throw new Error("Couldn't compile data into database")
  const encryptedData: string = encryptData(stringifiedData, key)
  if ((!encryptedData))
      throw new Error("No data for database submitted");
  const updatedDatabase: boolean = await insertDatabaseData(encryptedData)
  if (!updatedDatabase)
      throw new Error("Couldn't write encrypted data to database");
  return updatedDatabase
}

export const getDataFromDatabaseAndSanitize = async (key: string): Promise < null | userCredentialsArray > => {
  const encryptedData: string = await getDatabaseData();
  if (!encryptedData) return null
  return sanitizeEncryptedData(encryptedData, key);
}

export const createResponse = (message: string, data: userCredentialsArray | null, databaseEmpty ? : boolean): backendResponse => {
  return {
      success: true,
      message: message,
      data: data === null && data !== undefined ? [] : data,
      ...((databaseEmpty !== null && databaseEmpty !== undefined) && {
          databaseEmpty
      })
  }
}