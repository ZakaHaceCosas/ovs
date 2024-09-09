import { Preferences } from '../types/types';

window.addEventListener("DOMContentLoaded", () => {
    try {
        const rawPrefs = window.electron.requestPrefsJson();
        const prefs: Preferences = JSON.parse(rawPrefs);
        console.log(prefs);
        let theme: "light" | "dark" = prefs.theme ?? "light";
        console.log(theme);
        document.documentElement.setAttribute('data-bs-theme', theme);
    } catch (e) {
        console.error("Error parsing preferences:", e);
        document.documentElement.setAttribute('data-bs-theme', "light");
    }
});

// glue fix
// @ts-ignore
export { };
