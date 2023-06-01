import {
  userCredentialObject,
  backendResponse,
  eventResponse,
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
  getKey,
  getAndValidateKeys,
  getFormValues,
  getDataEvent,
  getDataDeleteValidationId,
  deleteConfirm,
  getDataAction,
  postConfirm,
  updateConfirm
} from "./utilities.js";
import {
  backendErrorListener,
} from "./middleware/errorListener.js";
import {
  updateList,
  editFeedback,
} from "./renderer.js";
import {
  formContainer,
  validateKeyContainer,
  createKeyContainer,
} from "./listeners.js";

// The key for decryption/encryption
// Must only be stored as a local variable for safety
let secretKey: string;

export const confirmRequest = async (event: MouseEvent) => {
  const target: HTMLButtonElement | null = event.target as HTMLButtonElement;
  if (!target) throw new Error("Couldn't find target")
  const handler: string = getDataEvent(target);
  switch (handler) {
      case "postHandler":
          await postHandler()
          break;
      case "updateHandler":
          await updateHandler()
          break;
      case "deleteHandler":
          await deleteHandler()
          break;
      default:
          throw new Error("Couldn't match a request")
  }
}

export const readyHandler = (event: MouseEvent) => {
  const target: HTMLButtonElement | null = event.target as HTMLButtonElement;
  if (!target) throw new Error("Couldn't find target")
  if (target && target.classList.contains("edit-item-button")) {
      readyUpdateHandler(target);
      return
  }
  if (target && target.classList.contains("delete-item-button")) {
      readyDeleteHandler(target);
      deleteConfirm();
      return
  }
  throw new Error("Couldn't match a handler")
}

export const submitFormAction = (event: SubmitEvent) => {
  const action: string = getDataAction(event.target as HTMLFormElement)
  switch (action) {
      case "post":
          postConfirm()
          break;
      case "update":
          updateConfirm()
          break;
      default:
          throw new Error("Couldn't locate any action from the form")
  }
}

export const postHandler = async (): Promise < void > => {
  if (!secretKey) throw new Error("No key submitted");
  const compiledObject: userCredentialObject = getFormValues();
  if (Object.values(compiledObject).includes("")) throw new Error("Please, do not leave any felids empty")
  const postData: errorResponse | backendResponse = await backendErrorListener(() => window.API.backend.postData(compiledObject, secretKey));
  if (!postData.success) {
      throw postData.error
  }
  hideElement(formContainer);
  resetForm();
  removeDataAction();
  editFeedback(postData.message, false)
  updateList(postData.data);
};

export const getDatabaseData = async (): Promise < void | string > => {
  if (!secretKey) throw new Error("No key was submitted")
  const getData: errorResponse | backendResponse = await backendErrorListener(() => window.API.backend.getData(secretKey));
  if (!getData.success) {
      throw getData.error
  }
  editFeedback(getData.message, false)
  updateList(getData.data);
};

export const deleteHandler = async (): Promise < void > => {
  if (!secretKey) throw new Error("No key was submitted")
  const id: string = getDeleteId();
  const deleteData: errorResponse | backendResponse = await backendErrorListener(() => window.API.backend.deleteData(id, secretKey));
  if (!deleteData.success) {
      throw deleteData.error
  }
  editFeedback(deleteData.message, false)
  updateList(deleteData.data);
};

export const readyUpdateHandler = (updateButton: HTMLButtonElement): void => {
  const data: userCredentialObject = getDataStoredObject(updateButton);
  setDataAction("update")
  updateFormValues(data);
  viewElement(formContainer);
};

export const readyDeleteHandler = (deleteButton: HTMLButtonElement): void => {
  const id: string = getDataDeleteValidationId(deleteButton);
  setNewDataDeleteId(deleteButton, id)
};

export const updateHandler = async (): Promise < void > => {
  if (!secretKey) throw new Error("No key was submitted")
  const compiledObject: userCredentialObject = getFormValues();
  if (Object.values(compiledObject).includes("")) throw new Error("Please, do not leave any felids empty")
  const updateData: errorResponse | backendResponse = await backendErrorListener(() => window.API.backend.updateData(compiledObject, secretKey))
  if (!updateData.success) {
      throw updateData.error;

  }
  hideElement(formContainer);
  resetForm()
  removeDataAction();
  editFeedback(updateData.message, false);
  updateList(updateData.data);
};

export const createKey = (): void => {
  const key: string = getAndValidateKeys();
  if (!key) throw new Error("Problem occurred when creating new key");
  secretKey = key;
}

export const validateKey = async () => {
  const userKey: string = getKey();
  if (!userKey) throw new Error("Problem occurred when fetching key");
  secretKey = userKey;
}

export const checkDatabaseStatus = async (): Promise < void > => {
  const getStatus: errorResponse | backendResponse = await backendErrorListener(() => window.API.backend.checkDatabase());
  if (!getStatus.success) {
      throw getStatus.error
  }
  if (!getStatus.databaseEmpty) {
      viewElement(validateKeyContainer);
      return;
  }
  viewElement(createKeyContainer);
  return;
};