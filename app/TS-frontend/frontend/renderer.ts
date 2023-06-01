import {
    API,
    userCredentialsArray
} from "../../@types/@type-module";
import {
    listDataContainer,
    template,
    feedbackMessage,
    feedbackContainer,
    confirmMessage,
    confirmYesButton
} from "./listeners.js";
import {
    viewElement,
    hideElement
} from "./utilities.js";

console.log(`This app is using Chrome (v${window.API.processVersion.chrome()}), Node.js (v${window.API.processVersion.node()}), and Electron (v${window.API.processVersion.electron()})`);

declare global {
    interface Window {
        API: API;
    }
}

export const removeListData = () => {
    while (listDataContainer.firstChild) {
        listDataContainer.removeChild(listDataContainer.firstChild);
    }
}

export const appendListToArrayTemplate = (userCredentials: userCredentialsArray | void): void => {
    if (!userCredentials || typeof userCredentials !== 'object') return;
    const clone = template.content.cloneNode(true) as DocumentFragment;
    const listElement = clone.getElementById("list-data-unordered-list") as HTMLUListElement;
    userCredentials.forEach((credential) => {
        let newClone = listElement.cloneNode(true) as DocumentFragment;
        // Used to easily grab the values when making a put request
        newClone.querySelector(".list-id") !.textContent = credential.id;
        newClone.querySelector(".list-website") !.textContent = credential.websiteInput;
        newClone.querySelector(".list-username") !.textContent = credential.emailInput;
        newClone.querySelector(".list-email") !.textContent = credential.usernameInput;
        newClone.querySelector(".list-password") !.textContent = credential.passwordInput;
        newClone.querySelector(".list-additional-data") !.textContent = credential.additionalDataInput;
        // Used to easily grab the values when making a put request
        (newClone.querySelector(".edit-item-button") as HTMLElement).setAttribute("data-stored-object", JSON.stringify(credential));
        (newClone.querySelector(".delete-item-button") as HTMLElement).setAttribute("data-delete-validation-id", credential.id);
        listDataContainer.append(newClone);
    });

};

export const updateList = (data: userCredentialsArray) => {
    removeListData()
    appendListToArrayTemplate(data);
}

export const FeedbackResponseType = (error: boolean): void => {
    feedbackContainer.classList.replace("error-container", "success-container")
    if (error) feedbackContainer.classList.replace("success-container", "error-container")
}

export const editFeedback = (message: string, error: boolean): void => {
    FeedbackResponseType(error)
    feedbackMessage.innerText = message === undefined ? "No message given" : message;
    viewElement(feedbackContainer)
}

export const hideFeedbackContainer = (): void => {
    hideElement(feedbackContainer)
}

export const editDocumentConfirm = (text: string, eventName: string) => {
    confirmMessage.innerText = text;
    confirmYesButton.setAttribute("data-event", eventName);
}