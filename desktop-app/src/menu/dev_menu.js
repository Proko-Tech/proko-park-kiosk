const {BrowserWindow} = require('electron');

const menu = {
    label: "Development",
    submenu: [
        {
            label: "Reload",
            accelerator: "CmdOrCtrl+R",
            click: () => {
                BrowserWindow.getFocusedWindow().webContents.reloadIgnoringCache();
            },
        },
        {
            label: "Toggle DevTools",
            accelerator: "Alt+CmdOrCtrl+I",
            click: () => {
                BrowserWindow.getFocusedWindow().toggleDevTools();
            },
        },
    ],
};

module.exports=menu;
