"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoTimeline = exports.createVideoTimeline = void 0;
const dialogue_1 = require("../CommonClasses/dialogue");
function createVideoTimeline(assets, audioTimeline) {
    const videoTimeline = new VideoTimeline();
    for (let lineNumber = 0; lineNumber < audioTimeline.dialogueTrack.length; lineNumber++) {
        const curDialog = audioTimeline.dialogueTrack[lineNumber];
        const dialogueAudio = curDialog.dialogue;
        if ((0, dialogue_1.isRecordedDialogue)(dialogueAudio)) {
            const backgroundImagePath = assets.getLocationImageFilepath(dialogueAudio.rawDialogue.sceneNumber);
            const cameraShot = { shotType: pickShot(), backgroundImagePath: backgroundImagePath,
                startTime: curDialog.startTime, endTime: curDialog.startTime + curDialog.dialogue.duration, speakingActorID: dialogueAudio.rawDialogue.actorID };
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
    ShotType[ShotType["OTS_activeSpeaker"] = 0] = "OTS_activeSpeaker";
    ShotType[ShotType["wideshot"] = 1] = "wideshot";
    ShotType[ShotType["closeup_activeSpeaker"] = 2] = "closeup_activeSpeaker";
    ShotType[ShotType["OTS_inactiveSpeaker"] = 3] = "OTS_inactiveSpeaker";
    ShotType[ShotType["closeup_inactiveSpeaker"] = 4] = "closeup_inactiveSpeaker";
})(ShotType || (ShotType = {}));
function pickShot() {
    return Math.random() * 3; //TODO: Set shot based on heuristics
}
