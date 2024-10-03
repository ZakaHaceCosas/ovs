import * as Electron from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import { Inventory, Preferences } from './src/types/types';

let win: Electron.BrowserWindow | null = null;

function createWindow(): void {
    win = new Electron.BrowserWindow({
        width: 1080,
        height: 720,
        autoHideMenuBar: false,
        resizable: true,
        center: true,
        frame: true,
        hasShadow: true,
        fullscreenable: false,
        transparent: false,
        icon: path.join(__dirname, 'public/fav.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        }
    });

    win.loadFile(path.join(__dirname, 'src/index.html'));
    win.on('closed', () => {
        win = null;
    });
}

const defaultPreferences: Preferences = {
    theme: "dark",
    lang: "english",
    appName: "OVS 3",
    startup: false,
    encrypt: false
}

const defaultData: Inventory = []

Electron.app.on('ready', () => {
    createWindow();

    Electron.app.on('activate', () => {
        if (Electron.BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });

    const preferencesPath: string = path.join(Electron.app.getPath('userData'), 'preferencesPath.json');

    fs.access(preferencesPath, fs.constants.F_OK, (err: NodeJS.ErrnoException | null) => {
        if (err) {
            fs.writeFile(preferencesPath, JSON.stringify(defaultPreferences), (err: NodeJS.ErrnoException | null) => {
                if (err) {
                    console.error('Error writing preferences.json:', err);
                }
            });
        } else {
            const prefData: string = fs.readFileSync(preferencesPath, 'utf8');
            const jsonData: any = JSON.parse(prefData);

            if (win && !win.isDestroyed()) {
                win.webContents.send('config-json', jsonData);
            }
        }
    });

    const dataPath: string = path.join(Electron.app.getPath('userData'), 'data.json');

    fs.access(dataPath, fs.constants.F_OK, (err: NodeJS.ErrnoException | null) => {
        if (err) {
            fs.writeFile(dataPath, JSON.stringify(defaultData), (err: NodeJS.ErrnoException | null) => {
                if (err) {
                    console.error('Error writing data.json:', err);
                }
            });
        } else {
            const dataData: string = fs.readFileSync(dataPath, 'utf8');
            const jsonData: any = JSON.parse(dataData);

            if (win && !win.isDestroyed()) {
                win.webContents.send('data-json', jsonData);
            }
        }
    });
});

Electron.ipcMain.on('requestPreferencesJson', (event) => {
    try {
        const preferencesPath = path.join(Electron.app.getPath('userData'), 'preferences.json');
        const jsonData = fs.readFileSync(preferencesPath, 'utf8');
        event.returnValue = jsonData;
    } catch (e) {
        throw e
    }
});

Electron.ipcMain.on('requestDataJson', (event) => {
    try {
        const dataPath = path.join(Electron.app.getPath('userData'), 'data.json');
        const jsonData = fs.readFileSync(dataPath, 'utf8');
        event.returnValue = jsonData;
    } catch (e) {
        console.error('Error reading data:', e);
        event.returnValue = 'Failed to read data';
    }
});

Electron.ipcMain.on('writeDataJson', (event, args) => {
    try {
        const dataPath = path.join(Electron.app.getPath('userData'), 'data.json');
        const newData: Inventory = args;

        fs.writeFileSync(dataPath, JSON.stringify(newData, null, 2), 'utf-8');

        event.returnValue = 0;
    } catch (e) {
        console.error('Error writing data:', e);
        event.returnValue = 1;
    }
});

Electron.ipcMain.on('wipeOvs', (event) => {
    try {
        const preferencesPath = path.join(Electron.app.getPath('userData'), 'preferences.json');
        fs.writeFileSync(preferencesPath, JSON.stringify(defaultPreferences), 'utf-8')
        const dataPath = path.join(Electron.app.getPath('userData'), 'data.json');
        fs.writeFileSync(dataPath, JSON.stringify(defaultData), 'utf-8')
        event.returnValue = 0
    } catch (e) {
        console.error('Error wiping app:', e);
        event.returnValue = 1;
    }
})

Electron.ipcMain.on('changeOvsSettings', (event, args) => {
    try {
        const preferencesPath = path.join(Electron.app.getPath('userData'), 'preferences.json');
        const preferences: Preferences = JSON.parse(fs.readFileSync(preferencesPath, { encoding: "utf-8" }));

        preferences.lang = args.lang || "english";
        // preferences.startup = args.startup || false
        // preferences.encrypt = args.encrypt || false;
        preferences.appName = args.appName || "OVS 3";
        preferences.theme = args.theme || 'dark';

        fs.writeFileSync(preferencesPath, JSON.stringify(preferences, null, 2), 'utf-8');

        event.returnValue = 0;
    } catch (e) {
        console.error('Error changing theme:', e);
        event.returnValue = 1;
    }
});

Electron.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        Electron.app.quit();
    }
});
