import { Preferences } from '../types/types';

window.addEventListener("DOMContentLoaded", () => {
    try {
        const preferences: Preferences = window.electron.requestPreferences();

        console.log(preferences);

        const appName = preferences.appName
        const appTheme = preferences.theme || "dark";

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
