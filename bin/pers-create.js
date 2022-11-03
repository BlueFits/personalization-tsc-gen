#!/usr/bin/env node
const packageJSON = require("../package.json");
const { removeFiles, copyNodeModules, removeAllFiles, copyAllWithException } = require("./utils/helper.utils");
const { cleanDir } = require("./constants/dir.constants");


const param_1 = process.argv[2];
const param_2 = process.argv[3];

const launch = () => {
    switch(param_1) {
        case "get_dependencies": 
            console.log("Generating dependencies...");
            copyNodeModules();
            break;
        case "init": 
            if (param_2 && param_2 === "--overwrite") removeAllFiles();
            console.log("Generating all required files...");
            copyAllWithException();
            break;
        case "clean":
            param_2 === "--full" ? removeAllFiles() : removeFiles(cleanDir);
            console.log("DONE");
            break;
        case "-v":
            console.log(JSON.parse(JSON.stringify(packageJSON)).version);
            break;
        default:
            console.log("Invalid arguments, exiting application...");
    }   
}

launch();
