import {
  websiteObject
} from "../../@types/@type-module"
import {
  app,
  BrowserWindow,
  ipcMain
} from "electron";
import * as path from "path";
import {
  generateId,
  encryptData,
  decryptData,
} from "./utility/utility";
import {
  getData,
  updateData,
  postData,
  deleteData
} from "./dataHandlers";

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

  mainWindow.webContents.openDevTools();
}

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

  app.on("activate", function() {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
      app.quit();
  }
});
