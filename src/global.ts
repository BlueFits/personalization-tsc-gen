import persChangesToApply from "./app";

(window as any).pers000ChangesApplied = false;

window.addEventListener("load", function () {
    if (!(window as any).pers000ChangesApplied) {
        (window as any).pers000ChangesApplied = true;
        persChangesToApply();
    }
});

if (!(window as any).pers000ChangesApplied && document.readyState === "complete") {
    (window as any).pers000ChangesApplied = true;
    persChangesToApply();
}