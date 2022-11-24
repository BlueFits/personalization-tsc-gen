#!/usr/bin/env node
const packageJSON = require("../package.json");
const { initController, getDepController, cleanController, genController } = require("./controllers/cli.controller");


const param_1 = process.argv[2];
const param_2 = process.argv[3];
const param_3 = process.argv[4];

const launch = async () => {
    switch(param_1) {
        case "get_dep": 
            getDepController();
            break;
        case "init": 
            initController(param_2);
            break;
        case "clean":
            cleanController();
            break;
        case "-v":
            console.log(JSON.parse(JSON.stringify(packageJSON)).version);
            break;
        case "g":
            genController(param_2, param_3)
            break
        default:
            console.log("Invalid arguments, exiting application...");
    }   
}

launch();
