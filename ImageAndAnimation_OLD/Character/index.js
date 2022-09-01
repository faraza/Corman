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
exports.addCharacterToBackground = exports.animateCharacter = void 0;
const sharp_1 = __importDefault(require("sharp"));
const characterFilePath = "/Users/farazabidi/Documents/Corman/animation_assets/characters/maho/ots/neutral/";
const outputFilePath = "/Users/farazabidi/Documents/Corman/output_animation/";
let frameNumber = 0;
/**
 * TODO: This should be exported to a separate class called Animator
 */
function animateCharacter(backgroundImage) {
    //TODO: generate multiple
    addCharacterToBackground(1, backgroundImage);
}
exports.animateCharacter = animateCharacter;
//TODO: Take character info as param
function addCharacterToBackground(poseNumber, backgroundImage) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, sharp_1.default)(backgroundImage)
            .composite([
            { input: characterFilePath + poseNumber + ".png", top: 100, left: 200 }
        ])
            .toFile(outputFilePath + frameNumber++ + ".png");
        console.log("addCharacterToBackground. Filepath: " + (outputFilePath + (frameNumber - 1)));
    });
}
exports.addCharacterToBackground = addCharacterToBackground;
