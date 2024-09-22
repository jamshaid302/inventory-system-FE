const { app, BrowserWindow } = require("electron/main");
const path = require("node:path");

function createWindow() {
  const win = new BrowserWindow({
    title: "Butt Sanatery",
    frame: true,
    icon: path.join(__dirname, "..", "build", "icon.png"),
    width: 800,
    height: 600,
    maxWidth: 1400,
    maxHeight: 1100,
    minWidth: 700,
    minHeight: 800,
    // backgroundColor: "white",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadURL(
    true
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
