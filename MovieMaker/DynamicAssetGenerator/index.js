"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicAssetGenerator = void 0;
const Script_1 = require("./Script");
const ScriptSupervisor_1 = require("../ScriptSupervisor");
class DynamicAssetGenerator {
    /**
     * TODO: Also support user written script
     * TODO: Also include movieID so we don't have to rebuild certain assets
     * @param prompt short prompt user enters
     */
    constructor(prompt) {
        this.prompt = prompt;
        this.assetManager = new DynamicAssetManager();
        this.scriptSupervisor = new ScriptSupervisor_1.ScriptSupervisor();
    }
    generateAssets() {
        this.generateScript(); //TODO: Convert into promise chain
        this.generateLocations();
        this.generateVoicedDialoge();
        return this.assetManager;
    }
    //TODO: Make all of these properly async
    generateScript() {
        const script = (0, Script_1.generateScript)(this.prompt);
        this.scriptSupervisor.loadScript(script);
        this.assetManager.setScript(script);
    }
    generateLocations() {
        console.log("DAG::generateLocations");
        //TODO: Call imageGenerator from IG class, passing it getAllLocations from DAM.scriptSupervisor
        //TODO: Give location images to DAM
    }
    generateVoicedDialoge() {
        //TODO: Call generate voices from Voice 
        //TODO: Give audio files to DAM
    }
}
exports.DynamicAssetGenerator = DynamicAssetGenerator;
/**
 * This class just stores all the stuff that's generated and gives convenient functions for accessing them.
 * Not really any logic going on here
 */
class DynamicAssetManager {
    constructor() {
        this.script = "";
        /**
         * For that scene number in the script, what is the location image associated with it? This will return that
         * returns the filepath
         * @param sceneNumber the order of the scene in the script. Each time a new location is set, that is a new scene number
         */
    }
    getLocationImage(sceneNumber) {
        return "";
    }
    /**
     *
     * @param sceneNumber the order of the scene in the script. Each time a new location is set, that is a new scene number
     * @param lineNumber Each new character speech heading increments the line by 1. Narrator lines also count.
     *
     * Returns the filepath to that piece of audio
     */
    getRecordedDialogue(sceneNumber, lineNumber) {
        return "";
    }
    getScript() {
        return this.script;
    }
    setScript(script) {
        this.script = script;
    }
    setLocationImages() {
        //TODO:
    }
    setVoicedDialogueFiles() {
        //TODO: 
    }
}
