const { removeFiles, copyNodeModules, removeAllFiles, genTemplate, HelpConstructor} = require("../utils/helper.utils");
const { table } = require("../utils/cli.utils");
const { cleanDir } = require("../constants/dir.constants");
const templateIndex = require("../templates/index");
const { copyAll } = require("../utils/cli.utils");

exports.initController = (param_2) => {
    let options = {
        noDep: false,
    };
    console.log("Generating all required files...");
    if (param_2 && param_2 === "--no_dep") options.noDep = true; 
    if (param_2 && param_2 === "--overwrite") removeAllFiles();
    copyAll(options);
};

exports.getDepController = () => {
    console.log("Generating dependencies...");
    copyNodeModules();
}

exports.cleanController = (param_2) => {
    param_2 === "--full" ? removeAllFiles() : removeFiles(cleanDir);
    console.log("DONE");
}

exports.genController = (param_2, param_3) => {
    if (!param_2) console.log("error: missing required argument 'schematic'");

    if (param_2 === "--help") {

        const help = [
            HelpConstructor("context", "React Context", "Generates a new react context workspace"),
            HelpConstructor("comp", "React Components", "Generates a new react component workspace"),
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
}