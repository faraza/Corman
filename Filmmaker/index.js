"use strict";
/**
 * This is the abstraction layer for users to make requests to the MovieMaking pipepline
 *
 * This calls two classes:
 *  1) The generation pipeline, which generates assets like Background Images, Script, and Voices
 *  2) The directing pipeline, which chooses the shots, animates the movie, adds sounds (like score, SFX, and voices), and creates the final video
 *
 * Keep things clean and simple here. Most of the logic should take place within the relevant classes in those folders.
 */
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
exports.makeMovieFromScript = exports.makeMovieFromPrompt = void 0;
// const DynamicAssetGenerator = require('./DynamicAssetGenerator')
const dynamicassetgenerator_1 = require("./Crew/dynamicassetgenerator");
const Postproduction_1 = require("./Postproduction");
/**
 * Calls entire pipeline
 * @returns path to movie video file
 * //TODO: Should also return movieID
 */
function makeMovieFromPrompt(prompt) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("MovieMaker::makeMovieFromPrompt 2: ", prompt);
        const dag = new dynamicassetgenerator_1.DynamicAssetGenerator();
        // dag.generateAssetsFromPrompt({prompt: prompt}) //TODO
        const assets = yield dag.__generateDummyAssets(100);
        return yield (0, Postproduction_1.createMovie)(assets);
    });
}
exports.makeMovieFromPrompt = makeMovieFromPrompt;
/**
 * (Should) only call parts of pipeline that need to be regenerated based on what has changed in the script.
 * That's why it takes movieID as param - the generator pipeline will check its existing assets w/ that movieID and reuse the ones that still apply.
 *
 * @returns path to movie video file
 * //TODO: Should also return movieID
 */
function makeMovieFromScript(script, movieID) {
    return __awaiter(this, void 0, void 0, function* () {
        //TODO
        const pathToMovieFile = "";
        return pathToMovieFile;
    });
}
exports.makeMovieFromScript = makeMovieFromScript;
module.exports.makeMovieFromPrompt = makeMovieFromPrompt;
module.exports.makeMovieFromScript = makeMovieFromScript;
// makeMovieFromPrompt("Blah blah")
