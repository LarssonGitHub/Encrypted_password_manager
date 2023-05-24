import {
  editItemHandler,
  getHandler,
  CryptoKeyHandler,
  keyCreationHandler,
  creationHandler,
  confirmHandler,
  deleteItemHandler
} from "./handlers.js";
import {
  hideFeedbackContainer,
} from "./renderer.js";
import {
  viewElement,
  hideElement,
  getDataAction,
  setDataAction,
  resetForm,
  postConfirm,
  deleteConfirm,
  updateConfirm,
  resetConfirm
} from "./utilities.js";

// HTML tags always present, if changed, like the template html tag, remove assertion operator & update guards
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

form.addEventListener("submit", (event: SubmitEvent) => {
  event.preventDefault();
  const action: string | null = getDataAction(event.target as HTMLFormElement)
  if (action && action === "post") {
      postConfirm()
  }
  if (action && action === "update") {
      updateConfirm()
  }
})

getItems.addEventListener("click", (event: MouseEvent) => {
  event.preventDefault();
  getHandler();
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

listDataContainer.addEventListener("click", function(event: MouseEvent) {
  event.preventDefault();
  const target: HTMLButtonElement | null = event.target as HTMLButtonElement;
  if (target && target.classList.contains("edit-item-button")) {
      editItemHandler(target);
  }
  if (target && target.classList.contains("delete-item-button")) {
      deleteItemHandler(target);
      deleteConfirm()
  }
});

createKeyButton.addEventListener("click", () => {
  keyCreationHandler()
});

validateKeyButton.addEventListener("click", () => {
  creationHandler()
});

confirmYesButton.addEventListener("click", (event: MouseEvent) => {
  confirmHandler(event.target as HTMLButtonElement);
});

confirmNoButton.addEventListener("click", () => {
  resetConfirm()
});

// TODO find another, more electron related solution to run a function at startup
document.onreadystatechange = function() {
  CryptoKeyHandler()
};