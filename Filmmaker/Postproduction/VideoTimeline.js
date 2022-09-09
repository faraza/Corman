"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTwoShot = exports.ShotType = exports.VideoTimeline = exports.createVideoTimeline = void 0;
const dialogue_1 = require("../CommonClasses/dialogue");
function createVideoTimeline(assets, audioTimeline) {
    const videoTimeline = new VideoTimeline();
    let shotNumber = 0;
    for (let lineNumber = 0; lineNumber < audioTimeline.dialogueTrack.length; lineNumber++) {
        const curDialog = audioTimeline.dialogueTrack[lineNumber];
        const dialogueAudio = curDialog.dialogue;
        if ((0, dialogue_1.isRecordedDialogue)(dialogueAudio)) {
            const backgroundImagePath = assets.getLocationImageFilepath(dialogueAudio.rawDialogue.sceneNumber);
            const cameraShot = { shotType: pickShot(), backgroundImagePath: backgroundImagePath,
                startTime: curDialog.startTime, endTime: curDialog.startTime + curDialog.dialogue.duration,
                speakingActorID: dialogueAudio.rawDialogue.actorID, shotNumber: shotNumber++, sceneNumber: dialogueAudio.rawDialogue.sceneNumber };
            videoTimeline.addShotToEndOfTimeline(cameraShot);
        }
        //TODO: Support empty dialogue
    }
    return videoTimeline;
}
exports.createVideoTimeline = createVideoTimeline;
class VideoTimeline {
    constructor() {
        this.cameraTrack = [];
        this.curTimelineLength = 0;
    }
    addShotToEndOfTimeline(shot) {
        this.curTimelineLength += (shot.endTime - shot.startTime);
        this.cameraTrack.push(shot);
    }
}
exports.VideoTimeline = VideoTimeline;
var ShotType;
(function (ShotType) {
    ShotType[ShotType["wideshot"] = 0] = "wideshot";
    ShotType[ShotType["OTS_primaryActor"] = 1] = "OTS_primaryActor";
    ShotType[ShotType["closeup_primaryActor"] = 2] = "closeup_primaryActor";
    ShotType[ShotType["OTS_secondaryActor"] = 3] = "OTS_secondaryActor";
    ShotType[ShotType["closeup_secondaryActor"] = 4] = "closeup_secondaryActor";
})(ShotType = exports.ShotType || (exports.ShotType = {}));
function isTwoShot(shot) {
    if (shot === ShotType.wideshot)
        return true;
    if (shot === ShotType.OTS_primaryActor)
        return true;
    if (shot === ShotType.OTS_secondaryActor)
        return true;
    return false;
}
exports.isTwoShot = isTwoShot;
function pickShot() {
    return Math.random() * 4; //TODO: Set shot based on heuristics
}
