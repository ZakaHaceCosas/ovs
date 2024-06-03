import * as Electron from 'electron';
import * as path from 'path';
import * as fs from 'fs';

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
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.loadFile(path.join(__dirname, 'src/index.html'));
    win.on('closed', () => {
        win = null;
    });
}

Electron.app.on('ready', () => {
    createWindow();

    Electron.app.on('activate', () => {
        if (Electron.BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });

    const prefsPath: string = path.join(Electron.app.getPath('userData'), 'prefs.json');

    fs.access(prefsPath, fs.constants.F_OK, (err: NodeJS.ErrnoException | null) => {
        if (err) {
            fs.writeFile(prefsPath, '{"theme":"dark","lang":"english","appname":"OVS 3","startup":false,"encrypt":false}', (err: NodeJS.ErrnoException | null) => {
                if (err) {
                    console.error('Error writing prefs.json:', err);
                }
            });
        } else {
            const prefData: string = fs.readFileSync(prefsPath, 'utf8');
            const jsonData: any = JSON.parse(prefData);

            if (win && !win.isDestroyed()) {
                win.webContents.send('config-json', jsonData);
            }
        }
    });

    const dataPath: string = path.join(Electron.app.getPath('userData'), 'data.json');

    fs.access(dataPath, fs.constants.F_OK, (err: NodeJS.ErrnoException | null) => {
        if (err) {
            fs.writeFile(dataPath, '{"inventory": []}', (err: NodeJS.ErrnoException | null) => {
                if (err) {
                    console.error('Error writing data.json:', err);
                }
            });
        } else {
            const dataData: string = fs.readFileSync(dataPath, 'utf8');
            const jsondData: any = JSON.parse(dataData);

            if (win && !win.isDestroyed()) {
                win.webContents.send('data-json', jsondData);
            }
        }
    });
});

Electron.ipcMain.on('requestPrefsJson', (event) => {
    const prefsPath = path.join(Electron.app.getPath('userData'), 'prefs.json');
    const jsonData = fs.readFileSync(prefsPath, 'utf8');
    event.returnValue = jsonData;
});

Electron.ipcMain.on('requestDataJson', (event) => {
    const dataPath = path.join(Electron.app.getPath('userData'), 'data.json');
    const jsondData = fs.readFileSync(dataPath, 'utf8');
    event.returnValue = jsondData;
});

Electron.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        Electron.app.quit();
    }
});
