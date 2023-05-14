// @ts-nocheck

import { arrayOfWebsites, websiteObject, API } from "../../@types/@type-module";


export const getDataSetId = (target: HTMLElement) : string | null => {
  return target.getAttribute("data-website-id")
}

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
