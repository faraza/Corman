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
exports.generateTTS = void 0;
const secrets_1 = require("../../secrets");
const azureTTS = __importStar(require("microsoft-cognitiveservices-speech-sdk"));
const fs = __importStar(require("fs"));
function generateTTS(dialogue, fileOutputLocation) {
    return __awaiter(this, void 0, void 0, function* () {
        yield _getDummyTTSFromServer();
        const audioDuration = 2000;
        return { rawDialogue: dialogue, filepath: fileOutputLocation, duration: audioDuration };
    });
}
exports.generateTTS = generateTTS;
//TODO: Batch generate TTS
function _getDummyTTSFromServer() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 3000);
    });
}
function getTTSParamsFromActorID(actorID) {
    //TODO
}
function _testHardcodedTTS(textToSpeak) {
    return __awaiter(this, void 0, void 0, function* () {
        const ttsConfig = azureTTS.SpeechConfig.fromSubscription(secrets_1.azureTTSKey, secrets_1.azureTTSRegion);
        ttsConfig.speechSynthesisOutputFormat = 5; // mp3
        const outfile = "/Users/farazabidi/Documents/Corman/Assets/dynamic_assets/testassets2/scenes/0/audio/tts1.mp3";
        const audioConfig = azureTTS.AudioConfig.fromAudioFileOutput(outfile);
        const synthesizer = new azureTTS.SpeechSynthesizer(ttsConfig, audioConfig);
        return new Promise((res, rej) => {
            synthesizer.speakTextAsync(textToSpeak, (result) => {
                const audioFile = fs.createReadStream(outfile);
                res(audioFile);
            }, error => {
                synthesizer.close();
                rej(error);
            });
        });
    });
}
console.log("VO Artist. TTS key : ", secrets_1.azureTTSKey);
_testHardcodedTTS("Microphone check one two what is this. The five foot assassin with the ruff neck business.").finally(() => {
    console.log("Done running VO");
});
