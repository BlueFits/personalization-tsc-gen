import { createRoot } from 'react-dom/client';
import React from "react";

export enum actionType {
    append,
    prepend,
    replace,
};

export const createReactRoot = async (
    rootID: string, 
    target: string, 
    render: React.ReactNode, 
    type: actionType
): Promise<void> => {
    const createReactElem = new Promise<void>((res) => {
        const rootElem = `<div id="${rootID}"></div>`;
        switch(type) {
            case actionType.append: 
                $(target).append(rootElem);
                break;
            case actionType.prepend:
                $(target).prepend(rootElem);
                break;
            case actionType.replace:
                $(target).replaceWith(rootElem);
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