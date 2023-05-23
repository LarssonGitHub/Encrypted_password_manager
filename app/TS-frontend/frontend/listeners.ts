import {
  deleteItemHandler,
  editItemHandler
} from "./handlers.js";
import {
  postHandler,
  getHandler,
  CryptoKeyHandler,
  keyCreationHandler,
  CreationHandler
} from "./handlers.js";
import {
  hideFeedbackContainer
} from "./renderer.js";
import {
  viewElement,
  hideElement,
  getDataAction,
  setDataAction,
  resetForm
} from "./utilities.js";
import {
  updateHandler
} from "./handlers.js";

// HTML tags always present, if changed, like the template html tag, remove assertion operator & update guards
export const listDataContainer = document.getElementById("list-data-container") as HTMLDivElement;
export const template = document.getElementById("template-list") as HTMLTemplateElement;
export const feedbackContainer = document.getElementById("feedback-container") as HTMLDivElement;
export const feedbackMessage = document.getElementById("feedback-message") as HTMLParagraphElement;
export const feedbackCloseButton = document.getElementById("feedback-close-button") as HTMLButtonElement;
export const form = document.getElementById("form") !as HTMLFormElement;
export const formContainer = document.getElementById("form-container") !as HTMLDivElement;
export const postFormButton = document.getElementById("post-form-button") !as HTMLButtonElement;
export const closeFormButton = document.getElementById("close-form-button") !as HTMLButtonElement;
export const getItems = document.getElementById("get-items") !as HTMLButtonElement;
export const createKeyContainer = document.getElementById("create-key-container") as HTMLDivElement;
export const validateKeyContainer = document.getElementById("validate-key-container") as HTMLDivElement;
export const createKeyButton = document.getElementById("create-key-button") !as HTMLButtonElement;
export const validateKeyButton = document.getElementById("validate-key-button") !as HTMLButtonElement;





form.addEventListener("submit", (event: SubmitEvent) => {
  event.preventDefault();
  const actionType: string | null = getDataAction(event.target as HTMLFormElement)
  if (actionType && actionType === "post") {
      postHandler(event)
  }
  if (actionType && actionType === "update") {
      updateHandler(event)
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

listDataContainer.addEventListener("click", function(event) {
  event.preventDefault();
  const target: HTMLElement | null = event.target as HTMLElement;
  if (target && target.classList.contains("edit-item-button")) {
      editItemHandler(event);
  }
  if (target && target.classList.contains("delete-item-button")) {
      deleteItemHandler(event);
  }
});

// TODO find another, more electron related solution to run a function at startup
document.onreadystatechange = function() {
  CryptoKeyHandler()
};

createKeyButton.addEventListener("click", () => {
  keyCreationHandler()
});

validateKeyButton.addEventListener("click", () => {
  CreationHandler()
});