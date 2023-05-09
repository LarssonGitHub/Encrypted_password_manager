// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
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

const { contextBridge, ipcRenderer } = require("electron");

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
  node: (): string => process.versions.node,
  chrome: (): string => process.versions.chrome,
  electron: (): string => process.versions.electron,
}

const testFuncs = {
  isString: (a: any) => ipcRenderer.invoke("isString", a),
  generateId: () => ipcRenderer.invoke("generateId"),
}

export const API = {
  processVersion: processVersion,
  testFuncs:testFuncs

}

contextBridge.exposeInMainWorld("API", API);
