"use strict";
function toggleContextMenu(x, y) {
    const menu = document.getElementById("context-menu");
    if (menu) {
        menu.style.display = (menu.style.display === "block") ? "none" : "block";
        if (menu.style.display === "block") {
            menu.style.top = `${y}px`;
            menu.style.left = `${x}px`;
        }
    }
}
if (document.addEventListener) {
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        toggleContextMenu(e.clientX, e.clientY);
    }, false);
}
else if (document.attachEvent) {
    document.attachEvent('oncontextmenu', function (e) {
        e = e || window.event;
        const x = e.clientX;
        const y = e.clientY;
        toggleContextMenu(x, y);
        return false;
    });
}
