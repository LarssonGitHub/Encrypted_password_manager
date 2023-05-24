import {
  userCredentialObject,
  customResponse,
  errorResponse
} from "../../@types/@type-module";
import {
  getDeleteId,
  resetForm,
  updateFormValues,
  getDataStoredObject,
  setDataAction,
  setNewDataDeleteId,
  removeDataAction,
  viewElement,
  hideElement,
  extractAndValidateKey,
  getFormValues,
  getDataEvent,
  resetConfirm,
  getDataDeleteValidationId,
  removeDataDeleteId
} from "./utilities.js";
import {
  errorListener
} from "./middleware/errorListener.js";
import {
  updateDocumentList,
  editDocumentFeedback,
} from "./renderer.js";
import {
  formContainer,
  validateKeyContainer,
  createKeyContainer,
} from "./listeners.js";
import {
  sanitizeError
} from "./middleware/errorListener.js";

// The key for decryption/encryption
let secretKey: string;

export const confirmHandler = (target: HTMLButtonElement) => {
  const event: string | null = getDataEvent(target);
  switch (event) {
      case "postHandler":
          postHandler()
          resetConfirm()
          break;
      case "updateHandler":
          updateHandler()
          resetConfirm()
          break;
      case "deleteHandler":
          deleteHandler()
          resetConfirm()
          break;
      default:
          break;
          // TODO throw error
  }
}

export const postHandler = async (): Promise < void > => {
  if (!secretKey) return
  const compiledObject: userCredentialObject = getFormValues();
  const response: errorResponse | customResponse = await errorListener(() => window.API.backend.postData(compiledObject, secretKey));
  if (!response.ok) {
      sanitizeError(response.error)
      return
  }
  hideElement(formContainer);
  resetForm();
  removeDataAction();
  editDocumentFeedback(response.message, false)
  updateDocumentList(response.data);
};

export const getHandler = async (): Promise < void | string > => {
  const response: errorResponse | customResponse = await errorListener(() => window.API.backend.getData(secretKey));
  if (!response.ok) {
      sanitizeError(response.error)
      return
  }
  hideElement(validateKeyContainer);
  editDocumentFeedback(response.message, false)
  updateDocumentList(response.data);
};

export const deleteHandler = async (): Promise < void > => {
  if (!secretKey) return;
  const id: string | undefined = getDeleteId();
  if (!id) return
  const response: errorResponse | customResponse = await errorListener(() => window.API.backend.deleteData(id, secretKey));
  if (!response.ok) {
      sanitizeError(response.error)
      removeDataDeleteId()
      return
  }
  editDocumentFeedback(response.message, false)
  updateDocumentList(response.data);
};

export const editItemHandler = async (target: HTMLButtonElement): Promise < void > => {
  if (!target) return
  const data: void | userCredentialObject = getDataStoredObject(target);
  if (!data) return
  setDataAction("update")
  updateFormValues(data);
  viewElement(formContainer)
};

export const deleteItemHandler = async (target: HTMLButtonElement): Promise < void > => {
  if (!target) return
  const id: null | string = getDataDeleteValidationId(target)
  if (!id) return
  setNewDataDeleteId(target, id)
};

export const updateHandler = async (): Promise < void > => {
  if (!secretKey) return
  const compiledObject: userCredentialObject = getFormValues();
  const response: errorResponse | customResponse = await errorListener(() => window.API.backend.updateData(compiledObject, secretKey))
  if (!response.ok) {
      sanitizeError(response.error)
      return
  }
  hideElement(formContainer)
  resetForm()
  removeDataAction()
  editDocumentFeedback(response.message, false)
  updateDocumentList(response.data);
};

export const keyCreationHandler = (): void => {
  const userKey: string | void = extractAndValidateKey();
  if (!userKey) return;
  hideElement(createKeyContainer);
  secretKey = userKey;
}

export const creationHandler = (): void => {
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