"use strict";
/**
 * This class takes a written script and parses out all the relevant information.
 * It gets locations, dialogue
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScriptSupervisor = void 0;
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
    /**
     * Parses the script and fills in all of the variables. NOTE - this class should not be called until you've done this!
     * @param script
     */
    loadScript(script) {
        //TODO
    }
}
exports.ScriptSupervisor = ScriptSupervisor;
class Dialogue {
    constructor() {
        this.actorName = "";
        this.lineNumber = 0;
        this.words = "";
    }
}
