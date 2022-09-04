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
const videotimeline_1 = require("./videotimeline");
const actor_1 = require("../CommonClasses/actor");
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
        }
    });
}
function animateSpeakingCharacter(cameraShot, outputFolder) {
    return __awaiter(this, void 0, void 0, function* () {
        const frameImage = getCameraShotFolder(cameraShot) + "finalShot.png";
        const characterInfo = getCharacterShotInfo({ cameraShot, isSpeaker: true });
        const characterPosition = getCharacterPosition(characterInfo);
        const numberOfFrames = Math.round((cameraShot.endTime - cameraShot.startTime) / 1000 * ANIMATION_FPS);
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
            const characterImage = getCharacterImageFolder(characterInfo) + curMouthPosition + ".png";
            const outputFile = outputFolder + frameNum + ".png";
            yield addCharacterToFrame(frameImage, characterImage, characterPosition, outputFile); //TODO: Convert into promise chain
        }
    });
}
//Assumes that the static image (cut + blurred background, static character) has already been generated
//TODO: Character directory should be the directory for the character in that shot. It should factor in the character's size and whether or not the character is in motion
//TODO: Remember to make all directories before calling these
function addCharacterToFrame(frameImage, characterImage, position, outputFile) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, sharp_1.default)(frameImage)
            .composite([
            { input: characterImage, top: position.distanceFromTop, left: position.distanceFromLeft }
        ])
            .toFile(outputFile);
    });
}
function addStaticCharacterToFrame(cameraShot, outputFile) {
    return __awaiter(this, void 0, void 0, function* () {
        const frameImage = getCameraShotFolder(cameraShot) + "processedShot.png";
        const characterInfo = getCharacterShotInfo({ cameraShot, isSpeaker: false });
        console.log("addStaticCharacterToFrame. Info: ", characterInfo);
        const characterImage = getCharacterImageFolder(characterInfo) + "1.png";
        const characterPosition = getCharacterPosition(characterInfo);
        yield addCharacterToFrame(frameImage, characterImage, characterPosition, outputFile);
    });
}
function getCharacterShotInfo({ cameraShot, isSpeaker }) {
    const nonSpeakingActor = (cameraShot.speakingActorID === actor_1.ActorID.Jennifer) ? actor_1.ActorID.Sarah : actor_1.ActorID.Jennifer;
    const actorID = isSpeaker ? cameraShot.speakingActorID : nonSpeakingActor;
    const emotion = actor_1.ActorEmotion.Neutral; //TODO: Need to include that in the cameraShot
    const isPrimary = (actorID === (0, actor_1.getPrimaryActor)());
    const shotType = cameraShot.shotType;
    console.log("GetCharacterShotInfo. Speaker: " + cameraShot.speakingActorID + " Nonspeaker: " + nonSpeakingActor);
    return { actorID: actorID, emotion: emotion, isPrimary: isPrimary, shotType: shotType };
}
//TODO
function getCameraShotFolder(cameraShot) {
    //TODO
    return "/Users/farazabidi/Documents/Corman/Assets/dynamic_assets/testassets1/scenes/0/shots/0/";
}
//TODO
function getCharacterImageFolder(characterInfo) {
    //TODO: Factor in all the other stuff
    if (characterInfo.isPrimary) {
        return "/Users/farazabidi/Documents/Corman/Assets/static_assets/characters/maho/ots/neutral/";
    }
    else {
        return "/Users/farazabidi/Documents/Corman/Assets/static_assets/characters/maho/back/";
    }
}
//TODO
function getCharacterPosition(characterInfo) {
    //TODO: Factor in Shot type
    if (characterInfo.isPrimary)
        return { distanceFromLeft: 250, distanceFromTop: 100 };
    else
        return { distanceFromLeft: 50, distanceFromTop: 100 };
}
function generateShotBackground(imageFile, shotType, outputFile) {
    return __awaiter(this, void 0, void 0, function* () {
        if (shotType === videotimeline_1.ShotType.wideshot) { //TODO: Do some stuff w/ cropping so it looks different from OTS. But it's fine for now
            yield (0, sharp_1.default)(imageFile)
                .blur(1)
                .toFile(outputFile);
        }
        else if (shotType === videotimeline_1.ShotType.OTS_primaryActor) { //TODO: Shot that should be reversed
            yield (0, sharp_1.default)(imageFile)
                .blur(3) //TODO: Get right param        
                .toFile(outputFile);
        }
        else if (shotType === videotimeline_1.ShotType.OTS_secondaryActor) {
            yield (0, sharp_1.default)(imageFile)
                .blur(3) //TODO: Get right param
                .flop()
                .toFile(outputFile);
        }
        else if (shotType === videotimeline_1.ShotType.closeup_primaryActor) {
            yield (0, sharp_1.default)(imageFile)
                .extract({ left: 200, top: 100, width: 200, height: 200 }) //TODO: Figure out the right params
                .resize(512, 512)
                .blur(5)
                .toFile(outputFile);
        }
        else if (shotType === videotimeline_1.ShotType.closeup_secondaryActor) {
            yield (0, sharp_1.default)(imageFile)
                .extract({ left: 50, top: 100, width: 200, height: 200 }) //TODO: Figure out the right params        
                .resize(512, 512)
                .blur(5)
                .toFile(outputFile);
        }
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
function _testAddCharToFrame() {
    return __awaiter(this, void 0, void 0, function* () {
        //Intermediate    
        //TODO
        const frame_int = "/Users/farazabidi/Documents/Corman/Assets/dynamic_assets/testassets1/scenes/0/shots/0/processedshotbackground.png";
        const charImage_int = "/Users/farazabidi/Documents/Corman/Assets/static_assets/characters/maho/back/1.png";
        const position_int = { distanceFromTop: 100, distanceFromLeft: 10 };
        const output_int = "/Users/farazabidi/Documents/Corman/Assets/dynamic_assets/testassets1/scenes/0/shots/0/finalizedshotbackground.png";
        yield addCharacterToFrame(frame_int, charImage_int, position_int, output_int);
        //Actual frame
        const frameImage_actual = "/Users/farazabidi/Documents/Corman/Assets/dynamic_assets/testassets1/scenes/0/shots/0/finalizedshotbackground.png";
        const characterImage_actual = "/Users/farazabidi/Documents/Corman/Assets/static_assets/characters/maho/ots/neutral/0.png"; //TODO: Also factor in size
        const position_actual = { distanceFromTop: 160, distanceFromLeft: 300 };
        const outputFile_actual = "/Users/farazabidi/Documents/Corman/Assets/dynamic_assets/testassets1/scenes/0/shots/0/frame1.png";
        addCharacterToFrame(frameImage_actual, characterImage_actual, position_actual, outputFile_actual);
    });
}
function _testGenerateShot() {
    return __awaiter(this, void 0, void 0, function* () {
        const backgroundImage = "/Users/farazabidi/Documents/Corman/Assets/dynamic_assets/testassets1/scenes/0/background.png";
        const outbase = "/Users/farazabidi/Documents/Corman/Assets/dynamic_assets/testassets1/scenes/0/shots/0/rawshotbackground";
        const out1 = outbase + "_OTSPrimary.png";
        generateShotBackground(backgroundImage, videotimeline_1.ShotType.OTS_primaryActor, out1);
        const out2 = outbase + "_OTSSecondary.png";
        generateShotBackground(backgroundImage, videotimeline_1.ShotType.OTS_secondaryActor, out2);
        const out3 = outbase + "_closeupPrimary.png";
        generateShotBackground(backgroundImage, videotimeline_1.ShotType.closeup_primaryActor, out3);
        const out4 = outbase + "_closeupSecondary.png";
        generateShotBackground(backgroundImage, videotimeline_1.ShotType.closeup_secondaryActor, out4);
        const out5 = outbase + "_wideshot.png";
        generateShotBackground(backgroundImage, videotimeline_1.ShotType.wideshot, out5);
    });
}
function _testGenerateStatic() {
    return __awaiter(this, void 0, void 0, function* () {
        const backgroundImage = "/Users/farazabidi/Documents/Corman/Assets/dynamic_assets/testassets1/scenes/0/background.png";
        const startTime = 0;
        const endTime = 4000;
        const shotNumber = 0;
        const sceneNumber = 0;
        const isPrimary = false;
        const actorID = isPrimary ? (0, actor_1.getPrimaryActor)() : (0, actor_1.getSecondaryActor)();
        const speakingActor = actorID == (0, actor_1.getPrimaryActor)() ? (0, actor_1.getSecondaryActor)() : (0, actor_1.getPrimaryActor)(); //We can skip this but it's just to illustrate how we came up with it
        const out1 = "/Users/farazabidi/Documents/Corman/Assets/dynamic_assets/testassets1/scenes/0/shots/0/finalShot.png";
        const shotType1 = videotimeline_1.ShotType.OTS_primaryActor;
        const shot1 = { shotType: shotType1, backgroundImagePath: backgroundImage, startTime: startTime, endTime: endTime, speakingActorID: speakingActor, shotNumber: shotNumber, sceneNumber: sceneNumber };
        yield addStaticCharacterToFrame(shot1, out1);
    });
}
function _testAnimateSpeakingCharacter() {
    return __awaiter(this, void 0, void 0, function* () {
        const backgroundImage = "/Users/farazabidi/Documents/Corman/Assets/dynamic_assets/testassets1/scenes/0/shots/0/finalShot.png";
        const startTime = 0;
        const endTime = 4000;
        const shotNumber = 0;
        const sceneNumber = 0;
        const isPrimary = true;
        const actorID = isPrimary ? (0, actor_1.getPrimaryActor)() : (0, actor_1.getSecondaryActor)();
        const shotType1 = videotimeline_1.ShotType.OTS_primaryActor;
        const shot1 = { shotType: shotType1, backgroundImagePath: backgroundImage, startTime: startTime, endTime: endTime, speakingActorID: actorID, shotNumber: shotNumber, sceneNumber: sceneNumber };
        const outFolder = "/Users/farazabidi/Documents/Corman/Assets/dynamic_assets/testassets1/scenes/0/shots/0/animated_frames/";
        yield animateSpeakingCharacter(shot1, outFolder);
    });
}
// _testAnimateSpeakingCharacter()
_testGenerateStatic();
