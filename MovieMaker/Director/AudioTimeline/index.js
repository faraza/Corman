"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioTimeline = exports.createAudioTimeline = void 0;
function createAudioTimeline(assets) {
    const timeline = new AudioTimeline();
    for (let curScene = 0; curScene < assets.scriptSupervisor.getNumberOfScenes(); curScene++) {
        for (let curDialogueLine = 0; curDialogueLine < assets.scriptSupervisor.getNumberOfLinesOfDialogue(curScene); curDialogueLine++) {
            const dialogueFile = assets.getRecordedDialogueFilepath(curScene, curDialogueLine);
            const dialogueLength = 5; //TODO: Get this. Figure out if API returns this or if we have to parse it from file
            timeline.addDialogueToEnd(dialogueFile, dialogueLength, curScene);
        }
    }
    return timeline;
}
exports.createAudioTimeline = createAudioTimeline;
class AudioTimeline {
    constructor() {
        this.dialogueTrack = [];
        this.curTimelineLength = 0;
    }
    addDialogueToEnd(filePath, audioLength, sceneNumber) {
        const dialogue = new RecordedDialogue(this.curTimelineLength, this.curTimelineLength + audioLength, filePath, sceneNumber);
        this.dialogueTrack.push(dialogue);
        this.curTimelineLength += audioLength;
    }
}
exports.AudioTimeline = AudioTimeline;
class RecordedDialogue {
    //TODO: Add support for blank audio
    constructor(startTime, endTime, filePath, sceneNumber) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.filePath = filePath;
        this.sceneNumber = sceneNumber;
    }
}
