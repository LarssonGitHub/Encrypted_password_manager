import {
    userCredentialsArray,
    userCredentialObject,
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
} from "./utilities.js"
import {
    insertEmptyDatabaseData,
    getDatabaseData
} from "./db/fileSystem"

export const checkDatabase = async (): Promise < customResponse > => {
    const isEmpty: string | null = await getDatabaseData();
    if (!isEmpty) return createResponse("Your database is empty", null, true)
    return createResponse("Your database is not empty", null, false)
}

export const getData = async (key: string): Promise < customResponse > => {
    const databaseData: userCredentialsArray | null = await getDataFromDatabaseAndSanitize(key)
    if (!databaseData)
        return createResponse("Your database is empty", null)
    return createResponse("Get request successful", databaseData)
}

export const deleteData = async (objectId: string, key: string): Promise < customResponse > => {
    if (!objectId)
        throw new Error("No id was given, canceling event");
    const databaseData: null | userCredentialsArray = await getDataFromDatabaseAndSanitize(key);
    if (databaseData === null)
        throw new Error("Your database is empty, canceling delete request");
    const compiledDatabaseData: userCredentialsArray = removeItemWebsiteArray(objectId, databaseData);
    // A validation is used to clean the entire database if no items remain.
    // Used to make sure no residue, which requires a key, remains in the database so it can return as empty.
    if (compiledDatabaseData.length === 0) {
        const updatedDatabase: boolean = await insertEmptyDatabaseData();
        if (!updatedDatabase) throw new Error("Couldn't update the data, canceling delete request");
        return createResponse("Delete request successful, no more items in database", []);
    }
    const updatedDatabase: boolean = await encryptAndInsertDatabaseData(compiledDatabaseData, key)
    if (!updatedDatabase)
        throw new Error("Couldn't write to database");
    return createResponse("Delete request successful", compiledDatabaseData);
}

export const postData = async (postData: userCredentialObject, key: string): Promise < customResponse > => {
    if (!postData || Object.values(postData).every(x => x === null || x === ''))
        throw new Error("No data was submitted")
    const compiledPostData: userCredentialObject = createAndAppendId(postData);
    let databaseData: userCredentialsArray | null = await getDataFromDatabaseAndSanitize(key);
    if (databaseData === null)
        databaseData = []
    const compiledDatabaseData: userCredentialsArray = InsertIntoWebsitesArray(compiledPostData, databaseData)
    if (!Array.isArray(compiledDatabaseData))
        throw new Error("Couldn't post the data, canceling post request");
    const updatedDatabase: boolean = await encryptAndInsertDatabaseData(compiledDatabaseData, key)
    if (!updatedDatabase)
        throw new Error("Couldn't write to database");
    return createResponse("Post request successful", compiledDatabaseData);
}

export const updateData = async (putData: userCredentialObject, key: string): Promise < customResponse > => {
    if (!putData || Object.values(putData).every(value => value === null || value === ''))
        throw new Error("No data was submitted");
    const databaseData: userCredentialsArray | null = await getDataFromDatabaseAndSanitize(key)
    if (databaseData === null)
        throw new Error("Your database is empty, canceling put request");
    const compiledDatabaseData: userCredentialsArray = updateItemWebsiteArray(putData, databaseData);
    if (!Array.isArray(compiledDatabaseData))
        throw new Error("Couldn't update the data, canceling put request");
    const updatedDatabase: boolean = await encryptAndInsertDatabaseData(compiledDatabaseData, key)
    if (!updatedDatabase)
        throw new Error("Couldn't write to database");
    return createResponse("Update request successful", compiledDatabaseData);
}