module.exports =  `
import React from "react";
import { createReactRoot } from "../../utils/react.utils";

const Index = () => {
    return (
        <div>
            <h1>Generated TEMP_NAMEContext using generator</h1>
        </div>
    );
}

export default class TEMP_NAME {
    constructor() {
        createReactRoot({
            rootID: "pers_TEMP_NAME_id",
            target: "",
            type: "append",
            render: <Index />,
        });
    }
};
`;