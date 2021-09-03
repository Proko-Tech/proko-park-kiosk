const {app} = require('electron');

const menu = {
    label: "App",
    submenu: [
        {
            label: "Quit",
            accelerator: "CmdOrCtrl+Q",
            click: () => {
                app.quit();
            },
        },
    ],
};

module.exports = menu;
