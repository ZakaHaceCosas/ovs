import { Preferences } from '../types/types';
interface Window {
    electron: {
        requestPrefsJson: () => string;
        requestDataJson: () => string;
        wipeOvs: () => 0 | 1;
        changeOvsSettings: (arg: Preferences) => 0 | 1
    };
}