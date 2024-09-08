const { contextBridge, ipcRenderer } = require('electron');

interface OvsSettingsArgs {
    lang?: string;
    appname?: string;
    theme?: string;
    startup?: false;
    encrypt?: false;
}

contextBridge.exposeInMainWorld('electron', {
    requestPrefsJson: () => ipcRenderer.sendSync('requestPrefsJson'),
    requestDataJson: () => ipcRenderer.sendSync('requestDataJson'),
    changeOvsSettings: (args: OvsSettingsArgs) => ipcRenderer.sendSync('changeOvsSettings', args),
    wipeOvs: () => ipcRenderer.sendSync('wipeOvs')
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