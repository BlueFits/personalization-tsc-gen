const { copyNodeModules, genTemplate, HelpConstructor, copyDevFiles, copyDevAndNode} = require("../utils/helper.utils");
const { table, removeAllFiles, removeFiles, runCLI } = require("../utils/cli.utils");
const { cleanDir } = require("../constants/dir.constants");
const templateIndex = require("../templates/index");
const path = require("path");

const rootDir = path.join(__dirname, "../../")


const initCommands = ["--overwrite", "--no_dep", "verbose"];
exports.initController = async (param_2, param_3) => {
    if (param_2 && !initCommands.includes(param_2)) throw new Error("Invalid paramater".red);
    let options = {};
    console.log("Generating files...".yellow);
    if (param_2 === initCommands[0]) removeAllFiles();
    if (param_2 === initCommands[1])  {
        if (param_3 === initCommands[2]) options = { verbose: true };
        copyDevFiles(options);
        return;
    }
    if (param_2 === initCommands[2]) options = { verbose: true };
    copyDevAndNode(options);
};

exports.getDepController = (param_2) => {
    let options = {};
    if (param_2 === "verbose") options = { verbose: true };
    copyNodeModules(options);
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

exports.startController = async (param_2) => {
    await runCLI(`npm start --prefix ${rootDir}`);
};

exports.installReload = async () => {
    await runCLI(`npm install -D --prefix ${rootDir}`);
}