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
exports.DynamicAssetManager = exports.DynamicAssetGenerator = void 0;
const Script_1 = require("./Script");
const ScriptSupervisor_1 = require("../ScriptSupervisor");
const Images_1 = require("./Images");
const Audio_1 = require("./Audio");
const appRoot = require('app-root-path');
/**
 * TODO: No need for this to be a class. Just break it down into functions
 */
class DynamicAssetGenerator {
    /**
     * TODO: Also support user written script
     * TODO: Also include movieID so we don't have to rebuild certain assets
     * @param prompt short prompt user enters
     */
    constructor(prompt) {
        this.movieID = "001"; //TODO: Dynamically generate
        this.prompt = prompt;
        this.assetManager = new DynamicAssetManager(this.movieID);
    }
    generateAssets() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.generateScript();
            yield Promise.all([this.generateLocations(), this.generateVoicedDialoge()]);
            this.assetManager;
        });
    }
    generateScript() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("DAG::generateScript 1");
                const script = yield (0, Script_1.generateScript)(this.prompt, this.assetManager.getScriptFilepath());
                console.log("DAG::generateScript 2");
                this.assetManager.scriptSupervisor.loadScript(script, this.assetManager.getScriptSupervisorFilepath());
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
                locationGenPromises.push((0, Images_1.generateImage)(locationName, this.assetManager.getLocationImageFilepath(sceneNumber)));
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
                    voiceGenPromises.push((0, Audio_1.generateTTS)(dialogue.words, dialogue.getActorVoiceID(), this.assetManager.getRecordedDialogueFilepath(sceneNumber, lineNumber)));
                }
            }
            yield Promise.all(voiceGenPromises);
            console.log("DAG::generatedVoicedDialogue - DONE");
        });
    }
}
exports.DynamicAssetGenerator = DynamicAssetGenerator;
/**
 * This class just stores all the stuff that's generated and gives convenient functions for accessing them.
 * Not really any logic going on here
 */
class DynamicAssetManager {
    /**
     *
     * @param movieID Unique identifier that describes the movie. Uses this for folder naming
     */
    constructor(movieID) {
        this.script = "";
        this.movieID = "";
        this.movieID = movieID;
        this.scriptSupervisor = new ScriptSupervisor_1.ScriptSupervisor();
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
    getScript() {
        return this.script;
    }
    setScript(script) {
        this.script = script;
    }
    getScriptFilepath() {
        return this.getRootFilePath() + "script/script";
    }
    getScriptSupervisorFilepath() {
        return this.getRootFilePath + "script/scriptSupervisor";
    }
    getRootFilePath() {
        return appRoot + "/Assets/dynamic_assets/" + this.movieID + "/";
    }
}
exports.DynamicAssetManager = DynamicAssetManager;
