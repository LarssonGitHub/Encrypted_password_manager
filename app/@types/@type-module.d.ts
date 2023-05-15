export interface searchQueryBody {
  title: string;
  desc: string;
}

export interface websiteObject {
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
  data ? : string | arrayOfWebsites | websiteObject
}

export type arrayOfWebsites = websiteObject[];

export type API = {
  processVersion: {
    node: () => string;
    chrome: () => string;
    electron: () => string;
  };
  backend: {
    getData: () => Promise < customResponse > ;
    generateId: () => Promise < string > ;
    deleteData: (id: string) => Promise < customResponse > ;
    updateData: (id: string, newData: websiteObject) => Promise < customResponse > ;
    postData: (newData: websiteObject) => Promise < customResponse > ;
    encryptData: (data: string, secretKey: string) => Promise < string > ;
    decryptData: (data: string, secretKey: string) => Promise < arrayOfWebsites > ;
  };
}