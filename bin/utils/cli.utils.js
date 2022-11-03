const { execSync } = require("child_process");
const ncp = require('ncp').ncp;
const AdjustingInterval = require("../components/AdjustingInterval");
const path = require("path");
const rimraf = require("rimraf");

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

    var ticker = new AdjustingInterval(() => {
        process.stdout.write("#");
    }, 1000, () => {
        console.warn('The drift exceeded the interval.');
    });

    ticker.start();

    ncp(path.join(__dirname, from), path.join(currDir, to || ""), {
        clobber: false,
        stopOnErr: true,
    }, (err) => {
        if (err) {
            return console.error(err);
        }
        ticker.stop();
        console.log(": Completed");
    });
}

exports.copyAll = async () => {

    const currDir = process.cwd();

    var ticker = new AdjustingInterval(() => {
        process.stdout.write("#");
    }, 1000, () => {
        console.warn('The drift exceeded the interval.');
    });

    ticker.start();

    ncp(path.join(__dirname, "../../"), path.join(currDir, ""), {
        clobber: false,
        stopOnErr: true,
    }, (err) => {
        if (err) {
            return console.error(err);
        }
        ticker.stop();
        console.log(": Completed");
        console.log("finalizing files...");
        rimraf.sync(path.join(process.cwd(), "/bin"));
        rimraf.sync(path.join(process.cwd(), "/dist"));
        rimraf.sync(path.join(process.cwd(), "/.git"));
        rimraf.sync(path.join(process.cwd(), "/.gitignore"));
        console.log("DONE");
    });
}