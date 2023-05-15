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
  createResponse,
  sanitizeEncryptedData,
  encryptAndInsertDatabaseData
} from "./utility/utility"
import {
  getDatabaseData
} from "./fileSystem"

export const getData = async (key: string): Promise < customResponse > => {
    if (!key || key.length === 0)
        throw createResponse(false, "No key was submitted")
  const encryptedData: string = await getDatabaseData();
    if (encryptedData.length === 0) 
        return createResponse(true, "Your database is empty", null)
  const decryptedData: arrayOfWebsites = sanitizeEncryptedData(encryptedData, key)
  return createResponse(true, "Get request successful", decryptedData)
}

export const deleteData = async (objectId: string, key: string): Promise < customResponse > => {
    if (!objectId || objectId.length === 0)
        throw createResponse(false, "No id was given, canceling event", null);
    if (!key || key.length === 0)
        throw createResponse(false, "No key was submitted")
  const encryptedData: string = await getDatabaseData();
    if (encryptedData.length === 0)
        throw createResponse(false, "Your database is empty, canceling delete request", null);
  const decryptedData: arrayOfWebsites = sanitizeEncryptedData(encryptedData, key);
    if (!Array.isArray(decryptedData))
        throw createResponse(false, "The data from database wasn't an array, canceling delete request", null);
  const updatedData: arrayOfWebsites = removeItemWebsiteArray(objectId, decryptedData);
    if (!Array.isArray(updatedData))
        throw createResponse(false, "Couldn't update the data, canceling delete request", null);
  const updatedDatabase: boolean = await encryptAndInsertDatabaseData(updatedData, key)
    if (!updatedDatabase)
        throw createResponse(false, "Couldn't write to Database", null);
  return createResponse(true, "Delete request successful", updatedData);
}

export const postData = async (postData: websiteObject, key: string): Promise < customResponse > => {
    if (!postData || Object.values(postData).every(x => x === null || x === ''))
        throw createResponse(false, "No data was submitted")
  const updatePostDataId: websiteObject = createAndAppendId(postData);
    if (!key || key.length === 0)
        throw createResponse(false, "No key was submitted")
  const encryptedData: string = await getDatabaseData();
  const decryptedData: arrayOfWebsites | [] = encryptedData.length > 0 ? sanitizeEncryptedData(encryptedData, key) : []
    if (!Array.isArray(decryptedData))
        throw createResponse(false, "The data from database wasn't an array, canceling post request", null);
  const postedData: arrayOfWebsites = InsertIntoWebsitesArray(updatePostDataId, decryptedData)
    if (!Array.isArray(postedData))
        throw createResponse(false, "Couldn't update the data, canceling post request", null);
  const updatedDatabase: boolean = await encryptAndInsertDatabaseData(postedData, key)
    if (!updatedDatabase)
        throw createResponse(false, "Couldn't write to Database", null);
  return createResponse(true, "Post request successful", postedData);
}