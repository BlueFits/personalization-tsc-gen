import PuppeteerBrowser from "./components/Puppeteer";
import chokidar from "chokidar";
import path from "path";
import config from "./config.json";

import "log-timestamp";

const launch = async () => {
    let browserInstance = await PuppeteerBrowser.build(config.url);

    await browserInstance.start();

    const watcher = chokidar.watch(path.resolve(process.cwd() + "/dist/"), {ignored: /^\./, persistent: true});
    watcher
        .on('change', function(path) {
            browserInstance.reloadTab();
            console.log('File', path, 'has been updated');
        })
        .on('error', function(error) {console.error('Error happened', error);})
        // .on('unlink', function(path) {console.log('File', path, 'has been removed');})
        // .on('add', function(path) {console.log('File', path, 'has been added');})
}

launch();