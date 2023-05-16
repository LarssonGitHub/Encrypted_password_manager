import { arrayOfWebsites, customResponse, websiteObject } from "../../@types/@type-module";
import { compileFormData, getDataSetId, editDocument } from "./logic.js";

// TODO handle the key to the decrypt.
const key: string = "super.åö";

const logMessage = (message: string | undefined): void => {
  console.log("The request finished. ", message === undefined ? "" : ` Message: ${message}`)
}

const sanitizeResponse = (response: customResponse): arrayOfWebsites | void => {
  // As of now, response.success will always be reported as true from the backend.
  // The error handler will catch any unsuccessful requests, remove this or change as needed.
  if (!response.success) throw new Error("Undefined error, response couldn't be completed")
  logMessage(response.message);
  if (!response.data || typeof response.data !== 'object') return
  return response.data
}

export const postHandler = async (event: SubmitEvent) => {
  const compiledData: websiteObject = await compileFormData(event.target as HTMLFormElement);
  const backendResponse: customResponse = await window.API.backend.postData(compiledData, key);
  const sanitizedData = sanitizeResponse(backendResponse)
  editDocument(sanitizedData)
};

export const getHandler = async (): Promise<void | string> => {
  const backendResponse: customResponse = await window.API.backend.getData(key);
  const sanitizedData = sanitizeResponse(backendResponse)
  editDocument(sanitizedData)
};

export const deleteItemHandler = async (event: MouseEvent):  Promise<void> => {
  const confirm: boolean = window.confirm("Do you want to delete this item?")
    if (!confirm) return;
  const id: string = getDataSetId(event.target as HTMLButtonElement)
  const backendResponse: customResponse = await window.API.backend.deleteData(id, key);
  const sanitizedData = sanitizeResponse(backendResponse)
  editDocument(sanitizedData)
};

// Placeholder
const updateData: websiteObject = {
  id: "random id",
  websiteInput: "New name",
  emailInput: "new email",
  usernameInput: "new username",
  passwordInput: "new password",
  additionalDataInput: "new data ",
}

export const editItemHandler  = async (event: MouseEvent):  Promise<void> => {
  const confirm: boolean = window.confirm("Do you want to edit this item?")
    if (!confirm) return;
  const backendResponse: customResponse = await window.API.backend.updateData(updateData, key);
  const sanitizedData = sanitizeResponse(backendResponse)
  editDocument(sanitizedData)
};
