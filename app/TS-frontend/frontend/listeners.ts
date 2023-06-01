import {
  editItemHandler,
  getHandler,
  checkDatabaseStatus,
  keyCreationHandler,
  keyValidationHandler,
  confirmHandler,
  itemHandler,
  formSubmitHandler
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
  const submittedForm: errorResponse | eventResponse = await eventErrorListener(() => formSubmitHandler(event));
  if (!submittedForm.success) return sanitizeError(submittedForm.error);
})

getItems.addEventListener("click", async () => {
  const getEvent: errorResponse | eventResponse = await eventErrorListener(() => getHandler());
  if (!getEvent.success) sanitizeError(getEvent.error);
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
  const updatedItemsInList: errorResponse | eventResponse = await eventErrorListener(() => itemHandler(event));
  if (!updatedItemsInList.success) {
      resetConfirm()
      return sanitizeError(updatedItemsInList.error);
  }
});

createKeyButton.addEventListener("click", async () => {
  const getKey: errorResponse | eventResponse = await eventErrorListener(() => keyCreationHandler());
  if (!getKey.success) return sanitizeError(getKey.error);
  const getData: errorResponse | eventResponse = await eventErrorListener(() => getHandler());
  if (!getData.success) return sanitizeError(getData.error)
  hideElement(createKeyContainer);
});


validateKeyButton.addEventListener("click", async () => {
  const getKey: errorResponse | eventResponse = await eventErrorListener(() => keyValidationHandler());
  if (!getKey.success) return sanitizeError(getKey.error);
  const getData: errorResponse | eventResponse = await eventErrorListener(() => getHandler());
  if (!getData.success) return sanitizeError(getData.error);
  hideElement(validateKeyContainer);
});

confirmYesButton.addEventListener("click", async (event: MouseEvent) => {
  event.preventDefault();
  const updatedItemsInList: errorResponse | eventResponse = await eventErrorListener(() => confirmHandler(event));
  resetConfirm()
  if (!updatedItemsInList.success) return sanitizeError(updatedItemsInList.error);
});
confirmNoButton.addEventListener("click", async () => {
  resetConfirm();
});

// TODO find another, more electron related solution to run a function at startup
document.onreadystatechange = async function() {
  const getDatabase: errorResponse | eventResponse = await eventErrorListener(() => checkDatabaseStatus());
  if (!getDatabase.success) return sanitizeError(getDatabase.error);
};