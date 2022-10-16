#!/usr/bin/env node
const { copy } = require("./utils/cli.utils");

var ncp = require('ncp').ncp;

ncp.limit = 16;

const copyNodeModules = async () => {
    await copy("../../node_modules/", "./node_modules/");
}

const copyDevFiles = async () => {
    await copy("../../template/dev_dependency/");
}

const copyStarterCode = async () => {
    await copy("../../template/starter_code/");
}

const param_1 = process.argv[2];

const launch = async () => {
    switch(param_1) {
        case "dependency_only": 
            console.log("Generating dependencies...");
            //Node modules
            await copyNodeModules();
            break;
        case "init": 
            console.log("Generating all required files...");
            //Node modules
            await copyNodeModules();
            await copyDevFiles();
            await copyStarterCode();
            break;
        case "dev_only":
            await copyDevFiles();
            break;
        case "starter_only":
            await copyStarterCode();
            break;
        default:
            console.log("Invalid arguments, exiting application...");
    }   
}

launch();
