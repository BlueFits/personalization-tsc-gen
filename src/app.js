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
window.pers000ChangesApplied = false;
const PERS_STORY = "pers-000";
const pers000ChangesToApply = () => __awaiter(void 0, void 0, void 0, function* () {
    const tryCatch = (fun, block) => {
        try {
            fun();
        }
        catch (err) {
            console.trace('%c ' + PERS_STORY + ' error in ' + block + ': ' + err, 'background: #222; color: #AD7150');
        }
    };
    const siteDefaults = new Promise((res) => {
        tryCatch(() => {
            $("#persCategoryScroller").css({ border: "1px solid red" });
            $("#main").css("opacity", "1");
        }, "siteDefaults");
        res();
    });
    yield siteDefaults;
});
window.addEventListener("load", function () {
    if (!window.pers000ChangesApplied) {
        window.pers000ChangesApplied = true;
        pers000ChangesToApply();
    }
});
if (!window.pers000ChangesApplied && document.readyState === "complete") {
    window.pers000ChangesApplied = true;
    pers000ChangesToApply();
}
