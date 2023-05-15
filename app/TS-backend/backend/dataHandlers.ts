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
  encryptData,
  createResponse,
  sanitizeEncryptedData,
  encryptAndInsertDatabaseData
} from "./utility/utility"
import {
  getDatabaseData
} from "./fileSystem"

export const getData = async (key: string): Promise < customResponse > => {
  const encryptedData: string = await getDatabaseData();
      if (encryptedData.length === 0) return createResponse(true, "Your database is empty", null)
  const decryptedData: arrayOfWebsites = sanitizeEncryptedData(encryptedData, key)
  return createResponse(true, "Retrieved data from database", decryptedData)
}

// Create one encrypt and decrypt function...! 
export const deleteData = async (objectId: string, key: string): Promise <customResponse> => {
      if (!objectId || objectId.length === 0) 
          throw createResponse(false, "No id was given, canceling event", null);
  const encryptedData: string = await getDatabaseData();
      if (encryptedData.length === 0) 
          throw createResponse(false, "Your database is empty, canceling delete request", null);
  const decryptedData: arrayOfWebsites = sanitizeEncryptedData(encryptedData, key);
      if (Array.isArray(decryptedData)) 
          throw createResponse(false, "The data from database wasn't an array, canceling delete request", null);
  const updatedData: arrayOfWebsites = removeItemWebsiteArray(objectId, decryptedData);
      if (!Array.isArray(updatedData)) 
          throw createResponse(false, "Couldn't update the data, canceling delete request", null);
  const updatedDatabase: boolean = await encryptAndInsertDatabaseData(updatedData, key)
      if (!updatedDatabase) 
          throw createResponse(false, "Couldn't write to Database", null);
  return createResponse(true, "Delete successful", updatedData);
}

export const postData = async (postData: websiteObject, key: string): Promise <customResponse> => {
  const updatePostDataId: websiteObject = createAndAppendId(postData);
  const encryptedData: string = await getDatabaseData();
      if (encryptedData.length === 0) 
          return createResponse(true, "Your database is empty", null)
  const decryptedData: arrayOfWebsites = sanitizeEncryptedData(encryptedData, key)
      if (Array.isArray(decryptedData)) 
          throw createResponse(false, "The data from database wasn't an array, canceling post request", null);
  const postedData: arrayOfWebsites =  InsertIntoWebsitesArray(updatePostDataId, decryptedData)
      if (!Array.isArray(postedData)) 
          throw createResponse(false, "Couldn't update the data, canceling post request", null);
  const updatedDatabase: boolean = await encryptAndInsertDatabaseData(postedData, key)
        if (!updatedDatabase) 
            throw createResponse(false, "Couldn't write to Database", null);
  return createResponse(true, "Delete successful", postedData);
}