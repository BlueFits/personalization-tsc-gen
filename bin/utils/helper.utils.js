const { copy, runCLI } = require("./cli.utils");
const path = require("path");
const fs = require("fs");
const colors = require('colors');

const ncpTemplateCopy = async (options) => {
    await copy("../../ncpTemplate/", "./", {end: 24, ...options})
};

const nodeModulesCopy = async (options) => {
    await copy("../../node_modules/", "./node_modules/", {end: 20625, ...options})
};

exports.copyNodeModules = () => {
    nodeModulesCopy();
}

exports.copyDevFiles = (options) => {
    ncpTemplateCopy(options);
}

exports.copyDevAndNode = (options) => {
    ncpTemplateCopy(options);
    nodeModulesCopy(options);
}

exports.genTemplate = async (nameParam, template, customPath, filename) => {
    let isCreated = false;
    const currDir = process.cwd();
    const templateValue =  await template(nameParam);
    const filePath = path.join(currDir, `${customPath}/${filename}`);
    const fileDir = path.join(currDir, customPath);
    if (!fs.existsSync(fileDir)) {
        fs.mkdirSync(fileDir);
        isCreated = true;
    }
    fs.writeFile(filePath, templateValue, (err) => {if(err) throw new Error(err);});
    isCreated ? console.log(colors.green("CREATE"), filePath) : console.log(colors.blue("UPDATED"), filePath) 
}

function HelpInfo(name, alias, description) {
    this.name = name;
    this.alias = alias;
    this.description = description;
}

exports.HelpConstructor = (name, alias, description) => new HelpInfo(name, alias, description);