import SampleContext from "../reactContext/SampleContext/Sample.context";
import ExperienceB from "./ExperienceB";

export default class ExperienceC extends ExperienceB {
    constructor() {
        super();
    }

    SampleComponent() {
        new SampleContext("Experience C");
    }
}