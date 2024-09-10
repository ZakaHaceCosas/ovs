import { Preferences } from '../types/types';

window.addEventListener("DOMContentLoaded", () => {
    try {
        const prefs: Preferences = JSON.parse(window.electron.requestPrefsJson());

        console.log(prefs);

        const appName = prefs.appname
        const appTheme = prefs.theme || "dark";

        const appNameDisplayer = document.getElementById('appNameHereBro');

        if (appNameDisplayer) {
            appNameDisplayer.innerHTML = appName
        }

        document.documentElement.setAttribute('data-bs-theme', appTheme);
    } catch (e) {
        console.error("Error parsing preferences:", e);
        document.documentElement.setAttribute('data-bs-theme', "dark");
    }
});

// glue fix
// @ts-ignore
export { };
