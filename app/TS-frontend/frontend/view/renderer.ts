
import {
  websiteObject,
} from "../../../@types/@type-module";
import {deleteItem,editItem} from "../controller/CRUDrequests.js"
import { errorHandler } from "../middleware/errorHandler.js";
console.log(
  `This app is using Chrome (v${window.API.processVersion.chrome()}), Node.js (v${window.API.processVersion.node()}), and Electron (v${window.API.processVersion.electron()})`
);

// preload attached everything to window.
console.log(window);

// HTML tags always present, if changed, like the template html tag, remove assertion operator & update guards
const listDataContainer = document.getElementById("list-data-container") as HTMLDivElement;
const template = (document.getElementById("template-list") as HTMLTemplateElement);

export const appendListToArrayTemplate = (websiteArray: websiteObject[]) : boolean => {
  if (websiteArray.length < 0) return false;
  const clone = template.content.cloneNode(true) as DocumentFragment;
  const listElement = clone.getElementById('list-data-unordered-list') as HTMLUListElement;  
  websiteArray.forEach(i => {
    let newClone = listElement.cloneNode(true) as DocumentFragment; 
    newClone.querySelector('.list-id')!.textContent = i.id;
    newClone.querySelector('.list-website')!.textContent = i.websiteInput;
    newClone.querySelector('.list-username')!.textContent = i.emailInput;
    newClone.querySelector('.list-email')!.textContent = i.usernameInput;
    newClone.querySelector('.list-password')!.textContent = i.passwordInput;
    newClone.querySelector('.list-additional-data')!.textContent = i.additionalDataInput;
    (newClone.querySelector('.edit-item-button') as HTMLElement).setAttribute('data-website-id', i.id);
    (newClone.querySelector('.delete-item-button') as HTMLElement).setAttribute('data-website-id', i.id);
    listDataContainer.append(newClone);
  })
  return true
}

export const appendEventListeners = () => {
  const deleteItemButtons = document.querySelectorAll(".delete-item-button") as NodeListOf<HTMLButtonElement>;
  for (const button of deleteItemButtons) {
    button.addEventListener("click", async (event: MouseEvent) => {
      errorHandler(deleteItem, event)
    });
  }
  const editItemButtons = document.querySelectorAll(".edit-item-button") as NodeListOf<HTMLButtonElement>;
  for (const button of editItemButtons) {
    button.addEventListener("click", async (event: MouseEvent) => {
      errorHandler(editItem, event)
    });
  }
}