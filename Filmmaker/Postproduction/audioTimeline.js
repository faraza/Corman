"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioTimeline = exports.createAudioTimeline = void 0;
function createAudioTimeline(assets) {
    const timeline = new AudioTimeline();
    for (let curScene = 0; curScene < assets.scriptSupervisor.getNumberOfScenes(); curScene++) {
        for (let curDialogueLine = 0; curDialogueLine < assets.scriptSupervisor.getNumberOfLinesOfDialogue(curScene); curDialogueLine++) {
            const recordedDialogue = assets.getRecordedDialogue(curScene, curDialogueLine);
            timeline.addDialogueToEnd(recordedDialogue);
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
    addDialogueToEnd(dialogue) {
        const timelineAudio = { dialogue: dialogue, startTime: this.curTimelineLength };
        this.dialogueTrack.push(timelineAudio);
        this.curTimelineLength += dialogue.duration;
    }
}
exports.AudioTimeline = AudioTimeline;
