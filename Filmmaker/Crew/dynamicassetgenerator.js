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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicAssetManager = exports.DynamicAssetGenerator = void 0;
const screenwriter_1 = require("./screenwriter");
const scriptsupervisor_1 = require("../CommonClasses/scriptsupervisor");
const setdesigner_1 = require("./setdesigner");
const voiceoverartist_1 = require("./voiceoverartist");
const uuid_1 = require("uuid");
const dialogue_1 = require("../CommonClasses/dialogue");
const app_root_path_1 = __importDefault(require("app-root-path"));
/**
 * TODO: No need for this to be a class. Just break it down into functions
 */
class DynamicAssetGenerator {
    /**
     * TODO: Also support user written script
     * TODO: Also include movieID so we don't have to rebuild certain assets
     * @param prompt short prompt user enters
     */
    constructor() {
        this.movieID = (0, uuid_1.v4)() + Date.now();
        this.assetManager = new DynamicAssetManager(this.movieID);
    }
    generateAssetsFromPrompt({ prompt }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.generateScript({ prompt });
            return this.generateAssetsFromScript({ script: this.assetManager.getScript() });
        });
    }
    generateAssetsFromScript({ script }) {
        return __awaiter(this, void 0, void 0, function* () {
            this.assetManager.setScript(script);
            yield Promise.all([this.generateLocations(), this.generateVoicedDialoge()]);
            return this.assetManager;
        });
    }
    __generateDummyAssets(timeToGenerate) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((res, rej) => {
                setTimeout(() => {
                    this.assetManager._setDummyAssets();
                    res(this.assetManager);
                }, timeToGenerate);
            });
        });
    }
    generateScript({ prompt }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.assetManager.prompt = prompt;
                console.log("DAG::generateScript 1");
                const script = yield (0, screenwriter_1.generateScript)(prompt, this.assetManager.getScriptFilepath());
                console.log("DAG::generateScript 2");
                this.assetManager.setScript(script);
                console.log("DAG::generateScript 3");
            }
            catch (error) {
                console.log("ERROR - DAG::generateScript: ", error);
            }
        });
    }
    generateLocations() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("DAG::generateLocations");
            let locationGenPromises = [];
            for (let sceneNumber = 0; sceneNumber < this.assetManager.scriptSupervisor.getNumberOfScenes(); sceneNumber++) {
                const locationName = this.assetManager.scriptSupervisor.getSceneLocation(sceneNumber);
                locationGenPromises.push((0, setdesigner_1.generateImage)(locationName, this.assetManager.getLocationImageFilepath(sceneNumber)));
            }
            yield Promise.all(locationGenPromises);
            console.log("DAG::generateLocations - DONE");
        });
    }
    generateVoicedDialoge() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("DAG::generatedVoicedDialogue");
            let voiceGenPromises = [];
            for (let sceneNumber = 0; sceneNumber < this.assetManager.scriptSupervisor.getNumberOfScenes(); sceneNumber++) {
                for (let lineNumber = 0; lineNumber < this.assetManager.scriptSupervisor.getNumberOfLinesOfDialogue(sceneNumber); lineNumber++) {
                    const dialogue = this.assetManager.scriptSupervisor.getDialogue(sceneNumber, lineNumber);
                    voiceGenPromises.push((0, voiceoverartist_1.generateTTS)(dialogue, this.assetManager.getRecordedDialogueFilepath(sceneNumber, lineNumber)));
                }
            }
            const allRecordedDialogue = yield Promise.all(voiceGenPromises);
            this.assetManager.setAllRecordedDialogue(allRecordedDialogue);
            console.log("DAG::generatedVoicedDialogue - DONE");
        });
    }
}
exports.DynamicAssetGenerator = DynamicAssetGenerator;
/**
 * This class just stores all the stuff that's generated and gives convenient functions for accessing them.
 * Not really any logic going on here
 * TODO: Port this to common classes
 */
class DynamicAssetManager {
    /**
     *
     * @param movieID Unique identifier that describes the movie. Uses this for folder naming
     */
    constructor(movieID) {
        this.movieID = "";
        this.script = "";
        this.allRecordedDialogue = [];
        this.movieID = movieID;
        this.scriptSupervisor = new scriptsupervisor_1.ScriptSupervisor();
    }
    /**
     * Method for testing
     */
    _setDummyAssets() {
        this.movieID = "testassets1";
        this.scriptSupervisor._generateDummy();
        const sceneNumber = 0;
        for (let i = 0; i < this.scriptSupervisor.getNumberOfLinesOfDialogue(sceneNumber); i++) {
            const rawDialogue = this.scriptSupervisor.getDialogue(sceneNumber, i);
            const recordedDialogue = { rawDialogue: rawDialogue, filepath: "dummyFilepath", duration: 4000 };
            this.allRecordedDialogue.push(recordedDialogue);
        }
    }
    //TODO: Do we need to do file extensions?
    getLocationImageFilepath(sceneNumber) {
        return this.getRootFilePath() + "locations/" + sceneNumber;
    }
    /**
     *
     * @param sceneNumber the order of the scene in the script. Each time a new location is set, that is a new scene number
     * @param lineNumber Each new character speech heading increments the line by 1. Narrator lines also count.
     *
     * Returns the filepath to that piece of audio
     */
    getRecordedDialogueFilepath(sceneNumber, lineNumber) {
        return this.getRootFilePath() + "dialogue/" + sceneNumber + "_" + lineNumber;
    }
    setAllRecordedDialogue(allRecordedDialogue) {
        this.allRecordedDialogue = allRecordedDialogue;
    }
    getRecordedDialogue(sceneNumber, lineNumber) {
        const foundDialogue = this.allRecordedDialogue.find((recordedDialogue) => {
            return (recordedDialogue.rawDialogue.lineNumber === lineNumber && recordedDialogue.rawDialogue.sceneNumber === sceneNumber);
        });
        if (foundDialogue)
            return foundDialogue;
        console.log("ERROR -- DynamicAssetManager::getRecordedDialogue - not found. Scene Number: ", sceneNumber, " lineNumber: ", lineNumber, " Returning random");
        return (0, dialogue_1.getDummyRecordedDialogue)();
    }
    getScript() {
        return this.script;
    }
    setScript(script) {
        this.scriptSupervisor.loadScript(script, this.getScriptSupervisorFilepath());
        this.script = script;
    }
    getScriptFilepath() {
        return this.getRootFilePath() + "script/script";
    }
    getScriptSupervisorFilepath() {
        return this.getRootFilePath + "script/scriptSupervisor";
    }
    getRootFilePath() {
        return app_root_path_1.default + "/Assets/dynamic_assets/" + this.movieID + "/";
    }
    /**
     * TODO: Refactor this to a more fitting location?
     * @returns
     */
    getGeneratedMovieDirectory() {
        return app_root_path_1.default + "/output_animation/" + this.movieID + "/";
    }
}
exports.DynamicAssetManager = DynamicAssetManager;
