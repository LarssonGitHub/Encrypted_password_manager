import {
  v4 as uuidv4
} from "uuid";
import CryptoJS from "crypto-js";
import {
  arrayOfWebsites,
  websiteObject,
  customResponse
} from "../../../@types/@type-module"
import { insertDatabaseData } from "../fileSystem";

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

export const updateItemWebsiteArray = (websitesArray: arrayOfWebsites, newData: websiteObject): arrayOfWebsites => {
  if (newData.id === "") throw "No id was found, canceling event";
  return websitesArray.map((websitesArray) => (websitesArray.id === newData.id ? {
      ...websitesArray,
      ...newData
  } : websitesArray))
};

export const InsertIntoWebsitesArray = ( newData: websiteObject, websitesArray: arrayOfWebsites): arrayOfWebsites => {
  if (newData.id === "") throw "No id was set, canceling event";
  return [...websitesArray,
      newData
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
      throw createResponse(false, "No data found for writing to db, canceling request", null);
  const updatedDatabase: boolean = await insertDatabaseData(encryptedData)
  if (!updatedDatabase) 
      throw createResponse(false, "Couldn't write to Database", null);
  return true
}

export const createResponse = (success: boolean, message: string, data ? : string | arrayOfWebsites | websiteObject | null | undefined): customResponse => {
  return {
      success: success,
      message: message,
      ...((data !== null && data !== undefined) && {
          data
      })
  }
}