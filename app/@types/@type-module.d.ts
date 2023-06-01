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

export type API = {
  processVersion: {
    node: () => string;
    chrome: () => string;
    electron: () => string;
  };
  backend: {
    getData: (key: string) => Promise<backendResponse>;
    deleteData: (id: string | null, key: string) => Promise<backendResponse>;
    updateData: (putData: userCredentialObject, key: string) => Promise<backendResponse>;
    postData: (postData: userCredentialObject, key: string) => Promise<backendResponse>;
    checkDatabase: () =>  Promise < backendResponse >;
  };
}