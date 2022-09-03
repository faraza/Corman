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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.animateVideoTimeline = void 0;
const sharp_1 = __importDefault(require("sharp"));
const app_root_path_1 = __importDefault(require("app-root-path"));
const ANIMATION_FPS = 10;
function animateVideoTimeline(videoTimeline, assets) {
    return __awaiter(this, void 0, void 0, function* () {
        //TODO: Generate shot backgrounds - need to cut background image location to do that
        //TODO: Blur shot background (if appropriate)
        //TODO: Add secondary character to shot (if appropriate)
        const fileManager = new AnimationFileManager(assets.movieID);
        videoTimeline.cameraTrack.forEach((cameraShot) => {
            animateShot(cameraShot);
        });
        //TODO: Copy all of the frames into a single folder, and rename the frames appropriately
        //TODO: Generate video
    });
}
exports.animateVideoTimeline = animateVideoTimeline;
/**
 *
 * @param backgroundImageFilepath Make sure you've cut the image to match the shot you want. That image file path will be passed here
 * @param characterImageDirectory The directory that contains the character in the angle and the emotion that you want
 * @param timeInMS //How many ms to animate for
 * @param fileoutputDirectory //Folder to drop the final video file in
 */
function animateShot(camerashot) {
    return __awaiter(this, void 0, void 0, function* () {
        //Get number of frames - 
        //For each frame, choose a mouth position
        //Add the character to the frame
        const numberOfFrames = Math.round((camerashot.endTime - camerashot.startTime) / 1000 * ANIMATION_FPS);
        let curMouthPosition = 0;
        for (let frameNum = 0; frameNum < numberOfFrames; frameNum++) {
            if (curMouthPosition == 0)
                curMouthPosition = 1;
            else if (curMouthPosition == 2)
                curMouthPosition = 1;
            else if (Math.random() > .5)
                curMouthPosition = 2;
            else
                curMouthPosition = 0;
            //TODO: Create file folder if it doesn't exist
            const frameImageLocation = "";
            // addCharacterToFrame(curMouthPosition, fileoutputlocation)
        }
    });
}
/**
 * TODO: Also include emotion
 * @param actorID
 * @param isPrimary irrelevant for wideshot, but for OTS this is the character who is facing us. Usually the speaking character.
 */
function getCharacterDirectory(cameraShot, isPrimary) {
    return ""; //TODO
}
//Assumes that the static image (cut + blurred background, static character) has already been generated
//TODO: Character directory should be the directory for the character in that shot. It should factor in the character's size and whether or not the character is in motion
//TODO: Remember to make all directories before calling these
function addCharToFrame(frameImage, characterImage, position, outputFile) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, sharp_1.default)(frameImage)
            .composite([
            { input: characterImage, top: position.distanceFromTop, left: position.distanceFromLeft }
        ])
            .toFile(outputFile);
    });
}
class AnimationFileManager {
    constructor(movieID) {
        this.movieID = movieID;
    }
    /**
     * Returns path to directory for this shot
     * @param sceneNumber
     * @param shotNumber
     */
    getShotDirectoryPath(sceneNumber, shotNumber) {
        return this.getRootFilePath() + "shots/" + sceneNumber + "/" + shotNumber + "/";
    }
    getShotImageFileLocation(cameraShot) {
        return cameraShot.backgroundImagePath; //TODO: Return actual cut version of this
    }
    getRootFilePath() {
        return app_root_path_1.default + "/Assets/dynamic_assets/" + this.movieID + "/intermediateAnimations/";
    }
}
const _hardcodedBackgroundImageFilepath = "/Users/farazabidi/Documents/Corman/Assets/dynamic_assets/testassets1/locations/1.png";
const _hardcodedOutputFileDirectory = "/Users/farazabidi/Documents/Corman/output_animation/";
function _testAddCharToFrame() {
    return __awaiter(this, void 0, void 0, function* () {
        //Intermediate    
        //TODO
        const frame_int = "/Users/farazabidi/Documents/Corman/Assets/dynamic_assets/testassets1/scenes/0/shots/0/processedshotbackground.png";
        const charImage_int = "/Users/farazabidi/Documents/Corman/Assets/static_assets/characters/maho/back/1.png";
        const position_int = { distanceFromTop: 100, distanceFromLeft: 10 };
        const output_int = "/Users/farazabidi/Documents/Corman/Assets/dynamic_assets/testassets1/scenes/0/shots/0/finalizedshotbackground.png";
        yield addCharToFrame(frame_int, charImage_int, position_int, output_int);
        //Actual frame
        const frameImage_actual = "/Users/farazabidi/Documents/Corman/Assets/dynamic_assets/testassets1/scenes/0/shots/0/finalizedshotbackground.png";
        const characterImage_actual = "/Users/farazabidi/Documents/Corman/Assets/static_assets/characters/maho/ots/neutral/0.png"; //TODO: Also factor in size
        const position_actual = { distanceFromTop: 160, distanceFromLeft: 300 };
        const outputFile_actual = "/Users/farazabidi/Documents/Corman/Assets/dynamic_assets/testassets1/scenes/0/shots/0/frame1.png";
        addCharToFrame(frameImage_actual, characterImage_actual, position_actual, outputFile_actual);
    });
}
_testAddCharToFrame();
