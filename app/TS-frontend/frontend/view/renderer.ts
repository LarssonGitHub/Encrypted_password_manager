
import {
  websiteObject,
} from "../../../@types/@type-module";

console.log(
  `This app is using Chrome (v${window.API.processVersion.chrome()}), Node.js (v${window.API.processVersion.node()}), and Electron (v${window.API.processVersion.electron()})`
);

// preload attached everything to window.
console.log(window);

// HTML tags always present, if changed, like the template html tag, remove assertion operator & update guards
const listDataContainer: HTMLElement = document.getElementById("list-data-container")!;
const template = (document.getElementById("template-list") as HTMLTemplateElement)!;

export const appendToListTemplate = (websiteArray: websiteObject[]) : void => {
  if (websiteArray.length < 0) return;
  const clone = template.content.cloneNode(true) as DocumentFragment;
  const listElement = clone.getElementById('list-data-unordered-list')! as HTMLUListElement;  
  websiteArray.forEach(i => {
    let newClone = listElement.cloneNode(true) as DocumentFragment; 
    newClone.querySelector('.list-id')!.textContent = i.id;
    newClone.querySelector('.list-website')!.textContent = i.websiteInput;
    newClone.querySelector('.list-username')!.textContent = i.emailInput;
    newClone.querySelector('.list-email')!.textContent = i.usernameInput;
    newClone.querySelector('.list-password')!.textContent = i.passwordInput;
    newClone.querySelector('.list-additional-data')!.textContent = i.additionalDataInput;
    listDataContainer.append(newClone);
  })

}