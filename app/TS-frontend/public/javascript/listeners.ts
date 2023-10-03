import {
	getDatabaseData,
	checkDatabaseStatus,
	createKey,
	validateKey,
	confirmRequest,
	sanitizeListEventDelegation,
	submitFormAction
} from "./handlers.js";
import {
	resetForm,
	resetConfirm,
	deleteConfirm,
} from "./logic.js";
import {
	eventErrorListener,
	sanitizeError
} from "./middleware/errorListener.js"
import {
	errorResponse,
	eventResponse
} from "../../../@types/@type-module";
import {
	setDataAction,
	appendItemValuesToForm
} from "./renderer.js";
import {
	form,
	postFormButton,
	formDialog,
	closeFormButton,
	listDataContainer,
	createKeyDialog,
	createKeyButton,
	validateKeyButton,
	validateKeyDialog,
	confirmYesButton,
	confirmNoButton,
	deleteItemButton,
	closeItemButton,
	itemDialog,
	editItemButton
} from "./renderer.js";

form.addEventListener("submit", async (event: SubmitEvent) => {
	event.preventDefault();
	const submitEvent: errorResponse | eventResponse = await eventErrorListener(() => submitFormAction(event));
	if (!submitEvent.success) sanitizeError(submitEvent.error);
})

postFormButton.addEventListener("click", () => {
	setDataAction("post");
	formDialog.showModal();
});

closeFormButton.addEventListener("click", () => {
	formDialog.close();
	resetForm();
});

closeItemButton.addEventListener("click", async () => {
	itemDialog.close();
});

listDataContainer.addEventListener("click", async (event: MouseEvent) => {
	const readyEvent: errorResponse | eventResponse = await eventErrorListener(() => sanitizeListEventDelegation(event));
	if (!readyEvent.success) {
		resetConfirm();
		sanitizeError(readyEvent.error);
	}
});

deleteItemButton.addEventListener("click", async () => {
	deleteConfirm();
});

editItemButton.addEventListener("click", async () => {
	const validateKeyEvent: errorResponse | eventResponse = await eventErrorListener(() => appendItemValuesToForm());
	if (!validateKeyEvent.success) return sanitizeError(validateKeyEvent.error);
});


createKeyButton.addEventListener("click", async () => {
	const getKeyEvent: errorResponse | eventResponse = await eventErrorListener(() => createKey());
	if (!getKeyEvent.success) return sanitizeError(getKeyEvent.error);
	const getDataEvent: errorResponse | eventResponse = await eventErrorListener(() => getDatabaseData());
	if (!getDataEvent.success) return sanitizeError(getDataEvent.error);
	createKeyDialog.close();
});

validateKeyButton.addEventListener("click", async () => {
	const validateKeyEvent: errorResponse | eventResponse = await eventErrorListener(() => validateKey());
	if (!validateKeyEvent.success) return sanitizeError(validateKeyEvent.error);
	const getData: errorResponse | eventResponse = await eventErrorListener(() => getDatabaseData());
	if (!getData.success) return sanitizeError(getData.error);
	validateKeyDialog.close();
});

confirmYesButton.addEventListener("click", async (event: MouseEvent) => {
	const requestEvent: errorResponse | eventResponse = await eventErrorListener(() => confirmRequest(event));
	resetConfirm()
	if (!requestEvent.success) return sanitizeError(requestEvent.error);
});

confirmNoButton.addEventListener("click", async () => {
	resetConfirm();
});

document.onreadystatechange = async function() {
	const checkDatabaseEvent: errorResponse | eventResponse = await eventErrorListener(() => checkDatabaseStatus());
	if (!checkDatabaseEvent.success) return sanitizeError(checkDatabaseEvent.error);
};