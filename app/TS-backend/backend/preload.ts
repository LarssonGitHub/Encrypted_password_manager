// @ts-nocheck
import { contextBridge, ipcRenderer } from "electron";

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector: string, text: string) => {
    const element = document.getElementById(selector);
    if (element) {
      element.innerText = text;
    }
  };

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(
      `${type}-version`,
          //@ts-ignore
      process.versions[type as keyof NodeJS.ProcessVersions]
    );
  }
});

// contextBridge.exposeInMainWorld("versions", {
//   node: (): string => process.versions.node,
//   chrome: (): string => process.versions.chrome,
//   electron: (): string => process.versions.electron,
// });

// //  With ipcRender, turns into a promise
// contextBridge.exposeInMainWorld("save", {
//   isString: (a: any) => ipcRenderer.invoke("isString", a),
//   generateId: () => ipcRenderer.invoke("generateId"),
// });

const processVersion = {
  node: (): string  => process.versions.node,
  chrome: (): string  => process.versions.chrome,
  electron: (): string  => process.versions.electron,
}

const backend = {
  isString: (a: any) => ipcRenderer.invoke("isString", a),
  generateId: () => ipcRenderer.invoke("generateId"),
  encryptData: (data: string, secretKey: string) => ipcRenderer.invoke("encryptData", data, secretKey),
  decryptData: (data: string, secretKey: string) => ipcRenderer.invoke("decryptData", data, secretKey),
}


const API = {
  processVersion: processVersion,
  backend: backend
}

contextBridge.exposeInMainWorld("API", API);