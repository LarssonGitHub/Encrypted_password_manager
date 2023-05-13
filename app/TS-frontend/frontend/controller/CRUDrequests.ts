

import {
  arrayOfWebsites,
  websiteObject,
  API,
} from "../../../@types/@type-module";
import { errorHandler } from "../middleware/errorHandler.js";
import { appendListToArrayTemplate, appendEventListeners} from "../view/renderer.js";

// TODO, fix this
declare global {
  interface Window {
    API: API;
  }
}

const tempJSON: websiteObject[] = [
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
  }
]

const form = document.getElementById("website-form")! as HTMLFormElement;
const getItems = document.getElementById("get-items")! as HTMLButtonElement;

// TODO handle the key to the decrypt.
const secretKey: string = "super-secret";

let websites: arrayOfWebsites = [];

const InsertIntoWebsitesArray = (websiteObject: websiteObject): string => {
  if (websiteObject.id === "") throw "No id was set, canceling event";
  const newWebsitesArray: arrayOfWebsites = [...websites, websiteObject];
  return JSON.stringify(newWebsitesArray);
};

const compileFormData = async (form: HTMLFormElement): Promise<websiteObject> => {
  const extractedData = new FormData(form) as unknown as Iterable<[websiteObject, FormDataEntryValue]>;
  const dataEntries: websiteObject = Object.fromEntries(extractedData);
  const createId: string = await window.API.backend.generateId();
  const compileNewData: websiteObject = {
    ...dataEntries,
    id: createId,
  };
  return compileNewData;
};

const postHandler = async (event: SubmitEvent) => {
  event.preventDefault();
  const compiledFormData: websiteObject = await compileFormData(event.target as HTMLFormElement);
  const compiledWebsiteArray: string = InsertIntoWebsitesArray(compiledFormData);
  const encryptData: string = await window.API.backend.encryptData(compiledWebsiteArray, secretKey);
  console.log("The data is encrypt, save this to database!", encryptData);
  console.log("This is the d", await window.API.backend.decryptData(encryptData, secretKey));
};

const getHandler = async (): Promise<void | string> => {
  // Get this from database
  const displayWebsiteList: boolean = appendListToArrayTemplate(tempJSON)
  if (!displayWebsiteList) return "No items in the array"
  appendEventListeners()
}

export const deleteItem = (event: MouseEvent) => {
  event.preventDefault()
  if (event.target === null ) return
  const button = event.target as HTMLButtonElement;
  console.log("deleted", button.getAttribute('data-website-id'))
}

export const editItem = (event: MouseEvent) => {
  event.preventDefault()
  if (event.target === null ) return
  const button = event.target as HTMLButtonElement;
  console.log("Edited", button.getAttribute('data-website-id'))
}

// Wrap this in a promise!
form.addEventListener("submit", async (event: SubmitEvent) => {
  event.preventDefault();
  errorHandler(postHandler, event);
});

getItems.addEventListener("click", async (event: MouseEvent) => {
  errorHandler(getHandler)
});


