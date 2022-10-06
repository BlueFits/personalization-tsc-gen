"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.readFolderPath = exports.readFilePath = exports.readFile = exports.readHTML = exports.getPathToChrome = exports.getPlatform = exports.existsSync = void 0;
// const cheerio = require('cheerio');
var cheerio = require("cheerio");
var os = require("os");
var path = require("path");
var fs = require("fs");
var WIN_APPDATA = process.env.LOCALAPPDATA || '/';
var DEFAULT_CHROME_PATH = {
    LINUX: '/usr/bin/google-chrome',
    OSX: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    WIN: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    WIN_LOCALAPPDATA: path.join(WIN_APPDATA, 'Google\\Chrome\\Application\\chrome.exe'),
    WINx86: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
};
function existsSync(path) {
    try {
        fs.statSync(path);
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.existsSync = existsSync;
function getPlatform() {
    var platform = os.platform();
    return platform === 'darwin' ? 1 /* Platform.OSX */ :
        platform === 'win32' ? 0 /* Platform.Windows */ :
            2 /* Platform.Linux */;
}
exports.getPlatform = getPlatform;
function getPathToChrome() {
    var platform = getPlatform();
    if (platform === 1 /* Platform.OSX */) {
        return existsSync(DEFAULT_CHROME_PATH.OSX) ? DEFAULT_CHROME_PATH.OSX : '';
    }
    else if (platform === 0 /* Platform.Windows */) {
        if (existsSync(DEFAULT_CHROME_PATH.WINx86)) {
            return DEFAULT_CHROME_PATH.WINx86;
        }
        else if (existsSync(DEFAULT_CHROME_PATH.WIN)) {
            return DEFAULT_CHROME_PATH.WIN;
        }
        else if (existsSync(DEFAULT_CHROME_PATH.WIN_LOCALAPPDATA)) {
            return DEFAULT_CHROME_PATH.WIN_LOCALAPPDATA;
        }
        else {
            return '';
        }
    }
    else {
        return existsSync(DEFAULT_CHROME_PATH.LINUX) ? DEFAULT_CHROME_PATH.LINUX : '';
    }
}
exports.getPathToChrome = getPathToChrome;
var readHTML = function (html) {
    var $ = cheerio.load(html);
    var scriptWithSrc = [];
    var linkTags = [];
    var scriptTags = $("script");
    var scriptTxt = null;
    for (var i = 0; i < scriptTags.length; i++) {
        if ($(scriptTags.get(i)).html()) {
            scriptTxt = $(scriptTags.get(i)).html();
            break;
        }
    }
    if ($("script[src]").length > 0) {
        $("script[src]").each(function (index, elem) {
            scriptWithSrc = __spreadArray(__spreadArray([], scriptWithSrc, true), [{ id: elem.attribs.id, src: elem.attribs.src }], false);
        });
    }
    $("link[rel=stylesheet]").each(function (index, elem) {
        linkTags = __spreadArray(__spreadArray([], linkTags, true), [{ id: elem.attribs.id, href: elem.attribs.href }], false);
    });
    return {
        linkTags: linkTags,
        scriptWithSrc: scriptWithSrc,
        scriptTxt: scriptTxt,
        styleTxt: $("style").html()
    };
};
exports.readHTML = readHTML;
var readFile = function (filePath) { return __awaiter(void 0, void 0, void 0, function () {
    var file;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!!filePath) return [3 /*break*/, 1];
                throw new Error("YOUR-EXTENSION: Working folder not found, open a folder an try again");
            case 1: return [4 /*yield*/, fs.readFileSync(filePath).toString()];
            case 2:
                file = _a.sent();
                return [2 /*return*/, file];
        }
    });
}); };
exports.readFile = readFile;
var readFilePath = function () { return __awaiter(void 0, void 0, void 0, function () {
    var path;
    return __generator(this, function (_a) {
        path = "File path";
        if (!path) {
            throw new Error("Must have an active window");
        }
        else {
            return [2 /*return*/, path];
        }
        return [2 /*return*/];
    });
}); };
exports.readFilePath = readFilePath;
var readFolderPath = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, "folder path"];
    });
}); };
exports.readFolderPath = readFolderPath;
