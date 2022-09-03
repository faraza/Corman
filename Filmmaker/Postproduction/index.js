"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMovie = void 0;
const audiotimeline_1 = require("./audiotimeline");
const videotimeline_1 = require("./videotimeline");
const animator_1 = require("./animator");
/**
 * Creates the full movie from all assets, making choices about shot selection
 * Returns filepath to video
 */
function createMovie(assets) {
    return __awaiter(this, void 0, void 0, function* () {
        const audioTimeline = (0, audiotimeline_1.createAudioTimeline)(assets);
        const videoTimeline = (0, videotimeline_1.createVideoTimeline)(assets, audioTimeline);
        yield animateAndMix(audioTimeline, videoTimeline, assets);
        return ""; //TODO
    });
}
exports.createMovie = createMovie;
function animateAndMix(audioTimeline, videoTimeline, assets) {
    return __awaiter(this, void 0, void 0, function* () {
        yield animateVideoTimeline(videoTimeline, assets);
        yield addAudioToAnimatedVideo(audioTimeline, assets);
    });
}
function animateVideoTimeline(videoTimeline, assets) {
    return __awaiter(this, void 0, void 0, function* () {
        videoTimeline.cameraTrack.forEach((cameraShot) => {
            const fileDirectory = assets.getAnimationOutputFolder(cameraShot.sceneNumber, cameraShot.shotNumber);
            const _backgroundImageFilePath = animator_1._hardcodedBackgroundImageFilepath; //TODO
            const _characterDirectory = animator_1._hardcodedCharacterFilePath;
            const shotLength = cameraShot.endTime - cameraShot.startTime;
            (0, animator_1.animateShot)({ backgroundImageFilepath: _backgroundImageFilePath, characterImageDirectory: _characterDirectory, timeInMS: shotLength, fileoutputDirectory: fileDirectory });
        });
        //TODO: Filepaths?
        //TODO: We're going to need to refactor and unify a bunch of types for this to be clean. Once we do that, actually doing the animation should be easy
        //Each shot in the video timeline needs to tell us ActiveSpeaker and shot location
        //We also don't want to regen the shot background everytime, so we should have a step that just does that once
    });
}
function addAudioToAnimatedVideo(audioTimeline, assets) {
    return __awaiter(this, void 0, void 0, function* () {
        //TODO: Filepaths?
    });
}
