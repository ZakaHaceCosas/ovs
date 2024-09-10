////////////////////////////////////////////
//// NOTE: THIS IS NOT BEING USED
//// BLAME IT ON JAVASCRIPT (cant get it to work because of some CommonJS vs ES6 argument or something)
////////////////////////////////////////////

import { Inventory } from "../types/types";

function displayInventory(inventory: Inventory): void {
    const inventoryContainer = document.getElementById("inventory");
    const alertsContainer = document.getElementById("alerts");

    if (!inventoryContainer || !alertsContainer) {
        console.error("Inventory or alerts container not found.");
        return;
    }

    inventoryContainer.innerHTML = "";
    alertsContainer.innerHTML = "";

    if (!inventory.length) {
        inventoryContainer.innerHTML = "<h1>No items!</h1>";
        return;
    }

    inventory.forEach((set) => {
        const setElement = document.createElement("a");
        setElement.href = "#";
        setElement.className = "list-group-item list-group-item-action p-3";
        setElement.setAttribute("aria-current", "true");

        const totalItems = set.items.reduce((sum, item) => sum + item.stock, 0);
        let totalColor = "primary";
        if (totalItems < 5) {
            totalColor = "danger";
        } else if (totalItems < 21) {
            totalColor = "warning";
        }

        setElement.innerHTML = `
            <div class="d-flex w-100 justify-content-between">
                <h3 class="fw-bold mb-1">${set.set_name}</h3>
                <small>TOTAL: <span class="badge text-bg-${totalColor}">${totalItems}</span></small>
            </div>
            <ul class="list-group list-group-flush mb-2 mt-2">
                ${set.items
                .map((item) => {
                    let itemColor = "success";
                    if (item.stock < 5) {
                        itemColor = "danger";
                        alertsContainer.innerHTML += `<div class="alert alert-danger" role="alert">
                                Item <strong>${item.item_name}</strong> (ID: ${item.item_id}) is critically low on stock!
                            </div>`;
                    } else if (item.stock < 21) {
                        itemColor = "warning";
                        alertsContainer.innerHTML += `<div class="alert alert-warning" role="alert">
                                Item <strong>${item.item_name}</strong> (ID: ${item.item_id}) is low on stock!
                            </div>`;
                    }
                    return `
                            <li class="list-group-item d-flex justify-content-between align-items-start">
                                <div class="ms-2 me-auto">
                                    <h4>${item.item_name}</h4>
                                    <p class="text-body-secondary m-0 p-0">${item.description}</p>
                                    <code>${item.item_id}</code>
                                </div>
                                <span class="badge text-bg-${itemColor}">${item.stock}</span>
                            </li>
                        `;
                })
                .join("")}
            </ul>
            <small>SET ID: <code>${set.set_id}</code>.</small>
        `;

        inventoryContainer.appendChild(setElement);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    try {
        const jsonData: Inventory = JSON.parse((window as any).electron.requestDataJson());
        console.log("Datos JSON:", jsonData);

        if (!jsonData || !Array.isArray(jsonData) || jsonData.length === 0) {
            document.getElementById("inventory")!.innerHTML = "<h1>No items!</h1>";
        } else {
            displayInventory(jsonData);
        }
    } catch (error) {
        console.error("Error al procesar los datos JSON:", error);
        document.getElementById("inventory")!.innerHTML = "<h1>No items!</h1>";
    }
});
