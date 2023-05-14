// @ts-nocheck

import { arrayOfWebsites, websiteObject, API } from "../../@types/@type-module";


export const getDataSetId = (target: HTMLElement) : string | null => {
  return target.getAttribute("data-website-id")
}

export const removeItemWebsiteArray = (id: string): string => {
  if (id === "") throw "No id was found, canceling event";
  const newArrayOfWebsites: arrayOfWebsites = websites.filter(website => website.id !== id);
  return JSON.stringify(newArrayOfWebsites);
};

export const updateItemWebsiteArray = (newObject: websiteObject): string => {
  if (newObject.id === "") throw "No id was found, canceling event";
  const updatedValuesInObject: arrayOfWebsites = websites.map((website) => (website.id === newObject.id ? { ...website, ...newObject } : website))
  return JSON.stringify(updatedValuesInObject);
};

export const InsertIntoWebsitesArray = (websiteObject: websiteObject): string => {
  if (websiteObject.id === "") throw "No id was set, canceling event";
  const newArrayOfWebsites: arrayOfWebsites = [...websites, websiteObject];
  return JSON.stringify(newArrayOfWebsites);
};

export const compileFormData = async (form: HTMLFormElement): Promise<websiteObject> => {
  const extractedData = new FormData(form) as unknown as Iterable<[websiteObject, FormDataEntryValue]>;
  const dataEntries: websiteObject = Object.fromEntries(extractedData);
  const createId: string = await window.API.backend.generateId();
  const compileNewData: websiteObject = {
    ...dataEntries,
    id: createId,
  };
  return compileNewData;
};
