import { arrayOfWebsites, websiteObject } from "../../@types/@type-module";
import { appendListToArrayTemplate,removeListData } from "./renderer.js";
import { appendEventListeners } from "./listeners.js";
import { compileFormData, getDataSetId } from "./logic.js";
// TODO, fix this

// TODO handle the key to the decrypt.
const secretKey: string = "super-secret";

export const postHandler = async (event: SubmitEvent) => {
  const compiledData: websiteObject = await compileFormData(event.target as HTMLFormElement);
  const websites: arrayOfWebsites = await window.API.backend.postData(compiledData);
  removeListData()
  appendListToArrayTemplate(websites);
  appendEventListeners();
};

export const getHandler = async (): Promise<void | string> => {
  const websites: arrayOfWebsites = await window.API.backend.getData();
  const displayWebsiteList: boolean = appendListToArrayTemplate(websites);
    if (!displayWebsiteList) return "No items in the array";
  appendEventListeners();
};

export const deleteItemHandler = async (event: MouseEvent):  Promise<void> => {
  const confirm: boolean = window.confirm("Do you want to delete this item?")
    if (!confirm) return;
  const id: string | null = getDataSetId(event.target as HTMLButtonElement)
    if (id === null || id === "") throw "No id was found, canceling event";
  const websites: arrayOfWebsites = await window.API.backend.deleteData(id);
  removeListData()
  appendListToArrayTemplate(websites);
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
  const websites: arrayOfWebsites = await window.API.backend.updateData(id, tempaObject);
  removeListData()
  appendListToArrayTemplate(websites);
  appendEventListeners();
};
