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
  console.log(__dirname, "bridge.js");
  // Create the browser window.
  const mainWindow = new BrowserWindow({
      height: 600,
      webPreferences: {
          contextIsolation: true,
          preload: path.join(__dirname, "bridge.js"),
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
  ipcMain.handle("getData", async (meta, key: string) => getData(key));

  ipcMain.handle("deleteData", async (meta, objectId: string, key: string) => deleteData(objectId, key));

  ipcMain.handle("updateData", (meta, id: string, newData: websiteObject, key: string) => updateData(id, newData, key));

  ipcMain.handle("postData", async (meta, newData: websiteObject, key: string) => postData(newData, key));

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
