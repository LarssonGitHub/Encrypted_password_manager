import { CustomError } from "./middleware/errorListener.js";
import { removeListData, appendListToArrayTemplate } from "./renderer.js";
import { appendEventListeners } from "./listeners.js";
import {arrayOfWebsites, websiteObject } from "../../@types/@type-module";


export const getDataSetId = (target: HTMLElement) : string => {
  const id: string | null = target.getAttribute("data-website-id")
  if (id === null || id === "") throw new CustomError("No id was found on object")
  return id;
}

export const compileFormData = async (form: HTMLFormElement): Promise<websiteObject> => {
  const extractedData = new FormData(form) as unknown as Iterable<[websiteObject, FormDataEntryValue]>;
  return Object.fromEntries(extractedData);
};

export const editDocument = (data: arrayOfWebsites | void) => {
  removeListData()
  appendListToArrayTemplate(data);
  appendEventListeners();
}
