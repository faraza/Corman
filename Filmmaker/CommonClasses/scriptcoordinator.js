"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScriptCoordinator = void 0;
const actor_1 = require("./actor");
const dialogue_1 = require("./dialogue");
/**
 * This class takes a written script and parses out all the relevant information and gives easy access to it for other classes
 * E.g. what are the locations, dialogueLines, etc
 */
//TODO: Make constructor require script 
class ScriptCoordinator {
    constructor() {
        this.allDialogue = [];
        this.sceneNames = [];
    }
    /**
     * Returns Dialogue object
     * @param sceneNumber - 0 indexed
     * @param lineNumber - 0 indexed
     * @returns
     */
    getDialogue(sceneNumber, lineNumber) {
        const foundDialogue = this.allDialogue.find((dialogue) => {
            return (dialogue.sceneNumber === sceneNumber && dialogue.lineNumber === lineNumber);
        });
        if (foundDialogue)
            return foundDialogue;
        console.log("ERROR - ScriptSupervisor::getDialogue. Not found for scene: ", sceneNumber, " line: ", lineNumber);
        return (0, dialogue_1.getDummyRawDialogue)(); //TODO: Throw error 
    }
    getSceneLocation(sceneNumber) {
        if (sceneNumber >= this.sceneNames.length) {
            console.log("ERROR - ScriptSupervisor::getSceneLocation. Requested a scene number that is too high: ", sceneNumber, " Total scenes: ", this.sceneNames.length); //TODO: Throw error
            return "ERROR SCENE";
        }
        return this.sceneNames[sceneNumber];
    }
    getNumberOfScenes() {
        return this.sceneNames.length;
    }
    getNumberOfLinesOfDialogue(sceneNumber) {
        let numberOfLines = 0;
        this.allDialogue.forEach((dialogue) => {
            if (dialogue.sceneNumber === sceneNumber)
                numberOfLines++;
        });
        return numberOfLines;
    }
    /**
     * Parses the script and fills in all of the variables. NOTE - this class should not be called until you've done this!
     * Also saves the ScriptSupervisor object to disk for debugging
     * @param script
     */
    loadScript(script, filepath) {
        //TODO
    }
    _generateDummy() {
        this.sceneNames = ["dummyscene"];
        const dummyDialogue = { actorID: actor_1.ActorID.Jennifer, sceneNumber: 0, lineNumber: 0, words: "Dummy words" };
        this.allDialogue = [dummyDialogue];
    }
}
exports.ScriptCoordinator = ScriptCoordinator;
