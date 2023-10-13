import {
	API,
	userCredentialsArray,
	userCredentialObject,
  } from "../../../@types/@type-module";
  
  import { sortArrayAfterLetter, updateFormValues } from "./logic.js";
  
  import { getDataStoredObject } from "./logic.js";
  
  console.log(
	`This app is using Chrome (v${window.API.processVersion.chrome()}), Node.js (v${window.API.processVersion.node()}), and Electron (v${window.API.processVersion.electron()})`
  );
  
  declare global {
	interface Window {
	  API: API;
	}
  }
  
  // These are static tags and are always present in the DOM
  // Dynamic tags are handled and validated in their respective function
  export const listDataContainer = document.getElementById(
	"list-data-container"
  ) as HTMLDivElement;
  export const template = document.getElementById(
	"template-list"
  ) as HTMLTemplateElement;
  export const feedbackMessages = document.querySelectorAll(
	".feedback-message"
  ) as NodeListOf<HTMLElement>;
  export const form = document.getElementById("form") as HTMLFormElement;
  export const postFormButton = document.getElementById(
	"post-form-button"
  ) as HTMLButtonElement;
  export const closeFormButton = document.getElementById(
	"close-form-button"
  ) as HTMLButtonElement;
  export const createKeyButton = document.getElementById(
	"create-key-button"
  ) as HTMLButtonElement;
  export const validateKeyButton = document.getElementById(
	"validate-key-button"
  ) as HTMLButtonElement;
  export const confirmMessage = document.getElementById(
	"confirm-message"
  ) as HTMLParagraphElement;
  export const confirmYesButton = document.getElementById(
	"confirm-yes-button"
  ) as HTMLButtonElement;
  export const confirmNoButton = document.getElementById(
	"confirm-no-button"
  ) as HTMLButtonElement;
  export const validateKeyInput = document.getElementById(
	"validate-key-input"
  ) as HTMLInputElement;
  export const createKeyInput = document.getElementById(
	"create-key-input"
  ) as HTMLInputElement;
  export const repeatKeyInput = document.getElementById(
	"repeat-key-input"
  ) as HTMLInputElement;
  export const feedbackContainers = document.querySelectorAll(
	".feedback-container"
  ) as NodeListOf<HTMLElement>;
  export const createKeyDialog = document.getElementById(
	"create-key-dialog"
  ) as HTMLDialogElement;
  export const validateKeyDialog = document.getElementById(
	"validate-key-dialog"
  ) as HTMLDialogElement;
  export const formDialog = document.getElementById(
	"form-dialog"
  ) as HTMLDialogElement;
  export const confirmDialog = document.getElementById(
	"confirm-dialog"
  ) as HTMLDialogElement;
  export const itemDialog = document.getElementById(
	"item-dialog"
  ) as HTMLDialogElement;
  export const closeItemButton = document.getElementById(
	"close-item-button"
  ) as HTMLButtonElement;
  export const deleteItemButton = document.getElementById(
	"delete-item-button"
  ) as HTMLButtonElement;
  export const editItemButton = document.getElementById(
	"edit-item-button"
  ) as HTMLButtonElement;
  
  export const InsertDataIntoTemplate = (
	data: userCredentialsArray | void
  ): void => {
	if (!data || !Array.isArray(data))
	  throw new Error("Couldn't insert data into the record");
	const sortedData: userCredentialsArray = sortArrayAfterLetter(data);
	const clone = template.content.cloneNode(true) as DocumentFragment;
	const listElement = clone.querySelector(
	  "[data-list-component]"
	) as HTMLUListElement;
	sortedData.forEach((key) => {
	  let insertedCloneText = listElement.cloneNode(true) as DocumentFragment;
	  (
		insertedCloneText.querySelector(".data-storage") as HTMLElement
	  ).setAttribute("data-stored-object", JSON.stringify(key));
	  (
		insertedCloneText.querySelector(".list-title") as HTMLLIElement
	  ).textContent = key.titleInput;
	  listDataContainer.append(insertedCloneText);
	});
  };
  
  export const removeListData = () => {
	while (listDataContainer.firstChild) {
	  listDataContainer.removeChild(listDataContainer.firstChild);
	}
  };
  
  export const updateList = (data: userCredentialsArray) => {
	removeListData();
	InsertDataIntoTemplate(data);
  };
  
  export const setFeedbackType = (
	responseStatus: boolean,
	element: HTMLElement
  ): void => {
	element.classList.replace("error-container", "success-container");
	if (responseStatus)
	  element.classList.replace("success-container", "error-container");
  };
  
  export const setFeedbackMessage = (message: string | undefined) => {
	Array.from(feedbackMessages).forEach((textContainer) => {
	  textContainer.innerText = !message ? "No message given" : message;
	});
  };
  
  export const setFeedbackContainer = (status: boolean) => {
	Array.from(feedbackContainers).forEach((container) => {
	  setFeedbackType(status, container);
	  alterElementClass(container, "hideFeedback", "showFeedback");
	});
  };
  
  export const removeFeedbackContainer = () => {
	Array.from(feedbackContainers).forEach((container) => {
	  alterElementClass(container, "showFeedback", "hideFeedback");
	});
  };
  
  export const editFeedback = (
	message: string | undefined,
	responseStatus: boolean
  ): void => {
	setFeedbackMessage(message);
	setFeedbackContainer(responseStatus);
	setTimeout(() => {
	  removeFeedbackContainer();
	}, 4000);
  };
  
  export const editConfirm = (text: string, eventName: string) => {
	confirmMessage.innerText = text;
	confirmYesButton.setAttribute("data-event", eventName);
  };
  
  export const setDataAction = (action: string): void => {
	switch (action) {
	  case "post":
		form.setAttribute("data-action", "post");
		break;
	  case "update":
		form.setAttribute("data-action", "update");
		break;
	  default:
	}
  };
  
  export const setNewDataDeleteId = (
	deleteButton: HTMLButtonElement,
	id: string
  ): void => {
	deleteButton.setAttribute("data-delete-id", id);
  };
  
  export const removeDataAction = (): void => {
	form.setAttribute("data-action", "");
  };
  
  export const removeDataDeleteId = (): void => {
	const deleteButtons: NodeListOf<HTMLButtonElement> =
	  document.querySelectorAll(".delete-item-button");
	for (let i = 0; i < deleteButtons.length; i++) {
	  deleteButtons[i].setAttribute("data-delete-id", "#");
	}
  };
  
  export const alterElementClass = (
	element: HTMLElement,
	currentClass: string,
	newClass: string
  ) => {
	element.classList.replace(currentClass, newClass);
  };
  
  export const getDataFromElement = (
	element: HTMLElement
  ): userCredentialObject => {
	const getStorageElement: HTMLDivElement | null =
	  element.querySelector(".data-storage");
	if (!getStorageElement)
	  throw new Error("Couldn't get object-storage from the element");
	const objectData = getStorageElement.getAttribute("data-stored-object");
	if (!objectData) throw new Error("No data-stored-object found");
	const objectDataJson: userCredentialObject = JSON.parse(objectData);
	return objectDataJson;
  };
  
  export const appendItemValuesToForm = (): void => {
	const compiledData: userCredentialObject =
	  getDataStoredObject(editItemButton);
	setDataAction("update");
	updateFormValues(compiledData);
	formDialog.showModal();
  };
  
  export const InsertDataIntoDialog = (data: userCredentialObject): void => {
	(
	  itemDialog.querySelector("#dialog-list-title") as HTMLLIElement
	).textContent = data.titleInput;
	(
	  itemDialog.querySelector("#dialog-list-username") as HTMLLIElement
	).textContent = data.usernameInput;
	(
	  itemDialog.querySelector("#dialog-list-email") as HTMLLIElement
	).textContent = data.emailInput;
	(
	  itemDialog.querySelector("#dialog-list-password") as HTMLLIElement
	).textContent = data.passwordInput;
	(
	  itemDialog.querySelector("#dialog-list-additional-data") as HTMLLIElement
	).textContent = data.additionalDataInput;
	(
	  itemDialog.querySelector("#edit-item-button") as HTMLButtonElement
	).setAttribute("data-stored-object", JSON.stringify(data));
	(
	  itemDialog.querySelector("#delete-item-button") as HTMLButtonElement
	).setAttribute("data-delete-id", data.id);
  };
  
  export const viewListContent = (delegationParent: HTMLDivElement): void => {
	const data: userCredentialObject = getDataFromElement(delegationParent);
	itemDialog.showModal();
	InsertDataIntoDialog(data);
  };
  