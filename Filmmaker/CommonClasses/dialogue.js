"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDummyRecordedDialogue = exports.getDummyRawDialogue = exports.isRecordedDialogue = void 0;
const actor_1 = require("./actor");
function isRecordedDialogue(dialogue) {
    if (dialogue.rawDialogue)
        return true;
    return false;
}
exports.isRecordedDialogue = isRecordedDialogue;
function getDummyRawDialogue() {
    return { actorID: actor_1.ActorID.Sarah, sceneNumber: 1, lineNumber: 1, words: "dummy words" };
}
exports.getDummyRawDialogue = getDummyRawDialogue;
function getDummyRecordedDialogue() {
    return {
        rawDialogue: getDummyRawDialogue(),
        filepath: "dummyfilePath",
        duration: 1234
    };
}
exports.getDummyRecordedDialogue = getDummyRecordedDialogue;
