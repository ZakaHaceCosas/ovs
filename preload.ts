import { Inventory, Preferences } from "./src/types/types";

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    requestPreferencesJson: () => ipcRenderer.sendSync('requestPreferencesJson'),
    requestDataJson: () => ipcRenderer.sendSync('requestDataJson'),
    changeOvsSettings: (args: Preferences) => ipcRenderer.sendSync('changeOvsSettings', args),
    wipeOvs: () => ipcRenderer.sendSync('wipeOvs'),
    writeDataJson: (arg: Inventory) => ipcRenderer.sendSync('writeDataJson', arg)
});

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector: string, text: string): void => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    const versions: Record<string, string | undefined> = process.versions
    for (const type of ['chrome', 'node', 'electron']) {
        const version = versions[type]
        if (version !== undefined) {
            replaceText(`${type}-version`, version)
        }
    }
})