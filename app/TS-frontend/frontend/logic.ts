// @ts-nocheck

import {websiteObject } from "../../@types/@type-module";


export const getDataSetId = (target: HTMLElement) : string | null => {
  return target.getAttribute("data-website-id")
}

export const compileFormData = async (form: HTMLFormElement): Promise<websiteObject> => {
  const extractedData = new FormData(form) as unknown as Iterable<[websiteObject, FormDataEntryValue]>;
  return Object.fromEntries(extractedData);
};
