interface Window {
    electron: {
        requestPrefsJson: () => string;
        requestDataJson: () => string;
    };
}