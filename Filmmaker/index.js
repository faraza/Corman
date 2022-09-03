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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.makeMovieFromScript = exports.makeMovieFromPrompt = void 0;
// const DynamicAssetGenerator = require('./DynamicAssetGenerator')
var dynamicassetgenerator_1 = require("./Crew/dynamicassetgenerator");
var Postproduction_1 = require("./Postproduction");
/**
 * Calls entire pipeline
 * @returns path to movie video file
 * //TODO: Should also return movieID
 */
function makeMovieFromPrompt(prompt) {
    return __awaiter(this, void 0, void 0, function () {
        var dag, assets;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("MovieMaker::makeMovieFromPrompt 2: ", prompt);
                    dag = new dynamicassetgenerator_1.DynamicAssetGenerator();
                    return [4 /*yield*/, dag.__generateDummyAssets(1000)];
                case 1:
                    assets = _a.sent();
                    return [4 /*yield*/, Postproduction_1.createMovie(assets)];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
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
    return __awaiter(this, void 0, void 0, function () {
        var pathToMovieFile;
        return __generator(this, function (_a) {
            pathToMovieFile = "";
            return [2 /*return*/, pathToMovieFile];
        });
    });
}
exports.makeMovieFromScript = makeMovieFromScript;
