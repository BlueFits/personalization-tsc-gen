import persChangesToApply from "./app";
import "./styles/global.css";

(window as any).persChangesApplied = false;

//With Delay is one solution for dynamic renders

const applyChanges = ({ withDelay }: Partial<{ withDelay: number; }> = {}): void => {
    const changes = () => {
        if (!(window as any).persChangesApplied) {
            (window as any).persChangesApplied = true;
            persChangesToApply();
        }
    }
    if (withDelay) {
        setTimeout(() => {
            changes();
        }, withDelay);
    } else {
        changes();
    }
}

window.addEventListener("load", function () {
    applyChanges();
});

if (!(window as any).persChangesApplied && document.readyState === "complete") {
    applyChanges();
}