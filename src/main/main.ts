import { app, BrowserWindow } from 'electron';
import path from 'path';
import { App } from '@main/bootstrap/App';

const isDevelopment = Boolean(MAIN_WINDOW_VITE_DEV_SERVER_URL);
const bootstrap = new App();

/**
 * Creates a new window for the application.
 */
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 250,
    show: isDevelopment,
    autoHideMenuBar: !isDevelopment,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      sandbox: false,
    },
  });

  if (isDevelopment) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  bootstrap.init(mainWindow);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // Stop duplicate windows on macOS
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

if (!isDevelopment) {
  app.dock.hide();
}
