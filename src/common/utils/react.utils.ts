import { createRoot } from 'react-dom/client';
import React from "react";

export const createReactRoot = async (rootID: string, target: string, render: React.ReactNode): Promise<void> => {
    const createReactElem = new Promise<void>((res) => {
        $(target).append(`<div id="${rootID}"></div>`);
    });
    const insertReactElem = new Promise<void>((res) => {
        const getContainer = document.getElementById(rootID);
        const root = createRoot(getContainer!); // createRoot(container!) if you use TypeScript
        root.render(render);
    });
    await createReactElem;
    await insertReactElem;
};