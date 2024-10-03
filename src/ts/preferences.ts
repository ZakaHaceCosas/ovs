import { Preferences } from '../types/types';

window.addEventListener("DOMContentLoaded", () => {
    try {
        const prefs: Preferences = JSON.parse((window as any).electron.requestPrefsJson());

        console.log(prefs);

        const appName = prefs.appName
        const appTheme = prefs.theme || "dark";

        const appNameDisplay = document.getElementById('appNameHereBro');

        if (appNameDisplay) {
            appNameDisplay.innerHTML = appName
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
