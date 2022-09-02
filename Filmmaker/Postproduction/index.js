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
const AudioTimeline_1 = require("./AudioTimeline");
const VideoTimeline_1 = require("./VideoTimeline");
/**
 * Creates the full movie from all assets, making choices about shot selection
 */
function createMovie(assets) {
    return __awaiter(this, void 0, void 0, function* () {
        const audioTimeline = (0, AudioTimeline_1.createAudioTimeline)(assets);
        const videoTimeline = (0, VideoTimeline_1.createVideoTimeline)(assets, audioTimeline);
        return yield constructMovie(audioTimeline, videoTimeline, assets);
    });
}
exports.createMovie = createMovie;
function constructMovie(audioTimeline, videoTimeline, assets) {
    return __awaiter(this, void 0, void 0, function* () {
        yield animateVideoTimeline(videoTimeline, assets);
        yield addAudioToAnimatedVideo(audioTimeline, assets);
    });
}
function animateVideoTimeline(videoTimeline, assets) {
    return __awaiter(this, void 0, void 0, function* () {
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
