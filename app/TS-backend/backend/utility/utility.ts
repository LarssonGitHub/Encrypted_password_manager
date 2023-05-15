import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";
import { arrayOfWebsites, websiteObject, customResponse } from "../../../@types/@type-module"

console.log("You shouldn't see this in frontend");

export const generateId = () => uuidv4();

export const removeItemWebsiteArray = (id: string, websitesArray: arrayOfWebsites): arrayOfWebsites => {
  if (id === "" || id === undefined) throw "No id was found, canceling event";
  return websitesArray.filter(website => website.id !== id);
};

export const createAndAppendId = (dataEntries: websiteObject) => {
  const generatedId: string = uuidv4();
  return {
    ...dataEntries,
    id: generatedId,
  };
}

export const updateItemWebsiteArray = (id: string, websitesArray: arrayOfWebsites, newData: websiteObject): arrayOfWebsites => {
  if (newData.id === "") throw "No id was found, canceling event";
  return websitesArray.map((websitesArray) => (websitesArray.id === newData.id ? { ...websitesArray, ...newData } : websitesArray))
};

export const InsertIntoWebsitesArray = ( websitesArray: arrayOfWebsites, newData: websiteObject): arrayOfWebsites => {
  if (newData.id === "") throw "No id was set, canceling event";
  return [...websitesArray, 
    newData
  ];
};

export const encryptData = (data: string, secretKey: string): string => {
  const encrypt: CryptoJS.lib.CipherParams = CryptoJS.AES.encrypt(
   data,
    secretKey,
    {
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
  secretKey: string
): arrayOfWebsites => {
  let decrypt = CryptoJS.AES.decrypt(encryptedData, secretKey);
  const decryptedData = decrypt.toString(CryptoJS.enc.Utf8);
    // TODO, throw Error, wrong key when implementing error handling
  if (decryptedData.length === 0 || decryptedData === undefined) throw "Wrong passkey";
  return JSON.parse(decryptedData);
};

export const createResponse = (success: boolean, message: string, data?: string | arrayOfWebsites | websiteObject | null | undefined): customResponse => {
  return {
    success: success,
    message: message,
    ...((data !== null && data !== undefined) && {data})
  }
}