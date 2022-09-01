"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicAssetGenerator = void 0;
const Script = require('./Script');
const ScriptSupervisor = require('../ScriptSupervisor');
class DynamicAssetGenerator {
    /**
     * TODO: Also support user written script
     * TODO: Also include movieID so we don't have to rebuild certain assets
     * @param prompt short prompt user enters
     */
    constructor(prompt) {
        this.assetManager = new DynamicAssetManager; //TODO: Figure out type bs
        this.scriptSupervisor = new ScriptSupervisor; //TODO: Figure out type bs
        this.prompt = prompt;
    }
    generateAssets() {
        this.generateScript(); //TODO: Convert into promise chain
        this.generateLocations();
        this.generateVoicedDialoge();
        return this.assetManager;
    }
    //TODO: Make all of these properly async
    generateScript() {
        const script = Script.generateScript(prompt);
        this.scriptSupervisor.setScript(script);
        this.assetManager.setScript(script);
    }
    generateLocations() {
        console.log("DAG::generateLocations");
        for (let i = 0; i < this.scriptSupervisor.blah; i++) {
            //TODO
        }
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
