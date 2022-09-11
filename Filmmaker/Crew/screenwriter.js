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
const openai_1 = require("openai");
const secrets_1 = require("../../secrets");
function generateScript(prompt, filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const script = yield _getDummyScriptFromServer(prompt); //TODO: Actually call server
        yield writeScriptToDisk(prompt, filePath);
        return script;
    });
}
exports.generateScript = generateScript;
function writeScriptToDisk(script, filePath) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res();
        }, 100);
    });
}
function _getDummyScriptFromServer(prompt) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Dummy script 1");
        }, 3000);
    });
}
function _testGenScriptHardcoded() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("_testGenScript 1");
        const config = new openai_1.Configuration({ apiKey: secrets_1.gpt3Key });
        const openai = new openai_1.OpenAIApi(config);
        const prompt = "What are three animals that can swim?";
        sendPromptToServer(openai, prompt);
    });
}
function sendPromptToServer(openai, prompt) {
    return __awaiter(this, void 0, void 0, function* () {
        const completion = yield openai.createCompletion({
            model: "text-davinci-002",
            prompt: prompt
        });
        console.log(completion.data);
    });
}
_testGenScriptHardcoded();
