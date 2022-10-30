import React from "react";
import Index from "./index";
import { createReactRoot, Itype } from "../../../common/utils/react.utils";

export default class SampleContext {
    constructor() {
        createReactRoot({
            rootID: "sample_id",
            target: "#persCategoryScroller",
            type: Itype.append,
            render: <Index />,
        });
    }
};