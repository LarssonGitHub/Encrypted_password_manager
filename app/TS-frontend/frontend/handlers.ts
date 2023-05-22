import {
  userCredentialObject,
  userCredentialsArray
} from "../../@types/@type-module";
import {
  compileFormData,
  getDataCredentialId,
  resetForm,
  updateFormInputs,
  getDataStoredObject,
  setDataAction,
  removeDataAction
} from "./utilities.js";
import {
  errorListener
} from "./middleware/errorListener.js";
import {
  editDocumentListing
} from "./renderer.js";
import {
  viewElement
} from "./utilities.js";
import {
  formContainer
} from "./listeners.js";

// TODO handle the key to the decrypt.
const key: string = "supera";
// supera

export const postHandler = async (event: SubmitEvent): Promise < void > => {
  const confirm: boolean = window.confirm("Do you want to add or edit this item?");
  if (!confirm) return;
  const compiledData: userCredentialObject = compileFormData(event.target as HTMLFormElement);
  const GetDataAndSanitize: void | userCredentialsArray = await errorListener(() => window.API.backend.postData(compiledData, key));
  if (!GetDataAndSanitize) return;
  resetForm()
  removeDataAction()
  editDocumentListing(GetDataAndSanitize)
};

export const getHandler = async (): Promise < void | string > => {
  const GetDataAndSanitize: void | userCredentialsArray = await errorListener(() => window.API.backend.getData(key));
  if (!GetDataAndSanitize) return;
  editDocumentListing(GetDataAndSanitize);
};

export const deleteItemHandler = async (event: MouseEvent): Promise < void > => {
  const confirm: boolean = window.confirm("Do you want to delete this item?");
  if (!confirm) return;
  const id: string | null = getDataCredentialId(event.target as HTMLButtonElement);
  console.log(id)
  const GetDataAndSanitize: void | userCredentialsArray = await errorListener(() => window.API.backend.deleteData(id, key));
  if (!GetDataAndSanitize) return;
  editDocumentListing(GetDataAndSanitize);
};

export const editItemHandler = async (event: MouseEvent): Promise < void > => {
  const data: string | null = getDataStoredObject(event.target as HTMLButtonElement);
  if (!data) return
  setDataAction("update")
  updateFormInputs(data);
  viewElement(formContainer)
};

export const updateHandler = async (event: SubmitEvent): Promise < void > => {
  const updateData: userCredentialObject = compileFormData(event.target as HTMLFormElement);
  const GetDataAndSanitize: void | userCredentialsArray = await errorListener(() => window.API.backend.updateData(updateData, key))
  if (!GetDataAndSanitize) return;
  resetForm()
  removeDataAction()
  editDocumentListing(GetDataAndSanitize)
};