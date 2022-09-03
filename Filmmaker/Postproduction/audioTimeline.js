"use strict";
exports.__esModule = true;
exports.AudioTimeline = exports.createAudioTimeline = void 0;
function createAudioTimeline(assets) {
    var timeline = new AudioTimeline();
    for (var curScene = 0; curScene < assets.scriptSupervisor.getNumberOfScenes(); curScene++) {
        for (var curDialogueLine = 0; curDialogueLine < assets.scriptSupervisor.getNumberOfLinesOfDialogue(curScene); curDialogueLine++) {
            var recordedDialogue = assets.getRecordedDialogue(curScene, curDialogueLine);
            timeline.addDialogueToEnd(recordedDialogue);
        }
    }
    return timeline;
}
exports.createAudioTimeline = createAudioTimeline;
var AudioTimeline = /** @class */ (function () {
    function AudioTimeline() {
        this.dialogueTrack = [];
        this.curTimelineLength = 0;
    }
    AudioTimeline.prototype.addDialogueToEnd = function (dialogue) {
        var timelineAudio = { dialogue: dialogue, startTime: this.curTimelineLength };
        this.dialogueTrack.push(timelineAudio);
        this.curTimelineLength += dialogue.duration;
    };
    return AudioTimeline;
}());
exports.AudioTimeline = AudioTimeline;
