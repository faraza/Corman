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
const fs_extra_1 = __importDefault(require("fs-extra"));
const app_root_path_1 = __importDefault(require("app-root-path"));
const videotimeline_1 = require("./videotimeline");
const actor_1 = require("../CommonClasses/actor");
const ANIMATION_FPS = 10;
function animateVideoTimeline(videoTimeline, assets) {
    return __awaiter(this, void 0, void 0, function* () {
        const fileManager = new AnimationFileManager(assets.movieID);
        //TODO: Gen folders for each shot and drop background image there
        videoTimeline.cameraTrack.forEach((cameraShot) => {
            animateShot(cameraShot, fileManager);
        });
        //TODO: Copy all of the frames into a single folder, and rename the frames appropriately
        //TODO: Generate video
    });
}
exports.animateVideoTimeline = animateVideoTimeline;
/**
 *
 */
function animateShot(camerashot, animationFileManager) {
    return __awaiter(this, void 0, void 0, function* () {
        const backgroundImage = animationFileManager.getShotBackgroundImage(camerashot);
        const shotFolder = animationFileManager.getShotDirectory(camerashot);
        const backgroundOut = shotFolder + "/processedShot.png";
        const compositedOut = shotFolder + "/processedShot_composited.png";
        const animatedOut = shotFolder + "/animated_frames/";
        yield fs_extra_1.default.ensureDir(animatedOut);
        yield generateShotBackground(backgroundImage, camerashot.shotType, backgroundOut);
        if ((0, videotimeline_1.isTwoShot)(camerashot.shotType)) {
            yield addStaticCharacterToFrame(backgroundOut, camerashot, compositedOut);
            yield animateSpeakingCharacter(compositedOut, camerashot, animatedOut);
        }
        else {
            yield animateSpeakingCharacter(backgroundOut, camerashot, animatedOut);
        }
    });
}
/**
 * TODO: Make this handle speaking character not being in frame
 * This must be called after the shot background has already been generated, or it will throw an error!
 * @param cameraShot
 * @param outputFolder
 */
function animateSpeakingCharacter(frameImage, cameraShot, outputFolder) {
    return __awaiter(this, void 0, void 0, function* () {
        const characterInfo = getCharacterShotInfo({ cameraShot, isSpeaker: true });
        const characterPosition = getCharacterPosition(characterInfo);
        const numberOfFrames = Math.round((cameraShot.endTime - cameraShot.startTime) / 1000 * ANIMATION_FPS);
        let curMouthPosition = -1;
        const animationPromises = [];
        for (let frameNum = 0; frameNum < numberOfFrames; frameNum++) {
            if (curMouthPosition === -1)
                curMouthPosition = 0; //Just for the first one
            else if (curMouthPosition === 0)
                curMouthPosition = 1;
            else if (curMouthPosition === 2)
                curMouthPosition = 1;
            else if (Math.random() > .5)
                curMouthPosition = 2;
            else
                curMouthPosition = 0;
            const characterImage = getCharacterImageFolder(characterInfo) + curMouthPosition + ".png";
            const outputFile = outputFolder + frameNum + ".png";
            const addCharPromise = addCharacterToFrame({ frameImage: frameImage, characterImage: characterImage, position: characterPosition, outputFile: outputFile, blur: 0 });
            animationPromises.push(addCharPromise);
        }
        yield Promise.all(animationPromises);
    });
}
function addCharacterToFrame({ frameImage, characterImage, position, outputFile, blur }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (blur > 0) {
            yield (0, sharp_1.default)(frameImage)
                .composite([
                { input: characterImage, top: position.distanceFromTop, left: position.distanceFromLeft }
            ])
                .blur(blur) //TODO: Figure out why this is not working on composited part of image
                .toFile(outputFile);
        }
        else {
            yield (0, sharp_1.default)(frameImage)
                .composite([
                { input: characterImage, top: position.distanceFromTop, left: position.distanceFromLeft }
            ])
                .toFile(outputFile);
        }
    });
}
function addStaticCharacterToFrame(frameImage, cameraShot, outputFile) {
    return __awaiter(this, void 0, void 0, function* () {
        const characterInfo = getCharacterShotInfo({ cameraShot, isSpeaker: false });
        const characterImage = getCharacterImageFolder(characterInfo) + "1.png";
        const characterPosition = getCharacterPosition(characterInfo);
        yield addCharacterToFrame({ frameImage: frameImage, characterImage: characterImage, position: characterPosition, outputFile: outputFile, blur: 0 });
    });
}
function getCharacterShotInfo({ cameraShot, isSpeaker }) {
    const nonSpeakingActor = (cameraShot.speakingActorID === actor_1.ActorID.Jennifer) ? actor_1.ActorID.Sarah : actor_1.ActorID.Jennifer;
    const actorID = isSpeaker ? cameraShot.speakingActorID : nonSpeakingActor;
    const emotion = actor_1.ActorEmotion.Neutral; //TODO: Need to include that in the cameraShot
    const isPrimary = (actorID === (0, actor_1.getPrimaryActor)());
    const shotType = cameraShot.shotType;
    return { actorID: actorID, emotion: emotion, isPrimary: isPrimary, shotType: shotType };
}
//TODO
function getCharacterImageFolder(charShotInfo) {
    const charactersFolder = app_root_path_1.default + "/Assets/static_assets/characters";
    const charName = charShotInfo.isPrimary ? "maho" : "suzuha";
    if (charShotInfo.shotType === videotimeline_1.ShotType.OTS_primaryActor && !charShotInfo.isPrimary) {
        return charactersFolder + "/" + charName + "/back/";
    }
    else if (charShotInfo.shotType === videotimeline_1.ShotType.OTS_secondaryActor && charShotInfo.isPrimary) {
        return charactersFolder + "/" + charName + "/back/";
    }
    const emotion = "neutral"; //TODO
    const shotType = convertShotTypeToFolderName(charShotInfo.shotType);
    return charactersFolder + "/" + charName + "/" + shotType + "/" + emotion + "/";
}
function convertShotTypeToFolderName(shotType) {
    switch (shotType) {
        case videotimeline_1.ShotType.OTS_primaryActor: return "ots";
        case videotimeline_1.ShotType.OTS_secondaryActor: return "ots";
        case videotimeline_1.ShotType.closeup_primaryActor: return "closeup";
        case videotimeline_1.ShotType.closeup_secondaryActor: return "closeup";
        case videotimeline_1.ShotType.wideshot: return "wide";
    }
}
//TODO: Figure out param
function getCharacterPosition(characterInfo) {
    if (characterInfo.shotType === videotimeline_1.ShotType.OTS_primaryActor) {
        if (characterInfo.isPrimary)
            return { distanceFromLeft: 310, distanceFromTop: 170 };
        else
            return { distanceFromLeft: 20, distanceFromTop: 100 };
    }
    else if (characterInfo.shotType === videotimeline_1.ShotType.OTS_secondaryActor) {
        if (characterInfo.isPrimary)
            return { distanceFromLeft: -20, distanceFromTop: 100 };
        else
            return { distanceFromLeft: 330, distanceFromTop: 100 };
    }
    else if (characterInfo.shotType === videotimeline_1.ShotType.wideshot) { //TODO
        if (characterInfo.isPrimary)
            return { distanceFromLeft: -20, distanceFromTop: 100 };
        else
            return { distanceFromLeft: 330, distanceFromTop: 100 };
    }
    else if (characterInfo.shotType === videotimeline_1.ShotType.closeup_primaryActor) { //TODO
        if (!characterInfo.isPrimary) {
            console.log("ERROR -- Animator.ts::getCharacterPosition. Character is not primary. Character Info: ", characterInfo);
            return { distanceFromLeft: -1000, distanceFromTop: -1000 };
        }
        else {
            return { distanceFromLeft: 0, distanceFromTop: 150 };
        }
    }
    else if (characterInfo.shotType === videotimeline_1.ShotType.closeup_secondaryActor) { //TODO
        if (characterInfo.isPrimary) {
            console.log("ERROR -- Animator.ts::getCharacterPosition. Character is not secondary. Character Info: ", characterInfo);
            return { distanceFromLeft: -1000, distanceFromTop: -1000 };
        }
        else {
            return { distanceFromLeft: 330, distanceFromTop: 100 };
        }
    }
    console.log("ERROR -- Animator.ts::getCharacterPosition. Unknown shot type: ", characterInfo);
    return { distanceFromLeft: -1000, distanceFromTop: -1000 };
}
//TODO: Figure out params
function generateShotBackground(imageFile, shotType, outputFile) {
    return __awaiter(this, void 0, void 0, function* () {
        if (shotType === videotimeline_1.ShotType.wideshot) { //TODO: Do some stuff w/ cropping so it looks different from OTS. But it's fine for now
            yield (0, sharp_1.default)(imageFile)
                .blur(1)
                .toFile(outputFile);
        }
        else if (shotType === videotimeline_1.ShotType.OTS_primaryActor) {
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
    getShotDirectory(cameraShot) {
        const sceneNumber = cameraShot.sceneNumber;
        const shotNumber = cameraShot.shotNumber;
        const directoryPath = this.getRootFilePath() + "/scenes/" + sceneNumber + "/shots/" + shotNumber;
        //TODO: Make directory path
        return directoryPath;
    }
    getShotBackgroundImage(cameraShot) {
        return this.getRootFilePath() + "/scenes/" + cameraShot.sceneNumber + "/background.png";
    }
    getRootFilePath() {
        return app_root_path_1.default + "/Assets/dynamic_assets/" + this.movieID;
    }
}
function _testAddCharToFrame() {
    return __awaiter(this, void 0, void 0, function* () {
        //Intermediate    
        //TODO
        const frame_int = "/Users/farazabidi/Documents/Corman/Assets/dynamic_assets/testassets1/scenes/0/shots/0/processedshot.png";
        const charImage_int = "/Users/farazabidi/Documents/Corman/Assets/static_assets/characters/maho/back/1.png";
        const position_int = { distanceFromTop: 100, distanceFromLeft: 10 };
        const output_int = "/Users/farazabidi/Documents/Corman/Assets/dynamic_assets/testassets1/scenes/0/shots/0/finalizedshotbackground.png";
        yield addCharacterToFrame({ frameImage: frame_int, characterImage: charImage_int, position: position_int, outputFile: output_int, blur: 0 });
        //Actual frame
        const frameImage_actual = "/Users/farazabidi/Documents/Corman/Assets/dynamic_assets/testassets1/scenes/0/shots/0/finalizedshotbackground.png";
        const characterImage_actual = "/Users/farazabidi/Documents/Corman/Assets/static_assets/characters/maho/ots/neutral/0.png"; //TODO: Also factor in size
        const position_actual = { distanceFromTop: 160, distanceFromLeft: 300 };
        const outputFile_actual = "/Users/farazabidi/Documents/Corman/Assets/dynamic_assets/testassets1/scenes/0/shots/0/frame1.png";
        addCharacterToFrame({ frameImage: frameImage_actual, characterImage: characterImage_actual, position: position_actual, outputFile: outputFile_actual, blur: 0 });
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
        yield addStaticCharacterToFrame(backgroundImage, shot1, out1);
    });
}
function _testAnimateSpeakingCharacter() {
    return __awaiter(this, void 0, void 0, function* () {
        const frameImage = "/Users/farazabidi/Documents/Corman/Assets/dynamic_assets/testassets1/scenes/0/shots/0/finalShot.png";
        const backgroundImage = "/Users/farazabidi/Documents/Corman/Assets/dynamic_assets/testassets1/scenes/0/background.png";
        const shot1 = _getTestShot(backgroundImage);
        const outFolder = "/Users/farazabidi/Documents/Corman/Assets/dynamic_assets/testassets1/scenes/0/shots/0/animated_frames/";
        yield animateSpeakingCharacter(frameImage, shot1, outFolder);
    });
}
function _getTestShot(backgroundImagePath) {
    const startTime = 0;
    const endTime = 4000;
    const shotNumber = 0;
    const sceneNumber = 0;
    const isPrimary = true;
    const actorID = isPrimary ? (0, actor_1.getPrimaryActor)() : (0, actor_1.getSecondaryActor)();
    const shotType = videotimeline_1.ShotType.closeup_primaryActor;
    const shot = { shotType: shotType, backgroundImagePath: backgroundImagePath, startTime: startTime, endTime: endTime, speakingActorID: actorID, shotNumber: shotNumber, sceneNumber: sceneNumber };
    return shot;
}
function _testAnimateShot() {
    return __awaiter(this, void 0, void 0, function* () {
        const backgroundImage = "/Users/farazabidi/Documents/Corman/Assets/dynamic_assets/testassets1/scenes/0/shots/0/finalShot.png"; //TODO: Use filemanager
        const shot = _getTestShot(backgroundImage);
        const fileManager = new AnimationFileManager("testassets2");
        animateShot(shot, fileManager);
    });
}
_testAnimateShot();
