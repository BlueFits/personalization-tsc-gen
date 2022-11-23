const { execSync } = require("child_process");
const ncp = require('ncp').ncp;
const AdjustingInterval = require("../components/AdjustingInterval");
const path = require("path");
const rimraf = require("rimraf");
const { Console } = require('console');
const { Transform } = require('stream');
const fs = require("fs");
const colors = require('colors');

exports.runCommand = command => {
    try {
        execSync(`${command}`, { stdio: "inherit" });
    } catch(err) {
        console.error("Failed to execute " + command);
        return false;
    }
    return true;
};

exports.copy = async (from, to) => {

    const currDir = process.cwd();

    ncp(path.join(__dirname, from), path.join(currDir, to || ""), {
        clobber: false,
        stopOnErr: true,
        filter: (source) => {
            if (fs.lstatSync(source).isDirectory()) {
                return true;
            } else {
                console.log(colors.blue("COPYING"), source);
                return true;
            }
        }
    }, (err) => {
        if (err) return console.error("ERROR:".red, err);
        console.log("DONE".green);
    });
}

exports.copyAll = async ({ noDep }) => {

    const currDir = process.cwd();

    var ticker = new AdjustingInterval(() => {
        process.stdout.write("#");
    }, 1000, () => {
        console.warn('The drift exceeded the interval.');
    });

    if (noDep) ticker.start();

    ncp(path.join(__dirname, "../../"), path.join(currDir, ""), {
        clobber: false,
        stopOnErr: true,
        filter: (source) => {
            if (noDep === false) return true;
            if (fs.lstatSync(source).isDirectory()) {
                return true;
            } else {
                if (!source.match(/\\node_modules/) && !source.match(/\\.git/)) {
                    console.log(colors.blue("COPYING"), source);
                    return true;
                }
                return false;
            }
        }
    }, (err) => {
        if (err) {
            return console.error(err);
        }
        if (noDep) {
            ticker.stop();
            console.log(" Completed".green);
        }

        console.log("finalizing files...".yellow);

        if (noDep) rimraf.sync(path.join(process.cwd(), "/node_modules"));
        rimraf.sync(path.join(process.cwd(), "/bin"));
        rimraf.sync(path.join(process.cwd(), "/dist"));
        rimraf.sync(path.join(process.cwd(), "/.git"));
        rimraf.sync(path.join(process.cwd(), "/.gitignore"));        
        console.log("DONE".green);
    });
}

exports.table = (input) => {
    // @see https://stackoverflow.com/a/67859384
    const ts = new Transform({ transform(chunk, enc, cb) { cb(null, chunk) } })
    const logger = new Console({ stdout: ts })
    logger.table(input)
    const table = (ts.read() || '').toString()
    let result = '';
    for (let row of table.split(/[\r\n]+/)) {
        let r = row.replace(/[^┬]*┬/, '┌');
        r = r.replace(/^├─*┼/, '├');
        r = r.replace(/│[^│]*/, '');
        r = r.replace(/^└─*┴/, '└');
        r = r.replace(/'/g, ' ');
        result += `${r}\n`;
    }
    console.log(result);
}