import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";

console.log("You shouldn't see this in frontend");

const generateId = () => uuidv4();

const isString = <T>(value: T): boolean =>
  typeof value === "string" ? true : false;

const encryptData = <T>(data: T, secretKey: string): string => {
  const encrypt: CryptoJS.lib.CipherParams = CryptoJS.AES.encrypt(
    JSON.stringify(data),
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

const decryptData = <T>(
  encryptedData: string,
  secretKey: string
): string | void => {
  let decrypt = CryptoJS.AES.decrypt(encryptedData, secretKey);
  const sanitize = decrypt.toString(CryptoJS.enc.Utf8);
    // TODO, throw Error, wrong key when implementing error handling
  if (sanitize === "" || sanitize === undefined) return "Wrong passkey";
  return JSON.parse(sanitize);
};

export { generateId, isString, encryptData, decryptData };
