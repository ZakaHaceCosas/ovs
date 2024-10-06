import { Inventory, Preferences } from '../types/types';
declare global {
    interface Window {
        electron: {
            requestPreferences: () => Preferences;
            requestDataJson: () => string;
            wipeOvs: () => 0 | 1;
            changeOvsSettings: (arg: Preferences) => 0 | 1;
            writeDataJson: (arg: Inventory) => 0 | 1;
        };
    }
}

// This line is required to make the file a module, apparently
export { };