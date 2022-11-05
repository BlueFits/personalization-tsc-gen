import SampleContext from "../reactContext/SampleContext/Sample.context";

export default class ExperienceB {
    constructor() {
        this.SampleComponent();
        $("#main").css("opacity", "1");
    }

    SampleComponent() {
        new SampleContext("Experience B");
    }
}