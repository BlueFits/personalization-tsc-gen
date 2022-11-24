const { execSync } = require("child_process");
const ncp = require('ncp').ncp;
const path = require("path");
const { Console } = require('console');
const { Transform } = require('stream');
const fs = require("fs");
const colors = require('colors');const cliProgress = require('cli-progress');
const { readdir, stat } = require('fs/promises');
const rimraf = require("rimraf");
const { exec } = require('child_process');


const dirSize = async directory => {
    const files = await readdir( directory );
    const stats = files.map( file => stat( path.join( directory, file ) ) );
  
    return ( await Promise.all( stats ) ).reduce( ( accumulator, { size } ) => accumulator + size, 0 );
  }

exports.runCommand = command => {
    try {
        execSync(`${command}`, { stdio: "inherit" });
    } catch(err) {
        console.error("Failed to execute " + command);
        return false;
    }
    return true;
};

exports.copy = async (from, to, options = {}) => {
    const currDir = process.cwd();
    const fromPath = path.join(__dirname, from);
    const size = await dirSize(fromPath);
    const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.rect);
    if (!options.verbose) bar1.start(options.end || size, 0);
    ncp(fromPath, path.join(currDir, to || ""), { 
        clobber: false, 
        stopOnErr: true ,
        filter: (source) => {
            if (fs.lstatSync(source).isDirectory()) {
                return true;
            } else {
                if (!options.verbose) {
                    bar1.increment()
                } else {
                    console.log(colors.blue("COPYING"), source);
                }
                return true;
            }
        }
    }, (err) => {
        if (err) return console.error(colors.red("ERROR:"), err);
        if (!options.verbose) {
            bar1.update(options.end || size);
            bar1.stop();
        }
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
};

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

exports.runCLI = async (cmd) => {
    const child = exec(cmd, (err) => {
        if (err) console.error(err);
    });
    child.stderr.pipe(process.stderr);
    child.stdout.pipe(process.stdout);
    await new Promise((resolve) => child.on('close', resolve));
};