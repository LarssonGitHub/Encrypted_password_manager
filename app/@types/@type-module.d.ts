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

type API = {
  processVersion: {
    node: () => string;
    chrome: () => string;
    electron: () => string;
  };
  backend: {
    isString: (a: any) => Promise<boolean>;
    generateId: () => Promise<string>;
    encryptData: (data: string, secretKey: string) => Promise<string>;
    decryptData: (data: string, secretKey: string) => Promise<string>;
  };
}

type arrayOfWebsites = websiteObject[];

export { arrayOfWebsites, API, websiteObject, searchQueryBody };