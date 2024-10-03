// App preferences
export interface Preferences {
    theme: "dark" | "light",
    lang: "english" | "spanish",
    appName: string,
    startup: false, // not boolean as we don't support this yet
    encrypt: false, // not boolean as we don't support this yet
}

// item interface
export interface Item {
    item_id: string;
    item_name: string;
    description: string;
    stock: number;
}

// set interface
export interface InventorySet {
    set_id: string;
    set_name: string;
    items: Item[];
}

// OVS inventory
export type Inventory = InventorySet[];