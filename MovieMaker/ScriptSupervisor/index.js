"use strict";
/**
 * This class takes a written script and parses out all the relevant information.
 * It gets locations, dialogue
 */
class ScriptSupervisor {
    /**
     * Returns Dialogue object
     * @param sceneNumber
     * @param lineNumber
     * @returns
     */
    getDialogue(sceneNumber, lineNumber) {
        //TODO
        return new Dialogue();
    }
    getSceneLocation(sceneNumber) {
        //TODO
        return "";
    }
    getNumberOfScenes() {
        //TODO
        return 0;
    }
    getNumberOfLinesOfDialogue(sceneNumber) {
        //TODO
        return 0;
    }
    parseScript(script) {
        //TODO
    }
}
class Dialogue {
    constructor() {
        this.actorName = "";
        this.lineNumber = 0;
        this.words = "";
    }
}
