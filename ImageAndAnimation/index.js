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
exports.testCharacterMouthAnimation = exports.testBasicImageGen = void 0;
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const Character_1 = require("./Character");
const backgroundImageFilepath = "/Users/farazabidi/Documents/Corman/animation_assets/backgrounds/kings_chambers.png";
function testBasicImageGen() {
    console.log("Testing basic image gen");
    duplicateImage('/Users/farazabidi/Documents/Corman/animation_assets/backgrounds/kings_chambers.png');
}
exports.testBasicImageGen = testBasicImageGen;
function testCharacterMouthAnimation(numberOfMouthMovements = 50) {
    console.log("Testing character mouth animation");
    let curMouthNum = 0;
    for (let i = 0; i < numberOfMouthMovements; i++) {
        if (curMouthNum == 0)
            curMouthNum = 1;
        else if (curMouthNum == 2)
            curMouthNum = 1;
        else if (Math.random() > .5)
            curMouthNum = 2;
        else
            curMouthNum = 0;
        (0, Character_1.addCharacterToBackground)(curMouthNum, backgroundImageFilepath);
    }
}
exports.testCharacterMouthAnimation = testCharacterMouthAnimation;
function duplicateImage(pathToImage) {
    return __awaiter(this, void 0, void 0, function* () {
        const newPath = path_1.default.dirname(pathToImage) + "/" + path_1.default.parse(pathToImage).name + "_dup" + path_1.default.extname(pathToImage);
        yield (0, sharp_1.default)(pathToImage).toFile(newPath);
    });
}
