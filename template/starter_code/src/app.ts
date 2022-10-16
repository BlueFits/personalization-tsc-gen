import { tryCatch } from "./utils/default.utils";
import constants from "./constants/default.constants";

const persChangesToApply: () => void = async () => {

    const siteDefaults = new Promise<void>((res) => {
        tryCatch(() => {
            $("#main").css("opacity", "1");
        }, "siteDefaults", constants.PERS_STORY)
        res();
    });

    await siteDefaults;
} ;

export default persChangesToApply;