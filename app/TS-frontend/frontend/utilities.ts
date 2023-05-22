import {
  userCredentialObject,
  customResponse,
  userCredentialsArray
} from "../../@types/@type-module";
import {
  editDocumentFeedback
} from "./renderer.js";

export const getDataSetId = (target: HTMLElement): string | null => {
  return target.getAttribute("data-website-id")
}

export const compileFormData = (form: HTMLFormElement): userCredentialObject => {
  const extractedData = new FormData(form) as unknown as Iterable < [userCredentialObject, FormDataEntryValue] > ;
  return Object.fromEntries(extractedData);
};

export const sanitizeResponse = (response: customResponse): userCredentialsArray | void => {
  const message = response.message === undefined ? "Action completed, no message given" : response.message;
  editDocumentFeedback(message, false)
  if (!response.data || typeof response.data !== 'object') return;
  return response.data
}

export const hideElement = (element: HTMLElement): void => {
  if (element.classList.contains("show")) 
    element.classList.replace("show", "hidden");
}

export const viewElement = (element: HTMLElement): void => {
  if (element.classList.contains("hidden")) 
    element.classList.replace("hidden", "show");
}

