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
exports._hardcodedOutputFileDirectory = exports._hardcodedBackgroundImageFilepath = exports._hardcodedCharacterFilePath = exports.animateShot = void 0;
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const ANIMATION_FPS = 10;
/**
 *
 * @param backgroundImageFilepath Make sure you've cut the image to match the shot you want. That image file path will be passed here
 * @param characterImageDirectory The directory that contains the character in the angle and the emotion that you want
 * @param timeInMS //How many ms to animate for
 * @param fileoutputDirectory //Folder to drop all the files in. They will be named as 1,2,3,4 etc. for each frame. 1-indexed
 */
function animateShot({ backgroundImageFilepath, characterImageDirectory, timeInMS, fileoutputDirectory }) {
    return __awaiter(this, void 0, void 0, function* () {
        const numberOfFrames = Math.round(timeInMS / 1000 * ANIMATION_FPS);
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
            yield addCharacterToFrame({ mouthPosition: curMouthPosition, characterImageDirectory: characterImageDirectory, frameNumber: frameNum,
                fileoutputDirectory: fileoutputDirectory, backgroundImageFilepath: backgroundImageFilepath });
        }
    });
}
exports.animateShot = animateShot;
function addCharacterToFrame({ mouthPosition, characterImageDirectory, fileoutputDirectory, frameNumber, backgroundImageFilepath }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!fs_1.default.existsSync(fileoutputDirectory))
            fs_1.default.mkdirSync(fileoutputDirectory);
        yield (0, sharp_1.default)(backgroundImageFilepath)
            .composite([
            { input: characterImageDirectory + mouthPosition + ".png", top: 100, left: 200 }
        ])
            .toFile(fileoutputDirectory + frameNumber + ".png");
    });
}
exports._hardcodedCharacterFilePath = "/Users/farazabidi/Documents/Corman/Assets/static_assets/characters/maho/ots/neutral/";
exports._hardcodedBackgroundImageFilepath = "/Users/farazabidi/Documents/Corman/Assets/dynamic_assets/testassets1/locations/1.png";
exports._hardcodedOutputFileDirectory = "/Users/farazabidi/Documents/Corman/output_animation/";
function _testAnimation() {
    const timeInMS = 800;
    animateShot({ backgroundImageFilepath: exports._hardcodedBackgroundImageFilepath, characterImageDirectory: exports._hardcodedCharacterFilePath, timeInMS: timeInMS,
        fileoutputDirectory: exports._hardcodedOutputFileDirectory });
}
