import { Inventory, Preferences } from '../types/types';
interface Window {
    electron: {
        requestPreferencesJson: () => string;
        requestDataJson: () => string;
        wipeOvs: () => 0 | 1;
        changeOvsSettings: (arg: Preferences) => 0 | 1;
        writeDataJson: (arg: Inventory) => 0 | 1;
    };
}