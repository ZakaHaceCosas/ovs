function toggleContextMenu(x: number, y: number) {
    /* const menu = document.getElementById("context-menu");
    if (menu) {
        menu.style.display = (menu.style.display === "block") ? "none" : "block";
        if (menu.style.display === "block") {
            menu.style.top = `${y}px`;
            menu.style.left = `${x}px`;
        }
    } */
    console.log("X?", x, "Y?", y, "WORKS?", "no cause im lazy")
}

if (document.addEventListener) {
    document.addEventListener('contextmenu', function (e: MouseEvent) {
        e.preventDefault();
        toggleContextMenu(e.clientX, e.clientY);
    }, false);
} else if ((document as any).attachEvent) {
    (document as any).attachEvent('oncontextmenu', function (e: any) {
        e = e || (window as any).event;
        const x = e.clientX;
        const y = e.clientY;
        toggleContextMenu(x, y);
        return false;
    });
}
