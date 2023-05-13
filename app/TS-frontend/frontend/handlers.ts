import { arrayOfWebsites, websiteObject } from "../../@types/@type-module";
import { appendListToArrayTemplate } from "./renderer.js";
import { appendEventListeners } from "./listeners.js";
import { InsertIntoWebsitesArray, compileFormData } from "./logic.js";
// TODO, fix this

export const websites: arrayOfWebsites = [
  {
    id: "ID number 1",
    websiteInput: "name",
    emailInput: "email",
    usernameInput: "username",
    passwordInput: "passwordInput",
    additionalDataInput: "data input ",
  },
  {
    id: "ID number 2",
    websiteInput: "name",
    emailInput: "email",
    usernameInput: "username",
    passwordInput: "passwordInput",
    additionalDataInput: "data input ",
  },
];

// TODO handle the key to the decrypt.
const secretKey: string = "super-secret";

export const postHandler = async (event: SubmitEvent) => {
  const compiledFormData: websiteObject = await compileFormData(event.target as HTMLFormElement);
  const compiledWebsiteArray: string = InsertIntoWebsitesArray(compiledFormData);
  const encryptData: string = await window.API.backend.encryptData(compiledWebsiteArray, secretKey);
  console.log("The data is encrypt, save this to database!", encryptData);
  console.log("This is the d", await window.API.backend.decryptData(encryptData, secretKey));
};

export const getHandler = async (): Promise<void | string> => {
  // Get this from database
  const displayWebsiteList: boolean = appendListToArrayTemplate(websites);
  if (!displayWebsiteList) return "No items in the array";
  appendEventListeners();
};

export const deleteItemHandler = (event: MouseEvent) => {
  if (event.target === null) throw "No target was found, canceling event";
  const button = event.target as HTMLButtonElement;
  console.log("deleted", button.getAttribute("data-website-id"));
};

export const editItemHandler = (event: MouseEvent) => {
  if (event.target === null) throw "No target was found, canceling event";
  const button = event.target as HTMLButtonElement;
  console.log("Edited", button.getAttribute("data-website-id"));
};
