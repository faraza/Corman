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
/**
 * Creates the full movie from all assets, making choices about shot selection
 */
function createMovie(assets) {
    return __awaiter(this, void 0, void 0, function* () {
        const audioTimeline = (0, AudioTimeline_1.createAudioTimeline)(assets);
        const videoTimeline = createVideoTimeline(assets, audioTimeline);
        return yield constructMovie(audioTimeline, videoTimeline);
    });
}
exports.createMovie = createMovie;
function createVideoTimeline(assets, audioTimeline) {
    //TODO: Decide shots
    //TODO: Animate 
    const timeline = new VideoTimeline();
    return timeline;
}
function constructMovie(audioTimeline, videoTimeline) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
class VideoTimeline {
}
