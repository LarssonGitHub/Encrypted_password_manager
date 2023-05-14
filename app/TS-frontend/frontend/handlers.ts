import { arrayOfWebsites, websiteObject } from "../../@types/@type-module";
import { appendListToArrayTemplate,removeListData } from "./renderer.js";
import { appendEventListeners } from "./listeners.js";
import { InsertIntoWebsitesArray, compileFormData, getDataSetId, removeItemWebsiteArray, updateItemWebsiteArray } from "./logic.js";
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

export const deleteItemHandler = async (event: MouseEvent):  Promise<void> => {
  const confirm: boolean = window.confirm("Do you want to delete this item?")
    if (!confirm) return;
  const id: string | null = getDataSetId(event.target as HTMLButtonElement)
    if (id === null || id === "") throw "No id was found, canceling event";
  const websitesArray: string = removeItemWebsiteArray(id)
  const encryptData: string = await window.API.backend.encryptData(websitesArray, secretKey);
  console.log("Object deleted", websitesArray)
  console.log("new encrypted array, save this to database!", encryptData);
  removeListData()
 // TODO, remove parse, use real values
 const displayWebsiteList: boolean = appendListToArrayTemplate(JSON.parse(websitesArray));
  if (!displayWebsiteList) throw "No items in the array";
  appendEventListeners();
};

// Placeholder
const tempaObject: websiteObject =   {
  id: "ID number 2",
  websiteInput: "New name",
  emailInput: "new email",
  usernameInput: "new username",
  passwordInput: "new password",
  additionalDataInput: "new data ",
}

export const editItemHandler  = async (event: MouseEvent):  Promise<void> => {
  const confirm: boolean = window.confirm("Do you want to edit this item?")
    if (!confirm) return;
  const id: string | null = getDataSetId(event.target as HTMLButtonElement)
    if (id === null) throw "No id was found, canceling event";
  const websitesArray: string = updateItemWebsiteArray(tempaObject)
  const encryptData: string = await window.API.backend.encryptData(websitesArray, secretKey);
  console.log("Object updated, new encrypted array, save this to database!", encryptData);
  removeListData()
  // TODO, remove parse, use real values
  const displayWebsiteList: boolean = appendListToArrayTemplate(JSON.parse(websitesArray));
  if (!displayWebsiteList) throw "No items in the array";
  appendEventListeners();
};
