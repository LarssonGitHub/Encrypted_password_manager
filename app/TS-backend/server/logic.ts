import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";
import {
  userCredentialsArray,
  userCredentialObject,
  backendResponse,
} from "../../@types/@type-module";
import { insertDatabaseData, getDatabaseData } from "./db/fileSystem";

export const isObject = (value: unknown): boolean => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

export const generateId = () => uuidv4();

export const removeItem = (
  id: string,
  data: userCredentialsArray
): userCredentialsArray => {
  if (!id) throw new Error("<customThrownError::>No id was submitted");
  const idExistsInArray = data.filter((object) => object.id === id);
  if (idExistsInArray.length === 0)
    throw new Error("<customThrownError::>No such id exists");
  if (!Array.isArray(data))
    throw new Error("<customThrownError::>Couldn't compile or delete record");
  return data.filter((obj) => obj.id !== id);
};

export const createAndAppendId = (dataEntries: userCredentialObject) => {
  const generatedId: string = uuidv4();
  if (!generatedId || typeof generatedId !== "string")
    throw new Error("<customThrownError::>Id couldn't be created");
  return {
    ...dataEntries,
    id: generatedId,
  };
};

export const updateItem = (
  newData: userCredentialObject,
  data: userCredentialsArray
): userCredentialsArray => {
  if (!isObject(newData) || !Array.isArray(data))
    throw new Error("<customThrownError::>Couldn't compile or update record");
  const idExists: userCredentialsArray = data.filter(
    (obj) => obj.id === newData.id
  );
  if (idExists.length <= 0)
    throw new Error(
      "<customThrownError::>No id could be matched to submitted record"
    );
  return data.map((data) =>
    data.id === newData.id
      ? {
          ...data,
          ...newData,
        }
      : data
  );
};

export const InsertItem = (
  newData: userCredentialObject,
  data: userCredentialsArray
): userCredentialsArray => {
  if (!isObject(newData) || !Array.isArray(data))
    throw new Error(
      "<customThrownError::>Couldn't compile or insert new data into record"
    );
  return [...data, newData];
};

export const encryptData = (data: string, key: string): string => {
  // More info on encrypt safety: https://crypto.stackexchange.com/questions/52633/is-there-a-practical-way-to-crack-an-aes-encryption-password
  const encrypt: CryptoJS.lib.CipherParams = CryptoJS.AES.encrypt(data, key, {
    iv: CryptoJS.enc.Hex.parse(uuidv4()),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  if (!encrypt) return "Couldn't decrypt the data";
  return encrypt.toString();
};

export const decryptData = (encryptedData: string, key: string): string => {
  let decrypt = CryptoJS.AES.decrypt(encryptedData, key);
  try {
    return decrypt.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    throw new Error("<customThrownError::>Your key is incorrect");
  }
};

export const sanitizeEncryptedData = (
  encryptedData: string,
  key: string
): userCredentialsArray => {
  if (!key) throw new Error("<customThrownError::>No key was submitted");
  const decryptedData: string = decryptData(encryptedData, key);
  if (!decryptedData || typeof decryptedData !== "string")
    throw new Error("<customThrownError::>Your key is incorrect");
  return JSON.parse(decryptedData);
};

export const encryptAndInsertDatabaseData = async (
  data: userCredentialsArray,
  key: string
): Promise<boolean> => {
  if (!key) throw new Error("<customThrownError::>No key was submitted");
  const stringifiedData: string = JSON.stringify(data);
  if (typeof stringifiedData !== "string")
    throw new Error("<customThrownError::>Couldn't compile the record");
  const encryptedData: string = encryptData(stringifiedData, key);
  if (!encryptedData)
    throw new Error("<customThrownError::>Couldn't encrypt the record");
  const updatedDatabase: boolean = await insertDatabaseData(encryptedData);
  if (!updatedDatabase)
    throw new Error(
      "<customThrownError::>Couldn't compile and insert record into the database"
    );
  return updatedDatabase;
};

export const getDataFromDatabaseAndSanitize = async (
  key: string
): Promise<null | userCredentialsArray> => {
  const encryptedData: string = await getDatabaseData();
  if (!encryptedData) return null;
  return sanitizeEncryptedData(encryptedData, key);
};

export const createResponse = (
  message: string,
  data: userCredentialsArray | null,
  databaseEmpty?: boolean
): backendResponse => {
  return {
    success: true,
    message: message,
    data: data === null && data !== undefined ? [] : data,
    ...(databaseEmpty !== null &&
      databaseEmpty !== undefined && {
        databaseEmpty,
      }),
  };
};
