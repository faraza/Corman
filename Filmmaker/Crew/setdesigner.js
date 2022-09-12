"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.generateImage = void 0;
const child = __importStar(require("child_process"));
const secrets_1 = require("../../secrets");
function generateImage(imagePrompt, _fileOutputLocation) {
    return __awaiter(this, void 0, void 0, function* () {
        const pythonScriptPath = './ImageGeneratorPython/client.py'; //TODO: Deal with file paths
        const scriptCommand = "export STABILITY_KEY=" + secrets_1.stabilityKey + " ; python3 " + pythonScriptPath + " -W 512 -H 512 \"" + imagePrompt + "\"";
        return new Promise((res, rej) => {
            child.exec(scriptCommand, (error, stdout, stderr) => {
                if (error) {
                    console.log("Error: ", error);
                    rej(error);
                }
                console.log("STDOUT: ", stdout);
                console.log("STDERR: ", stderr);
                res();
            });
        });
    });
}
exports.generateImage = generateImage;
function _getDummyImageFromServer(_prompt, _fileOutputLocation) {
    return new Promise((resolve, _reject) => {
        setTimeout(() => {
            resolve();
        }, 3000);
    });
}
function _testGenerateImage() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("TestGenerateImage");
        const prompt = "A flaming red sun";
        yield generateImage(prompt, "");
        console.log("Done running Test GenerateImage");
    });
}
_testGenerateImage();
