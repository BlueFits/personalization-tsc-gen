#!/usr/bin/env node
const packageJSON = require("../package.json");
const { removeFiles, copyNodeModules, removeAllFiles, copyAllWithException, genTemplate} = require("./utils/helper.utils");
const { table } = require("./utils/cli.utils");
const { cleanDir } = require("./constants/dir.constants");
const templateIndex = require("./templates/index");

const param_1 = process.argv[2];
const param_2 = process.argv[3];
const param_3 = process.argv[4];

function HelpInfo(name, alias, description) {
    this.name = name;
    this.alias = alias;
    this.description = description;
}

const launch = async () => {
    switch(param_1) {
        case "get_dep": 
            console.log("Generating dependencies...");
            copyNodeModules();
            break;
        case "init": 

            let options = {
                noDep: false,
            };

            console.log("Generating all required files...");

            if (param_2 && param_2 === "--no_dep") options.noDep = true;
            if (param_2 && param_2 === "--overwrite") removeAllFiles();
            copyAllWithException(options);
            break;
        case "clean":
            param_2 === "--full" ? removeAllFiles() : removeFiles(cleanDir);
            console.log("DONE");
            break;
        case "-v":
            console.log(JSON.parse(JSON.stringify(packageJSON)).version);
            break;
        case "g":
            if (!param_2) console.log("error: missing required argument 'schematic'");

            if (param_2 === "--help") {

                const help = [
                    new HelpInfo("context", "React Context", "Generates a new react context workspace"),
                    new HelpInfo("comp", "React Components", "Generates a new react component workspace"),
                ];
                  
                table(help);
            } else if (param_2 && !param_3) {
                console.log("Invalid argument/s.");
            } else if (param_2 === "context") {

                const nameParam = param_3.replace(param_3[0], param_3[0].toLocaleUpperCase())
                genTemplate(nameParam, templateIndex.contextTemplate, `./src/reactContext/${nameParam}Context/`, `${nameParam}.context.tsx`);

            } else if (param_2 === "comp") {

                const nameParam = param_3.replace(param_3[0], param_3[0].toLocaleUpperCase())
                genTemplate(nameParam, templateIndex.componentTemplate, `./src/components/${nameParam}/`, `${nameParam}.tsx`);

            }

            break
        default:
            console.log("Invalid arguments, exiting application...");
    }   
}

launch();
