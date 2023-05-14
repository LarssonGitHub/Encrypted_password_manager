import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import {
  generateId,
  encryptData,
  decryptData,
  getData,
  deleteData,
  updateData,
  postData
} from "./utility/utility";
import { websiteObject } from "../../@types/@type-module"

function createWindow() {
  console.log(__dirname, "preload.js");
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
    },
    width: 800,
  });


  mainWindow.loadFile(path.join(__dirname, "../index.html"));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  ipcMain.handle("generateId", () => generateId());

  ipcMain.handle("encryptData", (meta, data: string, secretKey: string) =>
    encryptData(data, secretKey)
  );
  ipcMain.handle("decryptData", (meta, data: string, secretKey: string) =>
  decryptData(data, secretKey)
);
  ipcMain.handle("getData", () => getData());

  ipcMain.handle("deleteData", (meta, id: string) => deleteData(id));

  ipcMain.handle("updateData", (meta, id: string, newData: websiteObject) => updateData(id, newData));

  ipcMain.handle("postData", (meta, newData: websiteObject) => postData(newData));
  
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
