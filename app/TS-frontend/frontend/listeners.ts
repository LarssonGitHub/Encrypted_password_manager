import { deleteItemHandler, editItemHandler } from "./handlers.js";
import { errorListener } from "./middleware/errorListener.js";
import { postHandler, getHandler } from "./handlers.js";

const form = document.getElementById("website-form")! as HTMLFormElement;
const getItems = document.getElementById("get-items")! as HTMLButtonElement;
const tryEvent = document.getElementById("try-event")! as HTMLButtonElement;

export const appendEventListeners = () => {
  const deleteItemButtons = document.querySelectorAll(".delete-item-button") as NodeListOf<HTMLButtonElement>;
  for (const button of deleteItemButtons) {
    button.addEventListener("click", async (event: MouseEvent) => {
      event.preventDefault();
      errorListener(deleteItemHandler, event);
    });
  }

  const editItemButtons = document.querySelectorAll(".edit-item-button") as NodeListOf<HTMLButtonElement>;
  for (const button of editItemButtons) {
    button.addEventListener("click", async (event: MouseEvent) => {
      event.preventDefault();
      errorListener(editItemHandler, event);
    });
  }
};

form.addEventListener("submit", async (event: SubmitEvent) => {
  event.preventDefault();
  errorListener(postHandler, event);
});

getItems.addEventListener("click", async (event: MouseEvent) => {
  event.preventDefault();
  errorListener(getHandler);
});


tryEvent.addEventListener("click", async (event: MouseEvent) => {
  event.preventDefault();
  // @ts-ignore
  errorListener( await window.API.backend.updateData({
    id: "ID number 2",
    websiteInput: "New name",
    emailInput: "new email",
    usernameInput: "new username",
    passwordInput: "new password",
    additionalDataInput: "new data ",
  }
  , "super-secret"));
});
