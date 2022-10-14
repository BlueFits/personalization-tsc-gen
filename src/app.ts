
const PERS_STORY: string = "pers-000";

const persChangesToApply: () => void = async () => {

    const tryCatch = (fun: () => void, block: string) => {
        try {fun();} catch (err) {console.trace('%c ' + PERS_STORY + ' error in ' + block + ': ' + err, 'background: #222; color: #AD7150');}
    }

    const siteDefaults = new Promise<void>((res) => {
        tryCatch(() => {
            $("#persCategoryScroller > h1").css({ color: "red" })
            $("#main").css("opacity", "1");
        }, "siteDefaults")
        res();
    });

    await siteDefaults;
} ;

export default persChangesToApply;