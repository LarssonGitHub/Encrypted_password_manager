import { userCredentialObject } from "../../@types/@type-module";

export const getDataSetId = (target: HTMLElement) : string => {
  const id: string | null = target.getAttribute("data-website-id")
  if (id === null || id === "") throw new Error("No id was found on object")
  return id;
}

export const compileFormData = async (form: HTMLFormElement): Promise<userCredentialObject> => {
  const extractedData = new FormData(form) as unknown as Iterable<[userCredentialObject, FormDataEntryValue]>;
  return Object.fromEntries(extractedData);
};
