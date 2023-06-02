import {
  userCredentialObject,
  backendResponse,
  errorResponse
} from "../../@types/@type-module";
import {
  getAndValidateId,
  resetForm,
  updateFormValues,
  getDataStoredObject,
  setDataAction,
  setNewDataDeleteId,
  removeDataAction,
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
 validateKeyDialog,
 createKeyDialog,
 formDialog
} from "./listeners.js";

// The key for decryption/encryption
// Must only be stored as a local variable for safety
let secretKey: string;

export const confirmRequest = async (event: MouseEvent) => {
  const target: HTMLButtonElement | null = event.target as HTMLButtonElement;
  if (!target) throw new Error("Couldn't find target")
  const handler: string = getDataEvent(target);
  switch (handler) {
      case "postDatabaseData":
          await postDatabaseData()
          break;
      case "UpdateDatabaseData":
          await UpdateDatabaseData()
          break;
      case "deleteDatabaseData":
          await deleteDatabaseData()
          break;
      default:
          throw new Error("Couldn't match a request")
  }
}

export const readyRequest = (event: MouseEvent) => {
  const target: HTMLButtonElement | null = event.target as HTMLButtonElement;
  if (!target) throw new Error("Couldn't find target")
  if (target && target.classList.contains("edit-item-button")) {
      readyUpdateDatabaseData(target);
      return
  }
  if (target && target.classList.contains("delete-item-button")) {
      readyDeleteDatabaseData(target);
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

export const postDatabaseData = async (): Promise < void > => {
  if (!secretKey) throw new Error("No key submitted");
  const compiledFormData: userCredentialObject = getFormValues();
  if (Object.values(compiledFormData).includes("")) throw new Error("Please, do not leave any felids empty")
  const postRequest: errorResponse | backendResponse = await backendErrorListener(() => window.API.backend.postData(compiledFormData, secretKey));
  if (!postRequest.success) {
      throw postRequest.error
  }
  formDialog.close()
  resetForm();
  removeDataAction();
  editFeedback(postRequest.message, false)
  updateList(postRequest.data);
};

export const getDatabaseData = async (): Promise < void | string > => {
  if (!secretKey) throw new Error("No key was submitted")
  const getRequest: errorResponse | backendResponse = await backendErrorListener(() => window.API.backend.getData(secretKey));
  if (!getRequest.success) {
      throw getRequest.error
  }
  editFeedback(getRequest.message, false)
  updateList(getRequest.data);
};

export const deleteDatabaseData = async (): Promise < void > => {
  if (!secretKey) throw new Error("No key was submitted")
  const id: string = getAndValidateId();
  const deleteRequest: errorResponse | backendResponse = await backendErrorListener(() => window.API.backend.deleteData(id, secretKey));
  if (!deleteRequest.success) {
      throw deleteRequest.error
  }
  editFeedback(deleteRequest.message, false)
  updateList(deleteRequest.data);
};

export const UpdateDatabaseData = async (): Promise < void > => {
  if (!secretKey) throw new Error("No key was submitted")
  const compiledFormData: userCredentialObject = getFormValues();
  if (Object.values(compiledFormData).includes("")) throw new Error("Please, do not leave any felids empty")
  const updateRequest: errorResponse | backendResponse = await backendErrorListener(() => window.API.backend.updateData(compiledFormData, secretKey))
  if (!updateRequest.success) {
      throw updateRequest.error;
  }
  formDialog.close()
  resetForm()
  removeDataAction();
  editFeedback(updateRequest.message, false);
  updateList(updateRequest.data);
};

export const readyUpdateDatabaseData = (updateButton: HTMLButtonElement): void => {
  const compiledData: userCredentialObject = getDataStoredObject(updateButton);
  setDataAction("update")
  updateFormValues(compiledData);
  formDialog.showModal()
};

export const readyDeleteDatabaseData = (deleteButton: HTMLButtonElement): void => {
  const id: string = getDataDeleteValidationId(deleteButton);
  setNewDataDeleteId(deleteButton, id)
};

export const createKey = (): void => {
  const key: string = getAndValidateKeys();
  if (!key) throw new Error("Problem occurred when creating new key");
  secretKey = key;
}

export const validateKey = async () => {
  const key: string = getKey();
  if (!key) throw new Error("Problem occurred when fetching key");
  secretKey = key;
}

export const checkDatabaseStatus = async (): Promise < void > => {
  const getStatus: errorResponse | backendResponse = await backendErrorListener(() => window.API.backend.checkDatabase());
  if (!getStatus.success) {
      throw getStatus.error
  }
  if (!getStatus.databaseEmpty) {
      validateKeyDialog.showModal()
      return;
  }
  createKeyDialog.showModal()
  return;
};