import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";
import { arrayOfWebsites, websiteObject } from "../../../@types/@type-module"

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

export const getData = (): arrayOfWebsites => {
  // Placeholder for db
  return [
    {
      id: "ID number 1",
      websiteInput: "name 1",
      emailInput: "email",
      usernameInput: "username",
      passwordInput: "passwordInput",
      additionalDataInput: "data input ",
    },
    {
      id: "ID number 2",
      websiteInput: "name 2",
      emailInput: "email",
      usernameInput: "username",
      passwordInput: "passwordInput",
      additionalDataInput: "data input ",
    },
    {
      id: "ID number 3",
      websiteInput: "name 3",
      emailInput: "email",
      usernameInput: "username",
      passwordInput: "passwordInput",
      additionalDataInput: "data input ",
    },
    {
      id: "ID number 4",
      websiteInput: "name 4",
      emailInput: "email",
      usernameInput: "username",
      passwordInput: "passwordInput",
      additionalDataInput: "data input ",
    },
  ];
}

export const postData = (newData: websiteObject): arrayOfWebsites => {
  // Placeholder for db
  const websites = [
    {
      id: "ID number 1",
      websiteInput: "name 1",
      emailInput: "email",
      usernameInput: "username",
      passwordInput: "passwordInput",
      additionalDataInput: "data input ",
    },
    {
      id: "ID number 2",
      websiteInput: "name 2",
      emailInput: "email",
      usernameInput: "username",
      passwordInput: "passwordInput",
      additionalDataInput: "data input ",
    },
    {
      id: "ID number 3",
      websiteInput: "name 3",
      emailInput: "email",
      usernameInput: "username",
      passwordInput: "passwordInput",
      additionalDataInput: "data input ",
    },
    {
      id: "ID number 4",
      websiteInput: "name 4",
      emailInput: "email",
      usernameInput: "username",
      passwordInput: "passwordInput",
      additionalDataInput: "data input ",
    },
  ];
  const NewDataId: websiteObject = createAndAppendId(newData)
  return  InsertIntoWebsitesArray(websites, NewDataId)
}

export const deleteData = (id: string): arrayOfWebsites => {
  // Placeholder for db
  const websites = [
    {
      id: "ID number 1",
      websiteInput: "name 1",
      emailInput: "email",
      usernameInput: "username",
      passwordInput: "passwordInput",
      additionalDataInput: "data input ",
    },
    {
      id: "ID number 2",
      websiteInput: "name 2",
      emailInput: "email",
      usernameInput: "username",
      passwordInput: "passwordInput",
      additionalDataInput: "data input ",
    },
    {
      id: "ID number 3",
      websiteInput: "name 3",
      emailInput: "email",
      usernameInput: "username",
      passwordInput: "passwordInput",
      additionalDataInput: "data input ",
    },
    {
      id: "ID number 4",
      websiteInput: "name 4",
      emailInput: "email",
      usernameInput: "username",
      passwordInput: "passwordInput",
      additionalDataInput: "data input ",
    },
  ];
  return removeItemWebsiteArray(id, websites)
}

export const updateData = (id: string, newData: websiteObject): arrayOfWebsites => {
  // Placeholder for db
  const websites = [
    {
      id: "ID number 1",
      websiteInput: "name 1",
      emailInput: "email",
      usernameInput: "username",
      passwordInput: "passwordInput",
      additionalDataInput: "data input ",
    },
    {
      id: "ID number 2",
      websiteInput: "name 2",
      emailInput: "email",
      usernameInput: "username",
      passwordInput: "passwordInput",
      additionalDataInput: "data input ",
    },
    {
      id: "ID number 3",
      websiteInput: "name 3",
      emailInput: "email",
      usernameInput: "username",
      passwordInput: "passwordInput",
      additionalDataInput: "data input ",
    },
    {
      id: "ID number 4",
      websiteInput: "name 4",
      emailInput: "email",
      usernameInput: "username",
      passwordInput: "passwordInput",
      additionalDataInput: "data input ",
    },
  ];
  return updateItemWebsiteArray(id, websites, newData)
}

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
): [] | string => {
  let decrypt = CryptoJS.AES.decrypt(encryptedData, secretKey);
  const sanitize = decrypt.toString(CryptoJS.enc.Utf8);
    // TODO, throw Error, wrong key when implementing error handling
  if (sanitize === "" || sanitize === undefined) return "Wrong passkey";
  return JSON.parse(sanitize);
};