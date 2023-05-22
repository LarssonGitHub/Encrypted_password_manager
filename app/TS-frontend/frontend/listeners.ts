import { deleteItemHandler, editItemHandler } from "./handlers.js";
import { errorListener } from "./middleware/errorListener.js";
import { postHandler, getHandler } from "./handlers.js";
import { hideFeedbackContainer } from "./renderer.js";

// HTML tags always present, if changed, like the template html tag, remove assertion operator & update guards
export const listDataContainer = document.getElementById("list-data-container") as HTMLDivElement;
export const template = document.getElementById("template-list") as HTMLTemplateElement;
export const feedbackContainer = document.getElementById("feedback-container") as HTMLDivElement;
export const feedbackMessage = document.getElementById("feedback-message") as HTMLParagraphElement;
export const feedbackCloseButton = document.getElementById("feedback-close-button") as HTMLSpanElement;
export const form = document.getElementById("website-form")! as HTMLFormElement;
export const getItems = document.getElementById("get-items")! as HTMLButtonElement;

export const appendEventListeners = () => {
  const deleteItemButtons = document.querySelectorAll(".delete-item-button") as NodeListOf<HTMLButtonElement>;
  for (const button of deleteItemButtons) {
    button.addEventListener("click", async (event: MouseEvent) => {
      event.preventDefault();
      deleteItemHandler(event)
    });
  }

  const editItemButtons = document.querySelectorAll(".edit-item-button") as NodeListOf<HTMLButtonElement>;
  for (const button of editItemButtons) {
    button.addEventListener("click", async (event: MouseEvent) => {
      event.preventDefault();
      editItemHandler(event)
    });
  }
};

form.addEventListener("submit", async (event: SubmitEvent) => {
  event.preventDefault();
  postHandler(event)
});

getItems.addEventListener("click", async (event: MouseEvent) => {
  event.preventDefault();
  getHandler();
});

feedbackCloseButton.addEventListener("click", async () => {
  hideFeedbackContainer()
});