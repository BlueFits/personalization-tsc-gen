const { execSync } = require("child_process");
const ncp = require('ncp').ncp;
const path = require("path");
const { Console } = require('console');
const { Transform } = require('stream');
const fs = require("fs");
const colors = require('colors');const cliProgress = require('cli-progress');
const { readdir, stat } = require('fs/promises');
const rimraf = require("rimraf");

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
            // bar1.update(size);
            bar1.stop();
        }
        console.log("DONE".green);
    });
}

// exports.copyAll = async ({ noDep }) => {
//     if (noDep) console.log(colors.bgBlue("Bypassing all dependencies..."));

//     const currDir = process.cwd();

//     ncp(path.join(__dirname, "../../"), path.join(currDir, ""), {
//         clobber: false,
//         stopOnErr: true,
//         filter: !noDep ? (source) => {
//             if (fs.lstatSync(source).isDirectory()) {
//                 return true;
//             } else {
//                 console.log(colors.blue("COPYING"), source);
//                 return true;
//             }
//         } : (source) => {
//             if (fs.lstatSync(source).isDirectory()) {
//                 return true;
//             } else {
//                 if (
//                     source.includes(`${path.join(__dirname, "../../")}node_modules`) ||
//                     source.includes(`${path.join(__dirname, "../../")}.git`) ||
//                     source.includes(`${path.join(__dirname, "../../")}dist`) || 
//                     source.includes(`${path.join(__dirname, "../../")}bin`)
//                 ) {
//                     return false;
//                 } else {
//                     console.log(colors.blue("COPYING W/ NO DEP"), source);
//                     return true;
//                 }
//             }
//         }
//     }, (err) => {
//         if (err) { return console.error(err);}
//         console.log(colors.yellow("finalizing files..."));
//         //Remove excess nodule modules folder if there are no dep
//         if (noDep) rimraf.sync(path.join(process.cwd(), "/node_modules"));
//         rimraf.sync(path.join(process.cwd(), "/bin"));
//         rimraf.sync(path.join(process.cwd(), "/dist"));
//         rimraf.sync(path.join(process.cwd(), "/.git"));
//         rimraf.sync(path.join(process.cwd(), "/.gitignore"));        
//         console.log(colors.green("DONE"));
//     });
// }

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