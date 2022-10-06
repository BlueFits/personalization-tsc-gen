import PuppeteerBrowser from "./Puppeteer";

const launch = async () => {
    let browserInstance = await PuppeteerBrowser.build("https://www.bmo.com/main/personal");
    await browserInstance.start();
}

launch();
