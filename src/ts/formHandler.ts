import { Inventory, InventorySet } from "../types/types"

function createSet() {
    try {
        const nameInput = document.getElementById("formInput_set_Name") as HTMLInputElement
        const idInput = document.getElementById("formInput_set_Id") as HTMLInputElement
        const data: Inventory = JSON.parse((window as any).electron.requestDataJson());
        console.log(data);

        if (data) {
            if (!Array.isArray(data)) {
                throw new Error("Data is not an array");
            }
        } else {
            throw new Error("No data")
        }

        if (idInput && nameInput) {
            const newSet: InventorySet = {
                set_id: idInput.value,
                set_name: nameInput.value,
                items: []
            }

            const newData: Inventory = [...data, newSet];
            (window as any).electron.writeDataJson(newData);
            console.log("New set created:", newSet);
        } else {
            alert("An unknown error happened.")
        }

    } catch (e) {
        console.error("Error with creating a set: " + e);
        alert(e);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const createButton = document.getElementById("onClick_createSet");

    createButton?.addEventListener("click", createSet);
});
