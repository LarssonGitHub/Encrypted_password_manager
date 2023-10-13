import {
	userCredentialObject,
	backendResponse,
	errorResponse,
  } from "../../../@types/@type-module";
  import {
	getAndValidateId,
	resetForm,
	getKey,
	getAndValidateKeys,
	getFormValues,
	getDataEvent,
	getDataAction,
	postConfirm,
	updateConfirm,
  } from "./logic.js";
  import { backendErrorListener } from "./middleware/errorListener.js";
  import {
	updateList,
	editFeedback,
	removeDataAction,
	validateKeyDialog,
	createKeyDialog,
	formDialog,
	itemDialog,
	viewListContent,
  } from "./renderer.js";
  
  // The key for decryption/encryption
  // Must only be stored as a local variable for safety
  let secretKey: string;
  
  export const confirmRequest = async (event: MouseEvent) => {
	const target: HTMLButtonElement | null = event.target as HTMLButtonElement;
	if (!target) throw new Error("Couldn't find a target");
	const handlerEvent: string = getDataEvent(target);
	switch (handlerEvent) {
	  case "postDatabaseData":
		await postDatabaseData();
		break;
	  case "UpdateDatabaseData":
		await UpdateDatabaseData();
		break;
	  case "deleteDatabaseData":
		await deleteDatabaseData();
		break;
	  default:
		throw new Error("Couldn't match an event type to a handler");
	}
  };
  
  export const sanitizeListEventDelegation = (event: MouseEvent): void => {
	const target: HTMLElement = event.target as HTMLElement;
	const delegationParent: HTMLDivElement | null = target.closest(
	  ".template-list-component"
	);
	if (!delegationParent) return;
	const revealContent: boolean | null = Boolean(
	  delegationParent.closest(".list-content-hidden") &&
		target.closest(".padlock")
	);
	if (revealContent) viewListContent(delegationParent);
	return;
  };
  
  export const submitFormAction = (event: SubmitEvent) => {
	const target: HTMLFormElement | null = event.target as HTMLFormElement;
	if (!target) throw new Error("Couldn't find a target");
	const action: string = getDataAction(target);
	switch (action) {
	  case "post":
		postConfirm();
		break;
	  case "update":
		updateConfirm();
		break;
	  default:
		throw new Error("Couldn't match the form to an action");
	}
  };
  
  export const postDatabaseData = async (): Promise<void> => {
	const formData: userCredentialObject = getFormValues();
	if (Object.values(formData).includes(""))
	  throw new Error("Please, do not leave any fields empty");
	const postRequest: errorResponse | backendResponse =
	  await backendErrorListener(() =>
		window.API.backend.postData(formData, secretKey)
	  );
	if (!postRequest.success) throw postRequest.error;
	formDialog.close();
	resetForm();
	removeDataAction();
	editFeedback(postRequest.message, false);
	updateList(postRequest.data);
  };
  
  export const getDatabaseData = async (): Promise<void | string> => {
	const getRequest: errorResponse | backendResponse =
	  await backendErrorListener(() => window.API.backend.getData(secretKey));
	if (!getRequest.success) throw getRequest.error;
	// editFeedback(getRequest.message, false)
	updateList(getRequest.data);
  };
  
  export const deleteDatabaseData = async (): Promise<void> => {
	const id: string = getAndValidateId();
	const deleteRequest: errorResponse | backendResponse =
	  await backendErrorListener(() =>
		window.API.backend.deleteData(id, secretKey)
	  );
	if (!deleteRequest.success) throw deleteRequest.error;
	itemDialog.close();
	editFeedback(deleteRequest.message, false);
	updateList(deleteRequest.data);
  };
  
  export const UpdateDatabaseData = async (): Promise<void> => {
	const formData: userCredentialObject = getFormValues();
	if (Object.values(formData).includes(""))
	  throw new Error("Please, do not leave any fields empty");
	const updateRequest: errorResponse | backendResponse =
	  await backendErrorListener(() =>
		window.API.backend.updateData(formData, secretKey)
	  );
	if (!updateRequest.success) throw updateRequest.error;
	formDialog.close();
	itemDialog.close();
	resetForm();
	removeDataAction();
	editFeedback(updateRequest.message, false);
	updateList(updateRequest.data);
  };
  
  export const createKey = (): void => {
	const key: string = getAndValidateKeys();
	if (!key)
	  throw new Error(
		"You need to submit your key before we can start the encryption!"
	  );
	secretKey = key;
  };
  
  export const validateKey = async () => {
	const key: string = getKey();
	if (!key)
	  throw new Error(
		"You need to submit your key before we can decrypt your records!"
	  );
	secretKey = key;
  };
  
  export const checkDatabaseStatus = async (): Promise<void> => {
	const getStatus: errorResponse | backendResponse = await backendErrorListener(
	  () => window.API.backend.checkDatabase()
	);
	if (!getStatus.success) throw getStatus.error;
	if (!getStatus.databaseEmpty) return validateKeyDialog.showModal();
	return createKeyDialog.showModal();
  };
  