"use strict";
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
contextBridge.exposeInMainWorld("versions", {
    node: function () { return process.versions.node; },
    chrome: function () { return process.versions.chrome; },
    electron: function () { return process.versions.electron; }
});
//  With ipcRender, turns into a promise
contextBridge.exposeInMainWorld("save", {
    isString: function (a) { return ipcRenderer.invoke("isString", a); },
    generateId: function () { return ipcRenderer.invoke("generateId"); }
});
