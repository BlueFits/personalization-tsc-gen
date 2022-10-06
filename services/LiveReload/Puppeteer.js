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
exports.__esModule = true;
var utils_1 = require("./utils");
var pupeteer = require("puppeteer");
var path = require("path");
var PuppeteerBrowser = /** @class */ (function () {
    function PuppeteerBrowser(page, currentlyOpenTabfilePath) {
        if (typeof page === 'undefined') {
            throw new Error('Cannot be called directly');
        }
        else {
            this.page = page;
            this.currentlyOpenTabfilePath = currentlyOpenTabfilePath;
        }
    }
    ;
    PuppeteerBrowser.build = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var pathToChrome, currentlyOpenTabfilePath, browser, pages, page;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pathToChrome = (0, utils_1.getPathToChrome)();
                        return [4 /*yield*/, (0, utils_1.readFilePath)()];
                    case 1:
                        currentlyOpenTabfilePath = _a.sent();
                        if (!pathToChrome || !(0, utils_1.existsSync)(pathToChrome)) {
                            throw new Error('Chrome was not found. Chrome must be installed for this extension to function. If you have Chrome installed at a custom location you can specify it in the \'chromePath\' setting.');
                        }
                        ;
                        return [4 /*yield*/, pupeteer.launch({
                                executablePath: pathToChrome,
                                headless: false,
                                devtools: true,
                                defaultViewport: null
                            })];
                    case 2:
                        browser = _a.sent();
                        //Event Listeners
                        browser.on("targetcreated", function (target) { return __awaiter(_this, void 0, void 0, function () {
                            var page;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, target.page()];
                                    case 1:
                                        page = _a.sent();
                                        if (page) {
                                            page.close();
                                        }
                                        ;
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, browser.pages()];
                    case 3:
                        pages = _a.sent();
                        page = pages[0];
                        return [4 /*yield*/, page.goto(url, { waitUntil: 'load' })];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, new PuppeteerBrowser(page, currentlyOpenTabfilePath)];
                }
            });
        });
    };
    ;
    PuppeteerBrowser.prototype.getFilePath = function () {
        return this.currentlyOpenTabfilePath;
    };
    ;
    PuppeteerBrowser.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.render()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    PuppeteerBrowser.prototype.render = function () {
        return __awaiter(this, void 0, void 0, function () {
            var file, _a, scriptWithSrc, scriptTxt, styleTxt, linkTags;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, utils_1.readFile)(path.resolve(__dirname + "../../../dist/index.html"))];
                    case 1:
                        file = _b.sent();
                        _a = (0, utils_1.readHTML)(file), scriptWithSrc = _a.scriptWithSrc, scriptTxt = _a.scriptTxt, styleTxt = _a.styleTxt, linkTags = _a.linkTags;
                        if (!(linkTags.length > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.page.$eval("head", function () { return console.log('%c $$$JS_INJECT: Loading Additional Link Tags', 'background: #222; color: #bada55'); })];
                    case 2:
                        _b.sent();
                        this.createAsyncTag(linkTags, "href", "link");
                        _b.label = 3;
                    case 3:
                        if (!(scriptWithSrc.length > 0)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.page.$eval("head", function () { return console.log('%c $$$JS_INJECT: Loading Additional Script Tags', 'background: #222; color: #bada55'); })];
                    case 4:
                        _b.sent();
                        this.createAsyncTag(scriptWithSrc, "src", "script");
                        _b.label = 5;
                    case 5:
                        if (!(linkTags.length > 0 || scriptWithSrc.length > 0)) return [3 /*break*/, 7];
                        // await this.page.waitForNavigation();
                        return [4 /*yield*/, this.page.waitForTimeout(1000)];
                    case 6:
                        // await this.page.waitForNavigation();
                        _b.sent();
                        _b.label = 7;
                    case 7: return [4 /*yield*/, this.page.$eval("head", function (elem, scriptTxt, styleTxt) {
                            var script = document.createElement("script");
                            var style = document.createElement("style");
                            style.id = "inject_style_id";
                            style.innerHTML = styleTxt;
                            script.id = "inject_script_id";
                            script.type = "text/javascript";
                            script.text = scriptTxt;
                            elem.appendChild(style);
                            elem.appendChild(script);
                        }, scriptTxt, styleTxt)];
                    case 8:
                        _b.sent();
                        return [4 /*yield*/, this.page.$eval("head", function () { return console.log('%c $$$JS_INJECT: Changes are live', 'background: #222; color: #bada55'); })];
                    case 9:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    PuppeteerBrowser.prototype.reloadTab = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.reload({ waitUntil: 'load' })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    //Used in render to create network fetching scripts or links
    PuppeteerBrowser.prototype.createAsyncTag = function (tag, prop, block) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.$eval("head", function (elem, tag, prop, block) {
                            for (var _i = 0, tag_1 = tag; _i < tag_1.length; _i++) {
                                var val = tag_1[_i];
                                var createdTag = document.createElement(block);
                                if (val.id) {
                                    createdTag.id = val.id;
                                }
                                ;
                                if (block === "link") {
                                    createdTag.rel = "stylesheet";
                                    createdTag.type = 'text/css';
                                }
                                else if (block === "script") {
                                    createdTag.type = "text/javascript";
                                }
                                createdTag[prop] = val[prop];
                                elem.appendChild(createdTag);
                            }
                        }, tag, prop, block)];
                    case 1:
                        _a.sent();
                        if (!tag[tag.length - 1].id) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.page.waitForSelector("#".concat(tag[tag.length - 1].id))];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    return PuppeteerBrowser;
}());
exports["default"] = PuppeteerBrowser;
