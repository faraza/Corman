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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateScript = void 0;
function generateScript(prompt, filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const script = yield _getDummyScriptFromServer(prompt); //TODO: Actually call server
        yield writeScriptToDisk(prompt, filePath);
        return script;
    });
}
exports.generateScript = generateScript;
function writeScriptToDisk(script, filePath) {
    //TODO: Just put in dummy
    return new Promise((res, rej) => {
        setTimeout(() => {
            res();
        }, 100);
    });
}
function _getDummyScriptFromServer(prompt) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            "Dummy script 1";
        }, 3000);
    });
}
