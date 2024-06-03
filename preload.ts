const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    requestPrefsJson: () => ipcRenderer.sendSync('requestPrefsJson'),
    requestDataJson: () => ipcRenderer.sendSync('requestDataJson'),
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