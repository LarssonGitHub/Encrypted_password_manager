import {
  v4 as uuidv4
} from "uuid";
import CryptoJS from "crypto-js";
import {
  userCredentialsArray,
  userCredentialObject,
  customResponse
} from "../../@types/@type-module"
import {
  insertDatabaseData,
  getDatabaseData
} from "./db/fileSystem";

console.log("You shouldn't see this in frontend");

export const generateId = () => uuidv4();

export const removeItemWebsiteArray = (id: string, websitesArray: userCredentialsArray): userCredentialsArray => {
  const credentialsArray: userCredentialsArray = websitesArray.filter(website => website.id !== id);
  if (!Array.isArray(credentialsArray))
      throw new Error("An error occurred during compiling of data, canceling request");
  return credentialsArray;
};

export const createAndAppendId = (dataEntries: userCredentialObject) => {
  const generatedId: string = uuidv4();
  if (generatedId === "") throw new Error("No id could be created, canceling request");
  return {
      ...dataEntries,
      id: generatedId,
  };
}

export const updateItemWebsiteArray = (object: userCredentialObject, websitesArray: userCredentialsArray): userCredentialsArray => {
  const exists: userCredentialsArray | [] = websitesArray.filter(website => website.id === object.id);
  if (exists.length === 0) throw new Error("No id could be matched, canceling request");
  return websitesArray.map((websitesArray) => (websitesArray.id === object.id ? {
      ...websitesArray,
      ...object
  } : websitesArray))
};

export const InsertIntoWebsitesArray = (data: userCredentialObject, websitesArray: userCredentialsArray): userCredentialsArray => {
  return [...websitesArray,
    data
];
};

// https://crypto.stackexchange.com/questions/52633/is-there-a-practical-way-to-crack-an-aes-encryption-password

export const encryptData = (data: string, key: string): string => {
  const encrypt: CryptoJS.lib.CipherParams = CryptoJS.AES.encrypt(
      data,
      key, {
          iv: CryptoJS.enc.Hex.parse(uuidv4()),
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
      }
  );
  if (!encrypt) return "Couldn't decrypt data, canceling request";
  return encrypt.toString();
};

export const decryptData = (
  encryptedData: string,
  key: string
): string => {
  let decrypt = CryptoJS.AES.decrypt(encryptedData, key);
  try {
      // TODO: Find a better solution
      // This code will produce an Utf8 if the key doesn't match
      return decrypt.toString(CryptoJS.enc.Utf8);
  } catch (error) {
      console.log(error)
      throw new Error("Your key is incorrect");
  }
};

export const sanitizeEncryptedData = (encryptedData: string, key: string): userCredentialsArray => {
  const decryptedData: string = decryptData(encryptedData, key)
  if (decryptedData.length === 0 || decryptedData === "") throw new Error("Your key is incorrect");
  return JSON.parse(decryptedData);
};

export const encryptAndInsertDatabaseData = async (data: userCredentialsArray, key: string): Promise < boolean > => {
  const encryptedData: string = encryptData(JSON.stringify(data), key)
  if ((!encryptedData || encryptedData.length === 0))
      throw new Error("No data for database submitted, canceling request");
  const updatedDatabase: boolean = await insertDatabaseData(encryptedData)
  if (!updatedDatabase)
      throw new Error("Couldn't write to Database");
  return true
}

export const getDataFromDatabaseAndSanitize = async (key: string): Promise < null | userCredentialsArray > => {
  if (!key || key.length === 0)
      throw new Error("No key was submitted")
  const encryptedData: string = await getDatabaseData();
  if (!encryptedData || encryptedData.length === 0)
      return null
  const decryptedData: userCredentialsArray = sanitizeEncryptedData(encryptedData, key);
  if (!Array.isArray(decryptedData))
      throw new Error("The data from database wasn't an array or JSON, canceling put request");
  return decryptedData
}

export const createResponse = (message: string, data: userCredentialsArray | boolean | null): customResponse => {
  return {
      message: message,
      ...((data !== null && data !== undefined) && {
          data
      })
  }
}