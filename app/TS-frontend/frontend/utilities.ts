import {
  userCredentialObject,

} from "../../@types/@type-module";
import {
  form,
  confirmContainer
} from "./listeners.js";
import {
  editDocumentFeedback,
  editDocumentConfirm
} from "./renderer.js";

export const isJsonString = (str: string) => {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}
export const getDataDeleteValidationId = (target: HTMLButtonElement): string | null => {
  return target.getAttribute("data-delete-validation-id")
}

export const getDataStoredObject = (target: HTMLButtonElement): userCredentialObject | void => {
  const dataObject: string | null = target.getAttribute("data-stored-object");
  if (!dataObject || !isJsonString(dataObject)) return
  return JSON.parse(dataObject)
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

export const setNewDataDeleteId = (target: HTMLButtonElement, id: string): void => {
  // Used to validate that the right is stored when deletion is confirmed by user
  target.setAttribute("data-delete-id", id);
}


export const removeDataAction = (): void => {
  form.setAttribute("data-action", "");
}

export const getDataAction = (target: HTMLFormElement): string | null => {
  return target.getAttribute("data-action")
}

export const getDataEvent = (target: HTMLButtonElement): string | null => {
  return target.getAttribute("data-event")
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

export const getDeleteId = (): string | undefined => {
  const deleteButtons: NodeListOf < HTMLButtonElement > = document.querySelectorAll(".delete-item-button")
  if (deleteButtons.length <= 0) return
  let id: string = "";
  for (let i = 0; i < deleteButtons.length; i++) {
      const deleteId: string | null = deleteButtons[i].getAttribute("data-delete-id");
      if (!deleteId) continue;
      const deleteIdMatch: string | null = deleteButtons[i].getAttribute("data-delete-validation-id");
      if (deleteId !== deleteIdMatch) return;
      id = deleteId
      break;

  }
  return id
}

export const removeDataDeleteId = (): undefined => {
  const deleteButtons: NodeListOf < HTMLButtonElement > = document.querySelectorAll(".delete-item-button")
  // Throw in error
  if (deleteButtons.length <= 0) return
  for (let i = 0; i < deleteButtons.length; i++) {
      deleteButtons[i].setAttribute("data-delete-id", "#");
  }
}

export const updateFormValues = (data: userCredentialObject): void => {
  const FormCollection: HTMLFormControlsCollection = form.elements;
  for (const property in data) {
      for (let i = 0; i < FormCollection.length; i++) {
          if (FormCollection[i].nodeName === "INPUT" || FormCollection[i].nodeName === "TEXTAREA") {
              if ((FormCollection[i] as HTMLInputElement | HTMLTextAreaElement).name === property) {
                  (FormCollection[i] as HTMLInputElement | HTMLTextAreaElement).value = data[property as keyof typeof data]
              }
          }
      }
  }
}

export const getFormValues = (): userCredentialObject => {
  const FormCollection: HTMLFormControlsCollection = form.elements;
  const obj: userCredentialObject = {
      id: "",
      websiteInput: "",
      emailInput: "",
      usernameInput: "",
      passwordInput: "",
      additionalDataInput: ""
  };
  for (let i = 0; i < FormCollection.length; i++) {
      if (FormCollection[i].nodeName === "INPUT" || FormCollection[i].nodeName === "TEXTAREA") {
          Object.assign(obj, {
          [(FormCollection[i] as HTMLInputElement | HTMLTextAreaElement).name]: (FormCollection[i] as HTMLInputElement | HTMLTextAreaElement).value
          });
      }
  }
  return obj
}
export const extractAndValidateKey = (): string | void => {
  const keyValueOne: string = (document.getElementById("create-key-input") as HTMLInputElement).value;
  const keyValueTwo: string = (document.getElementById("repeat-key-input") as HTMLInputElement).value;
  if (keyValueOne !== keyValueTwo) {
      editDocumentFeedback("Keys doesn't match", true);
      return
  }
  return keyValueOne
}

export const confirm = (text: string, eventName: string) => {
  editDocumentConfirm(text, eventName)
  viewElement(confirmContainer);
}

export const postConfirm = (): void => {
  confirm("Do you want to add a new item?", "postHandler");
}

export const updateConfirm = (): void => {
  confirm("Do you want to edit this item?", "updateHandler");
}

export const deleteConfirm = (): void => {
  confirm("Do you want to delete this item?", "deleteHandler");
}

export const resetConfirm = (): void => {
  editDocumentConfirm("", "#")
  removeDataDeleteId()
  hideElement(confirmContainer);
}