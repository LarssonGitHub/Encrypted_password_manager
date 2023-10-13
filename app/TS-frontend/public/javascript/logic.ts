import {
	userCredentialObject,
	userCredentialsArray,
  } from "../../../@types/@type-module";
  import {
	form,
	confirmDialog,
	validateKeyInput,
	repeatKeyInput,
	createKeyInput,
	deleteItemButton,
  } from "./renderer.js";
  import { editConfirm, removeDataDeleteId } from "./renderer.js";
  
  export const isJsonString = (str: string) => {
	try {
	  JSON.parse(str);
	} catch (e) {
	  return false;
	}
	return true;
  };
  
  export const getDataStoredObject = (
	target: HTMLButtonElement
  ): userCredentialObject => {
	const dataObject: string | null = target.getAttribute("data-stored-object");
	if (!dataObject || !isJsonString(dataObject))
	  throw new Error("Couldn't get the data-stored-object attribute");
	return JSON.parse(dataObject);
  };
  
  export const getDataAction = (target: HTMLFormElement): string => {
	const value: string | null = target.getAttribute("data-action");
	if (!value) throw new Error("Couldn't get the data-action attribute");
	return value;
  };
  
  export const getDataEvent = (target: HTMLButtonElement): string => {
	const value: string | null = target.getAttribute("data-event");
	if (!value) throw "Couldn't get the data event attribute";
	return value;
  };
  
  export const compileFormData = (
	form: HTMLFormElement
  ): userCredentialObject => {
	const extractedData = new FormData(form) as unknown as Iterable<
	  [userCredentialObject, FormDataEntryValue]
	>;
	return Object.fromEntries(extractedData);
  };
  
  export const resetForm = (): void => {
	form.reset();
  };
  
  export const getAndValidateId = (): string => {
	const id: string | null = deleteItemButton.getAttribute("data-delete-id");
	if (!id) throw new Error("Couldn't locate an id for the delete request");
	return id;
  };
  
  export const updateFormValues = (data: userCredentialObject): void => {
	const formCollection: HTMLFormControlsCollection = form.elements;
	for (const property in data) {
	  for (let i = 0; i < formCollection.length; i++) {
		if (
		  formCollection[i].nodeName === "INPUT" ||
		  formCollection[i].nodeName === "TEXTAREA"
		) {
		  if (
			(formCollection[i] as HTMLInputElement | HTMLTextAreaElement).name ===
			property
		  ) {
			(formCollection[i] as HTMLInputElement | HTMLTextAreaElement).value =
			  data[property as keyof typeof data];
		  }
		}
	  }
	}
  };
  
  export const getFormValues = (): userCredentialObject => {
	const formCollection: HTMLFormControlsCollection = form.elements;
	const obj: userCredentialObject = {
	  id: "#",
	  titleInput: "",
	  emailInput: "",
	  usernameInput: "",
	  passwordInput: "",
	  additionalDataInput: "",
	};
	for (let i = 0; i < formCollection.length; i++) {
	  if (
		formCollection[i].nodeName === "INPUT" ||
		formCollection[i].nodeName === "TEXTAREA"
	  ) {
		Object.assign(obj, {
		  [(formCollection[i] as HTMLInputElement | HTMLTextAreaElement).name]: (
			formCollection[i] as HTMLInputElement | HTMLTextAreaElement
		  ).value,
		});
	  }
	}
	if (!obj.additionalDataInput)
	  obj.additionalDataInput = "No optional information submitted";
	return obj;
  };
  
  export const getAndValidateKeys = (): string => {
	const keyOne: string = createKeyInput.value;
	const keyTwo: string = repeatKeyInput.value;
	if (keyOne !== keyTwo) {
	  throw new Error("Keys didn't match");
	}
	return keyOne;
  };
  
  export const getKey = (): string => {
	return validateKeyInput.value;
  };
  
  export const confirm = (text: string, eventName: string) => {
	editConfirm(text, eventName);
	confirmDialog.showModal();
  };
  
  export const postConfirm = (): void => {
	confirm("Do you want to add a new item?", "postDatabaseData");
  };
  
  export const updateConfirm = (): void => {
	confirm("Do you want to edit this item?", "UpdateDatabaseData");
  };
  
  export const deleteConfirm = (): void => {
	confirm("Do you want to delete this item?", "deleteDatabaseData");
  };
  
  export const resetConfirm = (): void => {
	editConfirm("", "#");
	removeDataDeleteId();
	confirmDialog.close();
  };
  
  export const sortArrayAfterLetter = (
	data: userCredentialsArray
  ): userCredentialsArray => {
	return data.sort((a, b) =>
	  a.titleInput.toLocaleLowerCase() > b.titleInput.toLocaleLowerCase()
		? 1
		: b.titleInput.toLocaleLowerCase() > a.titleInput.toLocaleLowerCase()
		? -1
		: 0
	);
  };
  