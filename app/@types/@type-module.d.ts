export interface searchQueryBody {
  title: string;
  desc: string;
}

export interface userCredentialObject {
  id: string;
  websiteInput: string;
  emailInput: string;
  usernameInput: string;
  passwordInput: string;
  additionalDataInput: string;
}

interface romanType {
  [key: number]: string;
}

export interface customResponse {
  ok: true;
  message: string;
  data: userCredentialsArray | [];
  databaseEmpty?: boolean;
}

export interface errorResponse {
  ok: false;
  error: unknown;
}

export type userCredentialsArray = userCredentialObject[];

export type API = {
  processVersion: {
    node: () => string;
    chrome: () => string;
    electron: () => string;
  };
  backend: {
    generateId: () => Promise<any>;
    getData: (key: string) => Promise<customResponse>;
    deleteData: (id: string | null, key: string) => Promise<customResponse>;
    updateData: (putData: userCredentialObject, key: string) => Promise<customResponse>;
    postData: (postData: userCredentialObject, key: string) => Promise<customResponse>;
    encryptData: (data: string, secretKey: string) => Promise < customResponse >;
    decryptData: (data: string, secretKey: string) => Promise < customResponse >;
    checkDatabase: () =>  Promise < customResponse >;
  };
}