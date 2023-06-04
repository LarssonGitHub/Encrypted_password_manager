import {
    API,
    userCredentialsArray
} from "../../@types/@type-module";
import {
    listDataContainer,
    template,
    feedbackMessage,
    confirmMessage,
    confirmYesButton,
    feedbackDialog
} from "./listeners.js";
import {
    sortArrayAfterLetter
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

export const InsertDataIntoTemplate = (data: userCredentialsArray | void): void => {
    if (!data || !Array.isArray(data)) throw new Error("Couldn't insert data into document");
    const sortedData: userCredentialsArray = sortArrayAfterLetter(data)
    const clone = template.content.cloneNode(true) as DocumentFragment;
    const listElement = clone.querySelector('[data-list-component]') as HTMLUListElement;
    sortedData.forEach((key) => {
        let insertedCloneText = listElement.cloneNode(true) as DocumentFragment;
        // TODO, update once HTML has been finalized  
        insertedCloneText.querySelector(".list-id") !.textContent = key.id;
        insertedCloneText.querySelector(".list-website") !.textContent = key.websiteInput;
        insertedCloneText.querySelector(".list-username") !.textContent = key.emailInput;
        insertedCloneText.querySelector(".list-email") !.textContent = key.usernameInput;
        insertedCloneText.querySelector(".list-password") !.textContent = key.passwordInput;
        insertedCloneText.querySelector(".list-additional-data") !.textContent = key.additionalDataInput;
        (insertedCloneText.querySelector(".edit-item-button") as HTMLElement).setAttribute("data-stored-object", JSON.stringify(key));
        (insertedCloneText.querySelector(".delete-item-button") as HTMLElement).setAttribute("data-delete-validation-id", key.id);
        listDataContainer.append(insertedCloneText);
    });

};

export const updateList = (data: userCredentialsArray) => {
    removeListData()
    InsertDataIntoTemplate(data);
}

export const FeedbackResponseType = (responseStatus: boolean): void => {
    feedbackDialog.classList.replace("error-container", "success-container")
    if (responseStatus) feedbackDialog.classList.replace("success-container", "error-container")
}

export const editFeedback = (message: string, responseStatus: boolean): void => {
    FeedbackResponseType(responseStatus)
    feedbackMessage.innerText = message === undefined ? "No message given" : message;
    feedbackDialog.show()
}

export const hideFeedbackContainer = (element: HTMLDialogElement): void => {
    element.close()
}

export const editDocumentConfirm = (text: string, eventName: string) => {
    confirmMessage.innerText = text;
    confirmYesButton.setAttribute("data-event", eventName);
}