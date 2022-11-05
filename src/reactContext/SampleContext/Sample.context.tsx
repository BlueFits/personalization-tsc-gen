import React from "react";
import styles from "./SampleContext.module.css";
import Sample from "../../components/Sample/Sample";
import { createReactRoot, Itype } from "../../utils/react.utils";

export default class SampleContext {
    constructor(private name: string) {
        createReactRoot({
            rootID: "sample_id",
            target: "#persCategoryScroller",
            type: Itype.append,
            render: this.render(),
        });
    }

    render() {
        return (
            <div className={styles.custom_style}>
                <Sample name={this.name} />
            </div>
        );
    }
};