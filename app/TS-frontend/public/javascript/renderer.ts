import {
    API,
    userCredentialsArray
} from "../../../@types/@type-module";
import {
    sortArrayAfterLetter
} from "./logic.js";

console.log(`This app is using Chrome (v${window.API.processVersion.chrome()}), Node.js (v${window.API.processVersion.node()}), and Electron (v${window.API.processVersion.electron()})`);

declare global {
    interface Window {
        API: API;
    }
}

// These are static tags and are always present in the DOM
// Dynamic tags are handled and validated in their respective function
export const listDataContainer = document.getElementById("list-data-container") as HTMLDivElement;
export const template = document.getElementById("template-list") as HTMLTemplateElement;
export const feedbackMessages = document.querySelectorAll(".feedback-message") as NodeListOf < HTMLElement > ;
export const form = document.getElementById("form") as HTMLFormElement;
export const postFormButton = document.getElementById("post-form-button") as HTMLButtonElement;
export const closeFormButton = document.getElementById("close-form-button") as HTMLButtonElement;
export const createKeyButton = document.getElementById("create-key-button") as HTMLButtonElement;
export const validateKeyButton = document.getElementById("validate-key-button") as HTMLButtonElement;
export const confirmMessage = document.getElementById("confirm-message") as HTMLParagraphElement;
export const confirmYesButton = document.getElementById("confirm-yes-button") as HTMLButtonElement;
export const confirmNoButton = document.getElementById("confirm-no-button") as HTMLButtonElement;
export const validateKeyInput = document.getElementById("validate-key-input") as HTMLInputElement;
export const createKeyInput = document.getElementById("create-key-input") as HTMLInputElement;
export const repeatKeyInput = document.getElementById("repeat-key-input") as HTMLInputElement;
export const feedbackContainers = document.querySelectorAll(".feedback-container") as NodeListOf < HTMLElement > ;
export const createKeyDialog = document.getElementById("create-key-dialog") as HTMLDialogElement;
export const validateKeyDialog = document.getElementById("validate-key-dialog") as HTMLDialogElement;
export const formDialog = document.getElementById("form-dialog") as HTMLDialogElement;
export const confirmDialog = document.getElementById("confirm-dialog") as HTMLDialogElement;

export const InsertDataIntoTemplate = (data: userCredentialsArray | void): void => {
    if (!data || !Array.isArray(data)) throw new Error("Couldn't insert data into the document");
    const sortedData: userCredentialsArray = sortArrayAfterLetter(data);
    const clone = template.content.cloneNode(true) as DocumentFragment;
    const listElement = clone.querySelector('[data-list-component]') as HTMLUListElement;
    sortedData.forEach((key) => {
        let insertedCloneText = listElement.cloneNode(true) as DocumentFragment;
        (insertedCloneText.querySelector(".list-id") as HTMLLIElement).textContent = key.id;
        (insertedCloneText.querySelector(".list-title") as HTMLLIElement).textContent = key.titleInput;
        (insertedCloneText.querySelector(".list-username") as HTMLLIElement).textContent = key.emailInput;
        (insertedCloneText.querySelector(".list-email") as HTMLLIElement).textContent = key.usernameInput;
        (insertedCloneText.querySelector(".list-password") as HTMLLIElement).textContent = key.passwordInput;
        (insertedCloneText.querySelector(".list-additional-data") as HTMLLIElement).textContent = key.additionalDataInput;
        (insertedCloneText.querySelector(".edit-item-button") as HTMLButtonElement).setAttribute("data-stored-object", JSON.stringify(key));
        (insertedCloneText.querySelector(".delete-item-button") as HTMLButtonElement).setAttribute("data-delete-validation-id", key.id);
        listDataContainer.append(insertedCloneText);
    });
};

export const removeListData = () => {
    while (listDataContainer.firstChild) {
        listDataContainer.removeChild(listDataContainer.firstChild);
    }
}

export const updateList = (data: userCredentialsArray) => {
    removeListData();
    InsertDataIntoTemplate(data);
}

export const setFeedbackType = (responseStatus: boolean, element: HTMLElement): void => {
    element.classList.replace("error-container", "success-container");
    if (responseStatus) element.classList.replace("success-container", "error-container");
}

export const setFeedbackMessage = (message: string | undefined) => {
    Array.from(feedbackMessages).forEach((textContainer) => {
        textContainer.innerText = !message ? "No message given" : message;
    });
}

export const setFeedbackContainer = (status: boolean) => {
    Array.from(feedbackContainers).forEach((container) => {
        setFeedbackType(status, container);
        alterElementClass(container, "hideFeedback", "showFeedback");
    });
}

export const removeFeedbackContainer = () => {
    Array.from(feedbackContainers).forEach((container) => {
        alterElementClass(container, "showFeedback", "hideFeedback");
    });
}

export const editFeedback = (message: string | undefined, responseStatus: boolean): void => {
    setFeedbackMessage(message);
    setFeedbackContainer(responseStatus);
    setTimeout(() => {
        removeFeedbackContainer()
    }, 4000);
}

export const editConfirm = (text: string, eventName: string) => {
    confirmMessage.innerText = text;
    confirmYesButton.setAttribute("data-event", eventName);
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
    }
}

export const setNewDataDeleteId = (deleteButton: HTMLButtonElement, id: string): void => {
    deleteButton.setAttribute("data-delete-id", id);
}

export const removeDataAction = (): void => {
    form.setAttribute("data-action", "");
}

export const removeDataDeleteId = (): void => {
    const deleteButtons: NodeListOf < HTMLButtonElement > = document.querySelectorAll(".delete-item-button")
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].setAttribute("data-delete-id", "#");
    }
}

export const alterElementClass = (element: HTMLElement, currentClass: string, newClass: string) => {
    element.classList.replace(currentClass, newClass);
}

export const viewListContent = (delegationParent: HTMLDivElement): void => {
    const removePadlock: HTMLDivElement | null = delegationParent.querySelector('.padlock')
    if (!removePadlock) throw new Error("Couldn't modify content");
    removePadlock.remove();
    const removeBlurEffect: HTMLDivElement | null = delegationParent.querySelector('.blurred-list-content');
    if (!removeBlurEffect) throw new Error("Couldn't modify content");
    removeBlurEffect.classList.remove("blurred-list-content");
    delegationParent.classList.remove("list-content-hidden");
}