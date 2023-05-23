import {
  userCredentialObject,
  customResponse,
  errorResponse
} from "../../@types/@type-module";
import {
  compileFormData,
  getDataCredentialId,
  resetForm,
  updateFormInputs,
  getDataStoredObject,
  setDataAction,
  removeDataAction,
  viewElement,
  hideElement
} from "./utilities.js";
import {
  errorListener
} from "./middleware/errorListener.js";
import {
  editDocumentListing,
  editDocumentFeedback
} from "./renderer.js";
import {
  formContainer,
  validateKeyContainer,
  createKeyContainer
} from "./listeners.js";
import { sanitizeError } from "./middleware/errorListener.js";

let secretKey: string;

export const postHandler = async (event: SubmitEvent): Promise < void > => {
  const confirm: boolean = window.confirm("Do you want to add a new item?");
  if (!confirm) return;
  const compiledData: userCredentialObject = compileFormData(event.target as HTMLFormElement);
  const response: errorResponse | customResponse = await errorListener(() => window.API.backend.postData(compiledData, secretKey));
  if (!response.ok) {
    sanitizeError(response.error)
    return
  } 
  hideElement(formContainer);
  resetForm();
  removeDataAction();
  editDocumentFeedback(response.message, false)
  editDocumentListing(response.data);
};

export const getHandler = async (): Promise < void | string > => {
  const response: errorResponse | customResponse = await errorListener(() => window.API.backend.getData(secretKey));
  if (!response.ok) {
    sanitizeError(response.error)
    return
  } 
  hideElement(validateKeyContainer);
  editDocumentFeedback(response.message, false)
  editDocumentListing(response.data);
};

export const deleteItemHandler = async (event: MouseEvent): Promise < void > => {
  const confirm: boolean = window.confirm("Do you want to delete this item?");
  if (!confirm) return;
  const id: string | null = getDataCredentialId(event.target as HTMLButtonElement);
  const response: errorResponse | customResponse = await errorListener(() => window.API.backend.deleteData(id, secretKey));
  if (!response.ok) {
    sanitizeError(response.error)
    return
  } 
  editDocumentFeedback(response.message, false)
  editDocumentListing(response.data);
};

export const editItemHandler = async (event: MouseEvent): Promise < void > => {
  const data: string | null = getDataStoredObject(event.target as HTMLButtonElement);
  if (!data) return
  setDataAction("update")
  updateFormInputs(data);
  viewElement(formContainer)
};

export const updateHandler = async (event: SubmitEvent): Promise < void > => {
  const confirm: boolean = window.confirm("Do you want to edit this item?");
  if (!confirm) return;
  const updateData: userCredentialObject = compileFormData(event.target as HTMLFormElement);
  const response: errorResponse | customResponse = await errorListener(() => window.API.backend.updateData(updateData, secretKey))
  if (!response.ok) {
    sanitizeError(response.error)
    return
  } 
  hideElement(formContainer)
  resetForm()
  removeDataAction()
  editDocumentFeedback(response.message, false)
  editDocumentListing(response.data);
};

const extractAndValidateKey = (): string | void => {
  const keyValueOne: string = (document.getElementById("create-key-input") as HTMLInputElement).value;
  const keyValueTwo: string = (document.getElementById("repeat-key-input") as HTMLInputElement).value;
  if (keyValueOne !== keyValueTwo) {
    editDocumentFeedback("Keys doesn't match", true);
    return 
  }
  return keyValueOne
}

export const keyCreationHandler = (): void => {
      const userKey: string | void = extractAndValidateKey();
      if (!userKey) return;
      hideElement(createKeyContainer);
      secretKey = userKey;
}

export const CreationHandler = (): void => {
  const userKey: string = (document.getElementById("validate-key-input") as HTMLInputElement).value;
  secretKey = userKey;
  getHandler()
}

export const CryptoKeyHandler = async (): Promise < void > => {
  const response: errorResponse | customResponse = await errorListener(() => window.API.backend.checkDatabase());
  if (!response.ok) {
    sanitizeError(response.error)
    return
  }
  if (!response.databaseEmpty) {
      viewElement(validateKeyContainer);
      return;
  }
  viewElement(createKeyContainer);
  return;
};