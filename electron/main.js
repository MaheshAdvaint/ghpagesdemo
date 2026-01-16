const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

const startUrl =
  process.env.ELECTRON_START_URL ||
  path.join(__dirname, "../build/index.html");

mainWindow.loadFile(startUrl);

}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
