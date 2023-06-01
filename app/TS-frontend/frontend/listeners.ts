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
  hideFeedbackContainer,
} from "./renderer.js";
import {
  viewElement,
  hideElement,
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

// Shows static tags are always present in the DOM 
// Dynamic tags are handled and validated in their respective function
export const listDataContainer = document.getElementById("list-data-container") as HTMLDivElement;
export const template = document.getElementById("template-list") as HTMLTemplateElement;
export const feedbackContainer = document.getElementById("feedback-container") as HTMLDivElement;
export const feedbackMessage = document.getElementById("feedback-message") as HTMLParagraphElement;
export const feedbackCloseButton = document.getElementById("feedback-close-button") as HTMLButtonElement;
export const form = document.getElementById("form") as HTMLFormElement;
export const formContainer = document.getElementById("form-container") as HTMLDivElement;
export const postFormButton = document.getElementById("post-form-button") as HTMLButtonElement;
export const closeFormButton = document.getElementById("close-form-button") as HTMLButtonElement;
export const getItems = document.getElementById("get-items") as HTMLButtonElement;
export const createKeyContainer = document.getElementById("create-key-container") as HTMLDivElement;
export const validateKeyContainer = document.getElementById("validate-key-container") as HTMLDivElement;
export const createKeyButton = document.getElementById("create-key-button") as HTMLButtonElement;
export const validateKeyButton = document.getElementById("validate-key-button") as HTMLButtonElement;
export const confirmContainer = document.getElementById("confirm-container") as HTMLDivElement;
export const confirmMessage = document.getElementById("confirm-message") as HTMLParagraphElement;
export const confirmYesButton = document.getElementById("confirm-yes-button") as HTMLButtonElement;
export const confirmNoButton = document.getElementById("confirm-no-button") as HTMLButtonElement;
export const validateKeyInput = document.getElementById("validate-key-input") as HTMLInputElement;
export const createKeyInput = document.getElementById("create-key-input") as HTMLInputElement;
export const repeatKeyInput = document.getElementById("repeat-key-input") as HTMLInputElement;

form.addEventListener("submit", async (event: SubmitEvent) => {
  event.preventDefault();
  const submitEvent: errorResponse | eventResponse = await eventErrorListener(() => submitFormAction(event));
  if (!submitEvent.success) return sanitizeError(submitEvent.error);
})

getItems.addEventListener("click", async () => {
  const getDataEvent: errorResponse | eventResponse = await eventErrorListener(() => getDatabaseData());
  if (!getDataEvent.success) sanitizeError(getDataEvent.error);
});

feedbackCloseButton.addEventListener("click", () => {
  hideFeedbackContainer();
});

postFormButton.addEventListener("click", () => {
  setDataAction("post")
  viewElement(formContainer);
});

closeFormButton.addEventListener("click", () => {
  hideElement(formContainer);
  resetForm()
});

listDataContainer.addEventListener("click", async (event: MouseEvent) => {
  event.preventDefault();
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
  hideElement(createKeyContainer);
});


validateKeyButton.addEventListener("click", async () => {
  const validateKeyEvent: errorResponse | eventResponse = await eventErrorListener(() => validateKey());
  if (!validateKeyEvent.success) return sanitizeError(validateKeyEvent.error);
  const getData: errorResponse | eventResponse = await eventErrorListener(() => getDatabaseData());
  if (!getData.success) return sanitizeError(getData.error);
  hideElement(validateKeyContainer);
});

confirmYesButton.addEventListener("click", async (event: MouseEvent) => {
  event.preventDefault();
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