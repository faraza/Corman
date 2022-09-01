"use strict";
const Script = require('./Script');
/**
 * Start generation w/
 */
class DynamicAssetGenerator {
    //TODO: Dynamic Asset Manager
    /**
     * TODO: Also support user written script
     * TODO: Also include movieID so we don't have to rebuild certain assets
     * @param prompt short prompt user enters
     */
    constructor(prompt) {
        this.assetManager = new DynamicAssetManager;
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
        this.scriptSupervisor.setScript(script); //TODO
        this.assetManager.setScript(script);
        return Promise.resolve();
    }
    generateLocations() {
        //TODO: Call imageGenerator from IG class, passing it getAllLocations from DAM.scriptSupervisor
        //TODO: Give location images to DAM
        return Promise.resolve();
    }
    generateVoicedDialoge() {
        //TODO: Call generate voices from Voice 
        //TODO: Give audio files to DAM
        return Promise.resolve();
    }
}
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
