export interface searchQueryBody {
  title: string;
  desc: string;
}

export interface userCredentialObject {
  id: string;
  titleInput: string;
  emailInput: string;
  usernameInput: string;
  passwordInput: string;
  additionalDataInput: string;
}

interface romanType {
  [key: number]: string;
}

export interface backendResponse {
  success: true;
  message: string;
  data: userCredentialsArray | [];
  databaseEmpty?: boolean;
}
export interface errorResponse {
  success: false;
  error: unknown;
}

export interface eventResponse {
  success: true;
}

export type userCredentialsArray = userCredentialObject[];

export interface credentialsHandlers {
  setKey: (key: string) => void;
  getKey: () => string; 
}

export type API = {
  processVersion: {
    node: () => string;
    chrome: () => string;
    electron: () => string;
  };
  backend: {
    getData: () => Promise<backendResponse>;
    deleteData: (id: string | null) => Promise<backendResponse>;
    updateData: (putData: userCredentialObject) => Promise<backendResponse>;
    postData: (postData: userCredentialObject) => Promise<backendResponse>;
    checkDatabase: () =>  Promise < backendResponse >;
    setNewKey: (key: string) => Promise<backendResponse>;
  };
}