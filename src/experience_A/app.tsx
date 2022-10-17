import React from 'react';//Needed wherever react is used
import constants from "./constants/default.constants";
import { tryCatch } from "./utils/default.utils";
import { createReactRoot } from "./utils/react.utils";

//Components
import Sample from './components/Sample/Sample';

let persChangesToApply = async (): Promise<void> => {

    const siteDefaults = new Promise<void>((res) => {
        tryCatch(() => {
			createReactRoot("pers-changes", "#persCategoryScroller", <Sample />);
            $("#main").css("opacity", "1");
            res();
        }, "siteDefaults", constants.PERS_STORY)
    });

    await siteDefaults;
} ;

export default persChangesToApply;