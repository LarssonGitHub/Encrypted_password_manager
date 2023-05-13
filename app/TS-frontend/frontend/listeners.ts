import { deleteItemHandler, editItemHandler } from "./handlers.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { postHandler, getHandler } from "./handlers.js";

const form = document.getElementById("website-form")! as HTMLFormElement;
const getItems = document.getElementById("get-items")! as HTMLButtonElement;

export const appendEventListeners = () => {
  const deleteItemButtons = document.querySelectorAll(".delete-item-button") as NodeListOf<HTMLButtonElement>;
  for (const button of deleteItemButtons) {
    button.addEventListener("click", async (event: MouseEvent) => {
      event.preventDefault();
      errorHandler(deleteItemHandler, event);
    });
  }

  const editItemButtons = document.querySelectorAll(".edit-item-button") as NodeListOf<HTMLButtonElement>;
  for (const button of editItemButtons) {
    button.addEventListener("click", async (event: MouseEvent) => {
      event.preventDefault();
      errorHandler(editItemHandler, event);
    });
  }
};

form.addEventListener("submit", async (event: SubmitEvent) => {
  event.preventDefault();
  errorHandler(postHandler, event);
});

getItems.addEventListener("click", async (event: MouseEvent) => {
  event.preventDefault();
  errorHandler(getHandler);
});
