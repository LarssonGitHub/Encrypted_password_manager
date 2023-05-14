interface searchQueryBody {
  title: string;
  desc: string;
}

interface websiteObject {
  id: string;
  websiteInput: string;
  emailInput: string;
  usernameInput: string;
  passwordInput: string;
  additionalDataInput: string;
}

type arrayOfWebsites = websiteObject[];

type API = {
  processVersion: {
    node: () => string;
    chrome: () => string;
    electron: () => string;
  };
  backend: {
    getData: () => Promise<arrayOfWebsites>;
    generateId: () => Promise<string>;
    deleteData: (id: string) => Promise<arrayOfWebsites>;
    updateData: (id: string, newData: websiteObject) => Promise<arrayOfWebsites>;
    postData: (newData: websiteObject) => Promise<arrayOfWebsites>;
    encryptData: (data: string, secretKey: string) => Promise<string>;
    decryptData: (data: string, secretKey: string) => Promise<arrayOfWebsites>;
  };
}

export { arrayOfWebsites, API, websiteObject, searchQueryBody };