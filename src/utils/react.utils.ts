import { createRoot } from 'react-dom/client';
import React from "react";

type jQueryElement = string;

type createReactRootOptions = {
    rootID: string, 
    target?: string | null, 
    render: React.ReactNode, 
    type?: "append" | "prepend" | "replace" | "html" | "before";
    wrapperElement?: jQueryElement; 
    makeTargetRoot?: boolean;
    customTarget?: string;
};

export const createReactRoot = async ( 
    { 
        rootID, 
        target,
        render,
        type,
        wrapperElement,
        makeTargetRoot,
        customTarget,
    }: createReactRootOptions
    ): Promise<void> => {
    const createReactElem = new Promise<void>((res) => {
        let rootElem = `<div id="${rootID}"></div>`;
        if (wrapperElement) {
            rootElem = $(wrapperElement).attr("id", rootID)
        } else if (makeTargetRoot) {
            $(target).attr("id", "")
            $(target).attr("id", rootID)
            rootElem = $(target);
        } else if (customTarget && !target) {
            rootElem = $(customTarget)
        }
        switch(type) {
            case "append":
                $(target).append(rootElem);
                break;
            case "prepend":
                $(target).prepend(rootElem);
                break;
            case "replace": 
                $(target).replaceWith(rootElem);
                break;
            case "html":
                $(target).html(rootElem);
                break;
            case "before": 
                $(target).before(rootElem);
            default:
                $(target).append(rootElem);
        }
    });
    const insertReactElem = new Promise<void>((res) => {
        const getContainer = document.getElementById(rootID);
        const root = createRoot(getContainer!); // createRoot(container!) if you use TypeScript
        root.render(render);
    });
    await createReactElem;
    await insertReactElem;
};
