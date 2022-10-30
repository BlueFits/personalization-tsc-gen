import constants from "../common/constants/default.constants";
import { tryCatch } from "../common/utils/default.utils";

import SampleContext from "./reactContext/SampleContext/Sample.context";

let persChangesToApply = async (): Promise<void> => {

    const siteDefaults = new Promise<void>((res) => {
        tryCatch(() => {
            new SampleContext();
            $("#main").css("opacity", "1");
            res();
        }, "siteDefaults", constants.PERS_STORY)
    });

    await siteDefaults;

} ;

export default persChangesToApply;