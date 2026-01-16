const { app, BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadURL(
    app.isPackaged
      ? `file://${__dirname}/index.html`
      : "http://localhost:3000"
  );
}

app.whenReady().then(createWindow);
