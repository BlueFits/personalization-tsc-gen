declare module "*.css";

declare module "*.svg" {
    const content: any;
    export default content;
}

declare var BMOINFO: any;