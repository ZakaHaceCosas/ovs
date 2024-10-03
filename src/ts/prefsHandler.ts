import { Preferences } from "../types/types";

document.addEventListener("DOMContentLoaded", () => {
    function confirmChanges(): void {
        try {
            const alertDiv = document.createElement("div");
            alertDiv.className = "alert alert-primary";
            alertDiv.role = "alert";
            alertDiv.innerHTML = "<b>Done!</b> Your changes will apply as soon as you leave this menu.";

            const alertContainer = document.getElementById("prefsAlertHereBro");
            if (alertContainer) {
                alertContainer.appendChild(alertDiv);
            } else {
                console.warn("Warning: Alert container not found.");
            }
        } catch (e) {
            console.error("Error in confirmChanges function: ", e);
            alert("An error occurred while saving settings. Please try again later.");
        }
    }

    (window as any).wipeOVS = () => {
        (window as any).electron.wipeOvs();
        window.location.replace("index.html");
    };

    (window as any).updatePrefs = (lang: string, appName: string, theme: "light" | "dark") => {
        (window as any).electron.changeOvsSettings({
            lang: lang,
            appName: appName,
            theme: theme,
            startup: false,
            encrypt: false,
        });
        confirmChanges()
    };

    const data = JSON.parse((window as any).electron.requestPrefsJson()) as Preferences;

    console.log(data);

    const appNameInput = document.getElementById("appName") as HTMLInputElement;
    const appThemeInput = document.getElementById("theme") as HTMLInputElement;

    if (appNameInput && appThemeInput) {
        appNameInput.value = data.appName;
        appThemeInput.value = data.theme;
    }
});