import { userCredentialObject } from "../../@types/@type-module";
import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import { generateId, encryptData, decryptData } from "./logic.js";
import {
  getData,
  updateData,
  postData,
  deleteData,
  checkDatabase,
  initiateCredentials
} from "./handlers";

function createWindow() {
  const mainWindow = new BrowserWindow({
    height: 700,
    icon: path.join(__dirname, "../public/assets/favicons/favicon.ico"),
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "bridge.js"),
      nodeIntegration: false,
    },
    width: 900,
  });
  mainWindow.loadFile(path.join(__dirname, "../public/index.html"));
  // mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  ipcMain.handle("generateId", () => generateId());
  ipcMain.handle("checkDatabase", async () => checkDatabase());
  ipcMain.handle("encryptData", (meta, data: string, secretKey: string) =>
    encryptData(data, secretKey)
  );
  ipcMain.handle("decryptData", (meta, data: string, secretKey: string) =>
    decryptData(data, secretKey)
  );
  ipcMain.handle("setNewKey", async (meta, key: string) =>
    initiateCredentials(key)
  );
  ipcMain.handle("getData", async (meta) => getData());
  ipcMain.handle("deleteData", async (meta, objectId: string) =>
    deleteData(objectId)
  );
  ipcMain.handle(
    "updateData",
    (meta, data: userCredentialObject) => updateData(data)
  );
  ipcMain.handle(
    "postData",
    async (meta, data: userCredentialObject) => postData(data)
  );
  createWindow();
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
