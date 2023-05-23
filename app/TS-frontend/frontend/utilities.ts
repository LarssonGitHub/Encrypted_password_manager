import {
  userCredentialObject,
} from "../../@types/@type-module";
import {
  form
} from "./listeners.js";

export const isJsonString = (str: string) => {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}
export const getDataCredentialId = (target: HTMLButtonElement): string | null => {
  return target.getAttribute("data-credential-id")
}

export const getDataStoredObject = (target: HTMLButtonElement): string | null => {
  return target.getAttribute("data-stored-object")
}

export const setDataAction = (action: string): void => {
  switch (action) {
      case "post":
          form.setAttribute("data-action", "post");
          break;
      case "update":
          form.setAttribute("data-action", "update");
          break;
      default:
          return
  }
}

export const removeDataAction = (): void => {
  form.setAttribute("data-action", "");
}

export const getDataAction = (target: HTMLFormElement): string | null => {
  return target.getAttribute("data-action")
}

export const compileFormData = (form: HTMLFormElement): userCredentialObject => {
  const extractedData = new FormData(form) as unknown as Iterable < [userCredentialObject, FormDataEntryValue] > ;
  return Object.fromEntries(extractedData);
};

export const hideElement = (element: HTMLElement): void => {
  if (element.classList.contains("show"))
      element.classList.replace("show", "hidden");
}

export const viewElement = (element: HTMLElement): void => {
  if (element.classList.contains("hidden"))
      element.classList.replace("hidden", "show");
}

export const resetForm = (): void => {
  form.reset();
}

// export const updateFormInputs = (data: string) => {
//   // TODO check if this works, remove this if needed!
//   if (!isJsonString(data)) return
//   const parsedData: userCredentialObject = JSON.parse(data);
//   (document.getElementById("id")as HTMLInputElement).value = parsedData.id;
//   (document.getElementById("website-input")as HTMLInputElement).value = parsedData.websiteInput;
//   (document.getElementById("email-input")as HTMLInputElement).value = parsedData.emailInput;
//   (document.getElementById("username-input")as HTMLInputElement).value = parsedData.usernameInput;
//   (document.getElementById("password-input")as HTMLInputElement).value = parsedData.passwordInput;
//   (document.getElementById("additional-data-input")as HTMLInputElement).value = parsedData.additionalDataInput;
//   }

export const updateFormInputs = (data: string) => {
  if (!isJsonString(data)) return
  const parsedData: userCredentialObject = JSON.parse(data);
  for (const property in parsedData) {
      // @ts-ignore
      form.elements[property].value = parsedData[property as keyof typeof parsedData]
  }
}