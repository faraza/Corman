"use strict";
exports.__esModule = true;
exports.VideoTimeline = exports.createVideoTimeline = void 0;
function createVideoTimeline(assets, audioTimeline) {
    var videoTimeline = new VideoTimeline();
    for (var lineNumber = 0; lineNumber < audioTimeline.dialogueTrack.length; lineNumber++) {
        var curDialog = audioTimeline.dialogueTrack[lineNumber];
        var cameraShot = { shotType: pickShot(), backgroundImagePath: curDialog.filePath,
            startTime: curDialog.startTime, endTime: curDialog.endTime, speakingActorID: curDialog.speakingActorID };
        videoTimeline.addShotToEndOfTimeline(cameraShot);
    }
    return videoTimeline;
}
exports.createVideoTimeline = createVideoTimeline;
var VideoTimeline = /** @class */ (function () {
    function VideoTimeline() {
        this.cameraTrack = [];
        this.curTimelineLength = 0;
    }
    VideoTimeline.prototype.addShotToEndOfTimeline = function (shot) {
        this.curTimelineLength += (shot.endTime - shot.startTime);
        this.cameraTrack.push(shot);
    };
    return VideoTimeline;
}());
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
