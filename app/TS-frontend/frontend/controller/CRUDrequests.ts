import {
  arrayOfWebsites,
  websiteObject,
  API,
} from "../../../@types/@type-module";

// TODO, fix this
declare global {
  interface Window {
    API: API;
  }
}

import { errorHandler } from "../middleware/errorHandler.js";

const form = <HTMLFormElement>document.getElementById("website-form");

// TODO handle the key to the decrypt.
const secretKey: string = "super-secret";

const websites: arrayOfWebsites = [];

const InsertIntoWebsitesArray = (websiteObject: websiteObject): string => {
  if (websiteObject.id === "") throw "No id was set, canceling event";
  const newWebsitesArray: arrayOfWebsites = [...websites, websiteObject];
  return JSON.stringify(newWebsitesArray);
};

const compileFormData = async (
  form: HTMLFormElement
): Promise<websiteObject> => {
  const extractedData = new FormData(form) as unknown as Iterable<
    [websiteObject, FormDataEntryValue]
  >;
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
  const compiledFormData: websiteObject = await compileFormData(
    event.target as HTMLFormElement
  );
  const compiledWebsiteArray: string =
    InsertIntoWebsitesArray(compiledFormData);
  const encryptData: string = await window.API.backend.encryptData(
    compiledWebsiteArray,
    secretKey
  );
  console.log("The data is encrypt, save this to database!", encryptData);
  console.log(
    "This is the d",
    await window.API.backend.decryptData(encryptData, secretKey)
  );
};

// Wrap this in a promise!
form.addEventListener("submit", async (event: SubmitEvent) => {
  event.preventDefault();
  errorHandler(postHandler, event);
});
