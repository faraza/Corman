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
const promptstuffer_1 = require("./promptstuffer");
function generateScript(scriptTitle, filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const config = new openai_1.Configuration({ apiKey: secrets_1.gpt3Key });
        const openai = new openai_1.OpenAIApi(config);
        const prompt = promptstuffer_1.hardcodedPromptOpener + scriptTitle + promptstuffer_1.hardcodedPromptCloser;
        const script = yield sendPromptToServer(openai, prompt);
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
function _testGenScript() {
    return __awaiter(this, void 0, void 0, function* () {
        const filmTitle = "Invent time travel";
        const response = yield generateScript(filmTitle, "fakeFilePath");
        console.log("Response: ", response);
    });
}
function sendPromptToServer(openai, prompt) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Send prompt to server: ", prompt);
        const completion = yield openai.createCompletion({
            model: "text-davinci-002",
            // model: "davinci:ft-personal-2022-09-12-00-42-06",
            prompt: prompt,
            max_tokens: 1000,
            frequency_penalty: 0,
            temperature: 0.7,
            top_p: 1.0,
            presence_penalty: 1.2,
            stop: ["END", "##"]
        });
        console.log(completion.data);
        if (!completion.data.choices) {
            throw ("No choices returned");
        }
        const response = completion.data.choices[0].text;
        return (_a = response === null || response === void 0 ? void 0 : response.trim()) !== null && _a !== void 0 ? _a : "";
    });
}
_testGenScript();
