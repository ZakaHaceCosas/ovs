////////////////////////////////////////////
//// NOTE: THIS IS NOT BEING USED
//// BLAME IT ON JAVASCRIPT (cant get it to work because of some CommonJS vs ES6 argument or something)
////////////////////////////////////////////

interface Window {
    electron: {
        requestPrefsJson: () => string;
        requestDataJson: () => string;
    };
}