import React from "react";
import styles from "./SampleContext.module.css";
import Sample from "../../components/Sample/Sample";
import { createReactRoot, Itype } from "../../utils/react.utils";

const Index = () => {
    return (
        <div className={styles.custom_style}>
            <Sample />
        </div>
    );
}

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