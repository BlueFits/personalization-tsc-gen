(window as any).pers000ChangesApplied = false;

const PERS_STORY = "pers-000";

const pers000ChangesToApply = async () => {
    
    const tryCatch = (fun: () => void, block: string) => {
        try {fun();} catch (err) {console.trace('%c ' + PERS_STORY + ' error in ' + block + ': ' + err, 'background: #222; color: #AD7150');}
    }

    const siteDefaults = new Promise<void>((res) => {
        tryCatch(() => {
            $("#main").css("opacity", "1");
        }, "siteDefaults")
        res();
    });

    await siteDefaults;
}

window.addEventListener("load", function () {
    if (!(window as any).pers000ChangesApplied) {
        (window as any).pers000ChangesApplied = true;
        pers000ChangesToApply();
    }
});

if (!(window as any).pers000ChangesApplied && document.readyState === "complete") {
    (window as any).pers000ChangesApplied = true;
    pers000ChangesToApply();
}