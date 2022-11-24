#!/usr/bin/env node
const packageJSON = require("../package.json");
const { initController, getDepController, cleanController, genController } = require("./controllers/cli.controller");
const webpack = require('webpack');
const config = require("../webpack.config")

// "start": "webpack && concurrently \"webpack --watch\" \"npm run livereload\"",

const currDir = process.cwd();

const param_1 = process.argv[2];
const param_2 = process.argv[3];
const param_3 = process.argv[4];

const launch = async () => {
    switch(param_1) {
        case "get_dep": 
            getDepController(param_2);
            break;
        case "init": 
            initController(param_2, param_3);
            break;
        case "clean":
            cleanController(param_2);
            break;
        case "-v":
            console.log(JSON.parse(JSON.stringify(packageJSON)).version);
            break;
        case "g":
            genController(param_2, param_3)
            break
        case "start":
            console.log("starting for: ", currDir + "\\src\\global");
            webpack(config).watch(
                {
                    // Example
                    aggregateTimeout: 300,
                    poll: undefined,
                  },
                  (err, stats) => {
                    if (err) throw new Error("Error", err);
                    // Print watch/build result here...
                    console.log(
                        stats.toString({
                            colors: true,
                          })
                    );
                  }
            );
            break;
        default:
            console.log("Invalid arguments, exiting application...");
    }   
}

launch();
