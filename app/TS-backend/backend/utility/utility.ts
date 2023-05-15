import {
  v4 as uuidv4
} from "uuid";
import CryptoJS from "crypto-js";
import {
  arrayOfWebsites,
  websiteObject,
  customResponse
} from "../../../@types/@type-module"
import { insertDatabaseData, getDatabaseData } from "../fileSystem";

console.log("You shouldn't see this in frontend");

export const generateId = () => uuidv4();

export const removeItemWebsiteArray = (id: string, websitesArray: arrayOfWebsites): arrayOfWebsites => {
  return websitesArray.filter(website => website.id !== id);
};

export const createAndAppendId = (dataEntries: websiteObject) => {
  const generatedId: string = uuidv4();
  if (generatedId === "") throw "No id could be generated, canceling event";
  return {
      ...dataEntries,
      id: generatedId,
  };
}

export const updateItemWebsiteArray = (data: websiteObject, websitesArray: arrayOfWebsites): arrayOfWebsites => {
  return websitesArray.map((websitesArray) => (websitesArray.id === data.id ? {
      ...websitesArray,
      ...data
  } : websitesArray))
};

export const InsertIntoWebsitesArray = ( data: websiteObject, websitesArray: arrayOfWebsites): arrayOfWebsites => {
  return [...websitesArray,
      data
  ];
};

export const encryptData = (data: string, key: string): string => {
  const encrypt: CryptoJS.lib.CipherParams = CryptoJS.AES.encrypt(
      data,
      key, {
          iv: CryptoJS.enc.Hex.parse("be410fea41df7162a679875ec131cf2c"),
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
      }
  );
  // TODO, throw Error when implementing error handling
  if (encrypt === undefined) return "ERROR";
  return encrypt.toString();
};

export const decryptData = (
  encryptedData: string,
  key: string
): string => {
  let decrypt = CryptoJS.AES.decrypt(encryptedData, key);
  return decrypt.toString(CryptoJS.enc.Utf8);
};

export const sanitizeEncryptedData = (encryptedData: string, key: string): arrayOfWebsites => {
  const decryptedData: string = decryptData(encryptedData, key)
  if (decryptedData.length === 0 || decryptedData === "") throw createResponse(false, "Wrong passkey", null); 
  return JSON.parse(decryptedData);
};

export const encryptAndInsertDatabaseData = async(data: arrayOfWebsites, key: string): Promise<boolean> => {
  const encryptedData: string = encryptData(JSON.stringify(data), key)
  if ((!encryptedData || encryptedData.length === 0 )) 
      throw createResponse(false, "No data for database submitted, canceling request", null);
  const updatedDatabase: boolean = await insertDatabaseData(encryptedData)
  if (!updatedDatabase) 
      throw createResponse(false, "Couldn't write to Database", null);
  return true
}

export const getDataFromDatabaseAndSanitize = async (key :string): Promise<null | arrayOfWebsites> =>  {
    if (!key || key.length === 0)
      throw createResponse(false, "No key was submitted")
  const encryptedData: string = await getDatabaseData();
    if (!encryptedData || encryptedData.length === 0) 
      return null
  const decryptedData: arrayOfWebsites = sanitizeEncryptedData(encryptedData, key);
    if (!Array.isArray(decryptedData))
      throw createResponse(false, "The data from database wasn't an array or JSON, canceling put request", null);
  return decryptedData
}

export const createResponse = (success: boolean, message: string, data ? : string | arrayOfWebsites | websiteObject | null | undefined): customResponse => {
  if (!success) console.log("error ", message) 
  return {
      success: success,
      message: message,
      ...((data !== null && data !== undefined) && {
          data
      })
  }
}