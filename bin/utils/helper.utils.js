const { copy, copyAll } = require("./cli.utils");
const path = require("path");
const rimraf = require("rimraf");

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

exports.copyAllWithException = async () => {
    await copyAll("../../");
};