import {
  getDatabaseData,
  checkDatabaseStatus,
  createKey,
  validateKey,
  confirmRequest,
  readyRequest,
  submitFormAction
} from "./handlers.js";
import {
  setDataAction,
  resetForm,
  resetConfirm
} from "./utilities.js";
import {
  eventErrorListener,
  sanitizeError
} from "./middleware/errorListener.js";
import {
  errorResponse,
  eventResponse
} from "../../@types/@type-module";
import { alterElementClass } from "./renderer.js";

// Shows static tags are always present in the DOM 
// Dynamic tags are handled and validated in their respective function
// TODO find a way to define semantic elements
export const listDataContainer = document.getElementById("list-data-container") as HTMLDivElement;
export const template = document.getElementById("template-list") as HTMLTemplateElement;
export const feedbackMessages = document.querySelectorAll(".feedback-message")  as NodeListOf<HTMLElement>;
export const form = document.getElementById("form") as HTMLFormElement;
export const postFormButton = document.getElementById("post-form-button") as HTMLButtonElement;
export const closeFormButton = document.getElementById("close-form-button") as HTMLButtonElement;
export const createKeyButton = document.getElementById("create-key-button") as HTMLButtonElement;
export const validateKeyButton = document.getElementById("validate-key-button") as HTMLButtonElement;
export const confirmMessage = document.getElementById("confirm-message") as HTMLParagraphElement;
export const confirmYesButton = document.getElementById("confirm-yes-button") as HTMLButtonElement;
export const confirmNoButton = document.getElementById("confirm-no-button") as HTMLButtonElement;
export const validateKeyInput = document.getElementById("validate-key-input") as HTMLInputElement;
export const createKeyInput = document.getElementById("create-key-input") as HTMLInputElement;
export const repeatKeyInput = document.getElementById("repeat-key-input") as HTMLInputElement;
export const feedbackContainers = document.querySelectorAll(".feedback-container") as NodeListOf<HTMLElement>;
export const createKeyDialog = document.getElementById("create-key-dialog") as HTMLDialogElement;
export const validateKeyDialog = document.getElementById("validate-key-dialog") as HTMLDialogElement;
export const formDialog = document.getElementById("form-dialog") as HTMLDialogElement;
export const confirmDialog = document.getElementById("confirm-dialog") as HTMLDialogElement;

form.addEventListener("submit", async (event: SubmitEvent) => {
  event.preventDefault();
  const submitEvent: errorResponse | eventResponse = await eventErrorListener(() => submitFormAction(event));
  if (!submitEvent.success) return sanitizeError(submitEvent.error);
})

postFormButton.addEventListener("click", () => {
  setDataAction("post")
  formDialog.showModal()
});

closeFormButton.addEventListener("click", () => {
  formDialog.close()
  resetForm()
});

listDataContainer.addEventListener("click", async (event: MouseEvent) => {
  const readyEvent: errorResponse | eventResponse = await eventErrorListener(() => readyRequest(event));
  if (!readyEvent.success) {
      resetConfirm()
      return sanitizeError(readyEvent.error);
  }
});

createKeyButton.addEventListener("click", async () => {
  const getKeyEvent: errorResponse | eventResponse = await eventErrorListener(() => createKey());
  if (!getKeyEvent.success) return sanitizeError(getKeyEvent.error);
  const getDataEvent: errorResponse | eventResponse = await eventErrorListener(() => getDatabaseData());
  if (!getDataEvent.success) return sanitizeError(getDataEvent.error)
  createKeyDialog.close()
});


validateKeyButton.addEventListener("click", async () => {
  const validateKeyEvent: errorResponse | eventResponse = await eventErrorListener(() => validateKey());
  if (!validateKeyEvent.success) return sanitizeError(validateKeyEvent.error);
  const getData: errorResponse | eventResponse = await eventErrorListener(() => getDatabaseData());
  if (!getData.success) return sanitizeError(getData.error);
  validateKeyDialog.close()
});

confirmYesButton.addEventListener("click", async (event: MouseEvent) => {
  const requestEvent: errorResponse | eventResponse = await eventErrorListener(() => confirmRequest(event));
  resetConfirm()
  if (!requestEvent.success) return sanitizeError(requestEvent.error);
});

confirmNoButton.addEventListener("click", async () => {
  resetConfirm();
});

// TODO find another, more electron related solution to run a function at startup
document.onreadystatechange = async function() {
  const checkDatabaseEvent: errorResponse | eventResponse = await eventErrorListener(() => checkDatabaseStatus());
  if (!checkDatabaseEvent.success) return sanitizeError(checkDatabaseEvent.error);
};