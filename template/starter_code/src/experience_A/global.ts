import persChangesToApply from "./app";
import "./styles/global.css";

(window as any).persChangesApplied = false;

window.addEventListener("load", function () {
    if (!(window as any).persChangesApplied) {
        (window as any).persChangesApplied = true;
        persChangesToApply();
    }
});

if (!(window as any).persChangesApplied && document.readyState === "complete") {
    (window as any).persChangesApplied = true;
    persChangesToApply();
}