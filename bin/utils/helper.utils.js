const { copy } = require("./cli.utils");
const path = require("path");
const fs = require("fs");
const rimraf = require("rimraf");
const colors = require('colors');


exports.removeFiles = (cleanDir) => {
    for (let dir of cleanDir) {
        rimraf.sync(path.join(process.cwd(), dir));
    }
};

exports.removeAllFiles = () => {
    console.log("removing files...: ");
    rimraf.sync(path.join(process.cwd(), "/*"));
    console.log("DONE");
}

exports.copyNodeModules = async () => {
    await copy("../../node_modules/", "./node_modules/");
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