import {
  arrayOfWebsites,
  websiteObject,
  customResponse
} from "../../@types/@type-module"
import {
  createAndAppendId,
  InsertIntoWebsitesArray,
  removeItemWebsiteArray,
  updateItemWebsiteArray,
  decryptData,
  createResponse
} from "./utility/utility"
import {
  getDatabaseData
} from "./fileSystem"

export const getData = async (key: string): Promise < customResponse > => {
  const encryptedData: string = await getDatabaseData();
  if (encryptedData.length === 0) return createResponse(true, "Your database is empty", null)
  const decryptedData: string = decryptData(encryptedData, key)
  if (decryptedData.length === 0) throw createResponse(false, "Wrong passkey", null);
  return createResponse(true, "Retrieved data from database", decryptedData)
}