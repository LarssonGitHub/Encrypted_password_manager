import {
  userCredentialObject,
  userCredentialsArray
} from "../../@types/@type-module";
import {
  compileFormData,
  getDataSetId
} from "./logic.js";
import {
  errorListener
} from "./middleware/errorListener.js";
import {
  editDocumentListing
} from "./renderer.js";
// TODO handle the key to the decrypt.
const key: string = "supera";
// supera

const logMessage = (message: string | undefined): void => {
  console.log("The request finished. ", message === undefined ? "" : ` Message: ${message}`)
}

export const postHandler = async (event: SubmitEvent) => {
  const compiledData: userCredentialObject = compileFormData(event.target as HTMLFormElement);
  const GetDataAndSanitize: void | userCredentialsArray = await errorListener(() => window.API.backend.postData(compiledData, key));
  if (!GetDataAndSanitize) return;
  editDocumentListing(GetDataAndSanitize)
};

export const getHandler = async (): Promise < void | string > => {
  const GetDataAndSanitize: void | userCredentialsArray = await errorListener(() => window.API.backend.getData(key))
  if (!GetDataAndSanitize) return;
  editDocumentListing(GetDataAndSanitize)
};

export const deleteItemHandler = async (event: MouseEvent): Promise < void > => {
  const confirm: boolean = window.confirm("Do you want to delete this item?")
  if (!confirm) return;
  const id: string | null = getDataSetId(event.target as HTMLButtonElement)
  const GetDataAndSanitize: void | userCredentialsArray = await errorListener(() => window.API.backend.deleteData(id, key))
  if (!GetDataAndSanitize) return;
  editDocumentListing(GetDataAndSanitize)
};

// Placeholder
const updateData: userCredentialObject = {
  id: "random id",
  websiteInput: "New name",
  emailInput: "new email",
  usernameInput: "new username",
  passwordInput: "new password",
  additionalDataInput: "new data ",
}

export const editItemHandler = async (event: MouseEvent): Promise < void > => {
  const confirm: boolean = window.confirm("Do you want to edit this item?")
  if (!confirm) return;
  const GetDataAndSanitize: void | userCredentialsArray = await errorListener(() => window.API.backend.updateData(updateData, key))
  if (!GetDataAndSanitize) return;
  editDocumentListing(GetDataAndSanitize)
};