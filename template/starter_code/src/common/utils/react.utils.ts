import { createRoot } from 'react-dom/client';
import React from "react";

export enum Itype {
    append,
    prepend,
    replace,
    html,
};

type jQueryElement = string;

export const createReactRoot = async (
    rootID: string, 
    target: string | null, 
    render: React.ReactNode, 
    type?: Itype, 
    { 
        wrapperElement,
        makeTargetRoot,
        customID,
    }: Partial<{
         wrapperElement: jQueryElement; 
         makeTargetRoot: boolean;
         customID: string;
    }> = {}
    ): Promise<void> => {
    const createReactElem = new Promise<void>((res) => {
        let rootElem = `<div id="${rootID}"></div>`;
        if (wrapperElement) {
            rootElem = wrapperElement;
        } else if (makeTargetRoot) {
            $(target).attr("id", "")
            $(target).attr("id", rootID)
            rootElem = $(target);
        } else if (customID && !target) {
            rootElem = $(customID)
        }
        switch(type) {
            case Itype.append:
                $(target).append(rootElem);
                break;
            case Itype.prepend:
                $(target).prepend(rootElem);
                break;
            case Itype.replace: 
                $(target).replaceWith(rootElem);
                break;
            case Itype.html:
                $(target).html(rootElem);
                break;
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
