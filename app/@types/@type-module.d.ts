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

export interface customResponse {
  success: boolean;
  message: string;
  data ? : userCredentialsArray 
}

// Add more keys to the cause as needed
export interface customErrorCause {
  data?: any;
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
    deleteData: (id: string, key: string) => Promise<customResponse>;
    updateData: (putData: userCredentialObject, key: string) => Promise<customResponse>;
    postData: (postData: userCredentialObject, key: string) => Promise<customResponse>;
    encryptData: (data: string, secretKey: string) => Promise < customResponse >;
    decryptData: (data: string, secretKey: string) => Promise < customResponse >;
  };
}