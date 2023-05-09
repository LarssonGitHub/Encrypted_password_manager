"use strict";
exports.__esModule = true;
exports.API = void 0;
// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener("DOMContentLoaded", function () {
    var replaceText = function (selector, text) {
        var element = document.getElementById(selector);
        if (element) {
            element.innerText = text;
        }
    };
    for (var _i = 0, _a = ["chrome", "node", "electron"]; _i < _a.length; _i++) {
        var type = _a[_i];
        replaceText("".concat(type, "-version"), 
        //@ts-ignore
        process.versions[type]);
    }
});
var _a = require("electron"), contextBridge = _a.contextBridge, ipcRenderer = _a.ipcRenderer;
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
var processVersion = {
    node: function () { return process.versions.node; },
    chrome: function () { return process.versions.chrome; },
    electron: function () { return process.versions.electron; }
};
var backend = {
    isString: function (a) { return ipcRenderer.invoke("isString", a); },
    generateId: function () { return ipcRenderer.invoke("generateId"); }
};
exports.API = {
    processVersion: processVersion,
    backend: backend
};
contextBridge.exposeInMainWorld("API", exports.API);
