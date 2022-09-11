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
        const prompt = hardcodedShortFilmPrompt;
        const response = yield sendPromptToServer(openai, prompt);
        console.log("Response: ", response);
    });
}
function sendPromptToServer(openai, prompt) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const completion = yield openai.createCompletion({
            model: "text-davinci-002",
            prompt: prompt,
            max_tokens: 400
        });
        console.log(completion.data);
        if (!completion.data.choices) {
            throw ("No choices returned");
        }
        const response = completion.data.choices[0].text;
        return (_a = response === null || response === void 0 ? void 0 : response.trim()) !== null && _a !== void 0 ? _a : "";
    });
}
const hardcodedShortFilmPrompt = `Write a short film about a King who wants to travel to the stars in 5 scenes. Give a location, a description, and dialogue

Scene 1
-Location: King's Chambers
-Description: The King is in his chambers, looking at the stars. He longs to be up there, among them. He has heard tales of other worlds and wonders what it would be like to visit them.
-Dialogue:
King: I want to go to the stars.
Advisor: But your majesty. That is impossible with today's technology.
King: Then we must find a way. I will not be content to stay here on this world my whole life. There must be something out there for me.

Scene 2
-Location: Public Square
-Description: The King is talking to his subjects, telling them of his plans to travel to the stars. Some believe him, others think he is crazy.`;
_testGenScriptHardcoded();
