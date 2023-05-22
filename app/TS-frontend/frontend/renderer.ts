import {
    API,
    userCredentialsArray
} from "../../@types/@type-module";
import {
    listDataContainer,
    template,
    feedbackMessage,
    feedbackContainer,
    appendEventListeners
} from "./listeners.js";
import { viewElement, hideElement } from "./utilities.js";

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

export const appendListToArrayTemplate = (websites: userCredentialsArray | void): void => {
    if (!websites || typeof websites !== 'object') return;
    const clone = template.content.cloneNode(true) as DocumentFragment;
    const listElement = clone.getElementById("list-data-unordered-list") as HTMLUListElement;
    websites.forEach((i) => {
        let newClone = listElement.cloneNode(true) as DocumentFragment;
        newClone.querySelector(".list-id") !.textContent = i.id;
        newClone.querySelector(".list-website") !.textContent = i.websiteInput;
        newClone.querySelector(".list-username") !.textContent = i.emailInput;
        newClone.querySelector(".list-email") !.textContent = i.usernameInput;
        newClone.querySelector(".list-password") !.textContent = i.passwordInput;
        newClone.querySelector(".list-additional-data") !.textContent = i.additionalDataInput;
        (newClone.querySelector(".edit-item-button") as HTMLElement).setAttribute("data-website-id", i.id);
        (newClone.querySelector(".delete-item-button") as HTMLElement).setAttribute("data-website-id", i.id);
        listDataContainer.append(newClone);
    });
};

export const editDocumentListing = (data: userCredentialsArray) => {
    removeListData()
    appendListToArrayTemplate(data);
    appendEventListeners();
}

export const FeedbackResponseType = (error: boolean): void => {
    feedbackContainer.classList.replace("error-container", "success-container")
    if (error) feedbackContainer.classList.replace("success-container", "error-container")
}

export const editDocumentFeedback = (message: string, error: boolean): void => {
    FeedbackResponseType(error)
    feedbackMessage.innerText = message;
    viewElement(feedbackContainer)
}

export const hideFeedbackContainer = (): void => {
    hideElement(feedbackContainer)
}