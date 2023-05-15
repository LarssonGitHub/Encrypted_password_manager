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
  encryptAndInsertDatabaseData,
  getDataFromDatabaseAndSanitize
} from "./utility/utility"

export const getData = async (key: string): Promise < customResponse > => {
  const databaseData: arrayOfWebsites | null = await getDataFromDatabaseAndSanitize(key)
  if (databaseData === null)
      return createResponse(true, "Your database is empty", null)
  return createResponse(true, "Get request successful", databaseData)
}

export const deleteData = async (objectId: string, key: string): Promise < customResponse > => {
  if (!objectId || objectId.length === 0)
      throw createResponse(false, "No id was given, canceling event", null);
  const databaseData: null | arrayOfWebsites = await getDataFromDatabaseAndSanitize(key);
  if (databaseData === null)
      throw createResponse(false, "Your database is empty, canceling delete request", null);
  const compiledDatabaseData: arrayOfWebsites = removeItemWebsiteArray(objectId, databaseData);
  if (!Array.isArray(compiledDatabaseData))
      throw createResponse(false, "Couldn't update the data, canceling delete request", null);
  const updatedDatabase: boolean = await encryptAndInsertDatabaseData(compiledDatabaseData, key)
  if (!updatedDatabase)
      throw createResponse(false, "Couldn't write to database", null);
  return createResponse(true, "Delete request successful", compiledDatabaseData);
}

export const postData = async (postData: websiteObject, key: string): Promise < customResponse > => {
  if (!postData || Object.values(postData).every(x => x === null || x === ''))
      throw createResponse(false, "No data was submitted")
  const compiledPostData: websiteObject = createAndAppendId(postData);
  let databaseData: arrayOfWebsites | null = await getDataFromDatabaseAndSanitize(key);
  if (databaseData === null)
      databaseData = []
  const compiledDatabaseData: arrayOfWebsites = InsertIntoWebsitesArray(compiledPostData, databaseData)
  if (!Array.isArray(compiledDatabaseData))
      throw createResponse(false, "Couldn't post the data, canceling post request", null);
  const updatedDatabase: boolean = await encryptAndInsertDatabaseData(compiledDatabaseData, key)
  if (!updatedDatabase)
      throw createResponse(false, "Couldn't write to database", null);
  return createResponse(true, "Post request successful", compiledDatabaseData);
}

export const updateData = async (putData: websiteObject, key: string): Promise < customResponse > => {
  if (!putData || Object.values(putData).every(x => x === null || x === ''))
      throw createResponse(false, "No data was submitted");
  const databaseData: arrayOfWebsites | null = await getDataFromDatabaseAndSanitize(key)
  if (databaseData === null)
      throw createResponse(false, "Your database is empty, canceling put request", null);
  const compiledDatabaseData: arrayOfWebsites = updateItemWebsiteArray(putData, databaseData);
  if (!Array.isArray(compiledDatabaseData))
      throw createResponse(false, "Couldn't update the data, canceling put request", null);
  const updatedDatabase: boolean = await encryptAndInsertDatabaseData(compiledDatabaseData, key)
  if (!updatedDatabase)
      throw createResponse(false, "Couldn't write to database", null);
  return createResponse(true, "Post request successful", compiledDatabaseData);
}