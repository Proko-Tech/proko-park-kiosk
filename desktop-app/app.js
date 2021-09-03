const {app, Menu, ipcMain, shell, BrowserWindow, systemPreferences} = require('electron');
const path = require('path');
const url = require('url');
const ejse = require('ejs-electron');

require('dotenv').config();

const appMenu = require('./src/menu/app_menu');
const devMenu = require('./src/menu/dev_menu');

const setApplicationMenu = () => {
    const menus = [appMenu];
    if (process.env.NODE_ENV !== "production") {
        menus.push(devMenu);
    }
    Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};

// We can communicate with our window (the renderer process) via messages.
const initIpc = () => {
    ipcMain.on("need-app-path", (event, arg) => {
        event.reply("app-path", app.getAppPath());
    });
    ipcMain.on("open-external-link", (event, href) => {
        shell.openExternal(href);
    });

};

app.on('ready', async () => {
    setApplicationMenu();
    initIpc();
    const mainWindow = new BrowserWindow();

    await mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "src/screen/index.ejs"),
            protocol: "file:",
            slashes: true,
        }),
    );

    if (process.env.name === "development") {
        mainWindow.openDevTools();
    }
});
