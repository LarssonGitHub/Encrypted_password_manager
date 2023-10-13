import {
    userCredentialsArray,
    userCredentialObject,
    backendResponse,
  } from "../../@types/@type-module";
  import {
    createAndAppendId,
    InsertItem,
    removeItem,
    updateItem,
    createResponse,
    encryptAndInsertDatabaseData,
    getDataFromDatabaseAndSanitize,
  } from "./logic.js";
  import { cleanDatabase, getDatabaseData } from "./db/fileSystem";
  
  export const checkDatabase = async (): Promise<backendResponse> => {
    const isEmpty: string = await getDatabaseData();
    if (!isEmpty) return createResponse("Your database is empty", null, true);
    return createResponse("Database is not empty", null, false);
  };
  
  export const getData = async (key: string): Promise<backendResponse> => {
    const databaseData: userCredentialsArray | null =
      await getDataFromDatabaseAndSanitize(key);
    if (!databaseData)
      return createResponse("Your database is empty", null, true);
    return createResponse("Successfully found records", databaseData);
  };
  
  export const deleteData = async (
    id: string,
    key: string
  ): Promise<backendResponse> => {
    const databaseData: null | userCredentialsArray =
      await getDataFromDatabaseAndSanitize(key);
    if (!databaseData)
      throw new Error(
        "<customThrownError::>Your database is empty, there's nothing to delete"
      );
    const compiledData: userCredentialsArray = removeItem(id, databaseData);
    if (compiledData.length <= 0) {
      const resetDatabase: boolean = await cleanDatabase();
      if (!resetDatabase)
        throw new Error("<customThrownError::>Couldn't clean the database");
      return createResponse(
        "Successfully deleted record, your database is empty",
        null,
        true
      );
    }
    const updatedDatabaseData: boolean = await encryptAndInsertDatabaseData(
      compiledData,
      key
    );
    if (!updatedDatabaseData)
      throw new Error("<customThrownError::>Couldn't write data to the database");
    return createResponse("Successfully deleted record", compiledData);
  };
  
  export const postData = async (
    postData: userCredentialObject,
    key: string
  ): Promise<backendResponse> => {
    if (!postData || Object.values(postData).includes(""))
      throw new Error(
        "<customThrownError::>No data was submitted, or fields were left empty"
      );
    let databaseData: userCredentialsArray | null =
      await getDataFromDatabaseAndSanitize(key);
    if (!databaseData) databaseData = [];
    const compiledPostData: userCredentialObject = createAndAppendId(postData);
    const finalizedData: userCredentialsArray = InsertItem(
      compiledPostData,
      databaseData
    );
    if (!Array.isArray(finalizedData))
      throw new Error("<customThrownError::>Couldn't compile or create record");
    const updatedDatabaseData: boolean = await encryptAndInsertDatabaseData(
      finalizedData,
      key
    );
    if (!updatedDatabaseData)
      throw new Error("<customThrownError::>Couldn't write data to the database");
    return createResponse("New record added", finalizedData);
  };
  
  export const updateData = async (
    putData: userCredentialObject,
    key: string
  ): Promise<backendResponse> => {
    if (!putData || Object.values(putData).includes(""))
      throw new Error(
        "<customThrownError::>No data was submitted, or fields were left empty"
      );
    const databaseData: userCredentialsArray | null =
      await getDataFromDatabaseAndSanitize(key);
    if (!databaseData)
      throw new Error(
        "<customThrownError::>Your database is empty, there's nothing to update"
      );
    const compiledData: userCredentialsArray = updateItem(putData, databaseData);
    if (!Array.isArray(compiledData))
      throw new Error("<customThrownError::>Couldn't compile or update record");
    const updatedDatabaseData: boolean = await encryptAndInsertDatabaseData(
      compiledData,
      key
    );
    if (!updatedDatabaseData)
      throw new Error("<customThrownError::>Couldn't write data to database");
    return createResponse("Successfully updated record", compiledData);
  };
  