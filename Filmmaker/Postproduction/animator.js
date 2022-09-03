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
exports.animateShot = void 0;
const animationFPS = 10;
/**
 *
 * @param backgroundImageFilepath Make sure you've cut the image to match the shot you want. That image file path will be passed here
 * @param characterImageDirectory The directory that contains the character in the angle and the emotion that you want
 * @param timeInMS //How many ms to animate for
 * @param fileoutputDirectory //Folder to drop all the files in. They will be named as 1,2,3,4 etc. for each frame. 1-indexed
 */
function animateShot({ backgroundImageFilepath, characterImageDirectory, timeInMS, fileoutputDirectory }) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Animator::animateShot. BackgroundImageFilePath: ", backgroundImageFilepath);
    });
}
exports.animateShot = animateShot;
