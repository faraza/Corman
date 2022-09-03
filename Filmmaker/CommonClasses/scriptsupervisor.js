"use strict";
exports.__esModule = true;
exports.ScriptSupervisor = void 0;
var actor_1 = require("./actor");
var dialogue_1 = require("./dialogue");
/**
 * This class takes a written script and parses out all the relevant information and gives easy access to it for other classes
 * E.g. what are the locations, dialogueLines, etc
 */
//TODO: Make constructor require script 
var ScriptSupervisor = /** @class */ (function () {
    function ScriptSupervisor() {
        this.allDialogue = [];
        this.sceneNames = [];
    }
    /**
     * Returns Dialogue object
     * @param sceneNumber - 0 indexed
     * @param lineNumber - 0 indexed
     * @returns
     */
    ScriptSupervisor.prototype.getDialogue = function (sceneNumber, lineNumber) {
        this.allDialogue.forEach(function (dialogue) {
            if (dialogue.sceneNumber === sceneNumber && dialogue.lineNumber === lineNumber)
                return dialogue;
        });
        console.log("ERROR - ScriptSupervisor::getDialogue. Not found for scene: ", sceneNumber, " line: ", lineNumber);
        return (0, dialogue_1.getDummyRawDialogue)(); //TODO: Throw error
    };
    ScriptSupervisor.prototype.getSceneLocation = function (sceneNumber) {
        if (sceneNumber >= this.sceneNames.length) {
            console.log("ERROR - ScriptSupervisor::getSceneLocation. Requested a scene number that is too high: ", sceneNumber, " Total scenes: ", this.sceneNames.length); //TODO: Throw error
            return "ERROR SCENE";
        }
        return this.sceneNames[sceneNumber];
    };
    ScriptSupervisor.prototype.getNumberOfScenes = function () {
        return this.sceneNames.length;
    };
    ScriptSupervisor.prototype.getNumberOfLinesOfDialogue = function (sceneNumber) {
        var numberOfLines = 0;
        this.allDialogue.forEach(function (dialogue) {
            if (dialogue.sceneNumber === sceneNumber)
                numberOfLines++;
        });
        return numberOfLines;
    };
    /**
     * Parses the script and fills in all of the variables. NOTE - this class should not be called until you've done this!
     * Also saves the ScriptSupervisor object to disk for debugging
     * @param script
     */
    ScriptSupervisor.prototype.loadScript = function (script, filepath) {
        //TODO
    };
    ScriptSupervisor.prototype._generateDummy = function () {
        this.sceneNames = ["dummyscene"];
        var dummyDialogue = { actorID: actor_1.ActorID.Jennifer, sceneNumber: 0, lineNumber: 0, words: "Dummy words" };
        this.allDialogue = [dummyDialogue];
    };
    return ScriptSupervisor;
}());
exports.ScriptSupervisor = ScriptSupervisor;
