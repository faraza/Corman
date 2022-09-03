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
exports.DynamicAssetManager = exports.DynamicAssetGenerator = void 0;
var screenwriter_1 = require("./screenwriter");
var scriptsupervisor_1 = require("../CommonClasses/scriptsupervisor");
var setdesigner_1 = require("./setdesigner");
var voiceoverartist_1 = require("./voiceoverartist");
var uuid_1 = require("uuid");
var dialogue_1 = require("../CommonClasses/dialogue");
var appRoot = require('app-root-path');
/**
 * TODO: No need for this to be a class. Just break it down into functions
 */
var DynamicAssetGenerator = /** @class */ (function () {
    /**
     * TODO: Also support user written script
     * TODO: Also include movieID so we don't have to rebuild certain assets
     * @param prompt short prompt user enters
     */
    function DynamicAssetGenerator() {
        this.movieID = uuid_1.v4() + Date.now();
        this.assetManager = new DynamicAssetManager(this.movieID);
    }
    DynamicAssetGenerator.prototype.generateAssetsFromPrompt = function (_a) {
        var prompt = _a.prompt;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.generateScript({ prompt: prompt })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, this.generateAssetsFromScript({ script: this.assetManager.getScript() })];
                }
            });
        });
    };
    DynamicAssetGenerator.prototype.generateAssetsFromScript = function (_a) {
        var script = _a.script;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.assetManager.setScript(script);
                        return [4 /*yield*/, Promise.all([this.generateLocations(), this.generateVoicedDialoge()])];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, this.assetManager];
                }
            });
        });
    };
    DynamicAssetGenerator.prototype.__generateDummyAssets = function (timeToGenerate) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (res, rej) {
                        setTimeout(function () {
                            _this.assetManager._setDummyAssets();
                            res(_this.assetManager);
                        }, timeToGenerate);
                    })];
            });
        });
    };
    DynamicAssetGenerator.prototype.generateScript = function (_a) {
        var prompt = _a.prompt;
        return __awaiter(this, void 0, void 0, function () {
            var script, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        this.assetManager.prompt = prompt;
                        console.log("DAG::generateScript 1");
                        return [4 /*yield*/, screenwriter_1.generateScript(prompt, this.assetManager.getScriptFilepath())];
                    case 1:
                        script = _b.sent();
                        console.log("DAG::generateScript 2");
                        this.assetManager.setScript(script);
                        console.log("DAG::generateScript 3");
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        console.log("ERROR - DAG::generateScript: ", error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DynamicAssetGenerator.prototype.generateLocations = function () {
        return __awaiter(this, void 0, void 0, function () {
            var locationGenPromises, sceneNumber, locationName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("DAG::generateLocations");
                        locationGenPromises = [];
                        for (sceneNumber = 0; sceneNumber < this.assetManager.scriptSupervisor.getNumberOfScenes(); sceneNumber++) {
                            locationName = this.assetManager.scriptSupervisor.getSceneLocation(sceneNumber);
                            locationGenPromises.push(setdesigner_1.generateImage(locationName, this.assetManager.getLocationImageFilepath(sceneNumber)));
                        }
                        return [4 /*yield*/, Promise.all(locationGenPromises)];
                    case 1:
                        _a.sent();
                        console.log("DAG::generateLocations - DONE");
                        return [2 /*return*/];
                }
            });
        });
    };
    DynamicAssetGenerator.prototype.generateVoicedDialoge = function () {
        return __awaiter(this, void 0, void 0, function () {
            var voiceGenPromises, sceneNumber, lineNumber, dialogue, allRecordedDialogue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("DAG::generatedVoicedDialogue");
                        voiceGenPromises = [];
                        for (sceneNumber = 0; sceneNumber < this.assetManager.scriptSupervisor.getNumberOfScenes(); sceneNumber++) {
                            for (lineNumber = 0; lineNumber < this.assetManager.scriptSupervisor.getNumberOfLinesOfDialogue(sceneNumber); lineNumber++) {
                                dialogue = this.assetManager.scriptSupervisor.getDialogue(sceneNumber, lineNumber);
                                voiceGenPromises.push(voiceoverartist_1.generateTTS(dialogue, this.assetManager.getRecordedDialogueFilepath(sceneNumber, lineNumber)));
                            }
                        }
                        return [4 /*yield*/, Promise.all(voiceGenPromises)];
                    case 1:
                        allRecordedDialogue = _a.sent();
                        this.assetManager.setAllRecordedDialogue(allRecordedDialogue);
                        console.log("DAG::generatedVoicedDialogue - DONE");
                        return [2 /*return*/];
                }
            });
        });
    };
    return DynamicAssetGenerator;
}());
exports.DynamicAssetGenerator = DynamicAssetGenerator;
/**
 * This class just stores all the stuff that's generated and gives convenient functions for accessing them.
 * Not really any logic going on here
 */
var DynamicAssetManager = /** @class */ (function () {
    /**
     *
     * @param movieID Unique identifier that describes the movie. Uses this for folder naming
     */
    function DynamicAssetManager(movieID) {
        this.script = "";
        this.movieID = "";
        this.allRecordedDialogue = [];
        this.movieID = movieID;
        this.scriptSupervisor = new scriptsupervisor_1.ScriptSupervisor();
    }
    /**
     * Method for testing
     */
    DynamicAssetManager.prototype._setDummyAssets = function () {
        this.movieID = "testassets1";
        this.scriptSupervisor._generateDummy();
        var sceneNumber = 0;
        for (var i = 0; i < this.scriptSupervisor.getNumberOfLinesOfDialogue(sceneNumber); i++) {
            var rawDialogue = this.scriptSupervisor.getDialogue(sceneNumber, i);
            var recordedDialogue = { rawDialogue: rawDialogue, filepath: "dummyFilepath", duration: 4000 };
            this.allRecordedDialogue.push(recordedDialogue);
        }
    };
    //TODO: Do we need to do file extensions?
    DynamicAssetManager.prototype.getLocationImageFilepath = function (sceneNumber) {
        return this.getRootFilePath() + "locations/" + sceneNumber;
    };
    /**
     *
     * @param sceneNumber the order of the scene in the script. Each time a new location is set, that is a new scene number
     * @param lineNumber Each new character speech heading increments the line by 1. Narrator lines also count.
     *
     * Returns the filepath to that piece of audio
     */
    DynamicAssetManager.prototype.getRecordedDialogueFilepath = function (sceneNumber, lineNumber) {
        return this.getRootFilePath() + "dialogue/" + sceneNumber + "_" + lineNumber;
    };
    DynamicAssetManager.prototype.setAllRecordedDialogue = function (allRecordedDialogue) {
        this.allRecordedDialogue = allRecordedDialogue;
    };
    DynamicAssetManager.prototype.getRecordedDialogue = function (sceneNumber, lineNumber) {
        this.allRecordedDialogue.forEach(function (recordedDialogue) {
            if (recordedDialogue.rawDialogue.lineNumber === lineNumber && recordedDialogue.rawDialogue.sceneNumber === sceneNumber)
                return recordedDialogue;
        });
        console.log("ERROR -- DynamicAssetManager::getRecordedDialogue - not found. Scene Number: ", sceneNumber, " lineNumber: ", lineNumber, " Returning random");
        return dialogue_1.getDummyRecordedDialogue();
    };
    DynamicAssetManager.prototype.getScript = function () {
        return this.script;
    };
    DynamicAssetManager.prototype.setScript = function (script) {
        this.scriptSupervisor.loadScript(script, this.getScriptSupervisorFilepath());
        this.script = script;
    };
    DynamicAssetManager.prototype.getScriptFilepath = function () {
        return this.getRootFilePath() + "script/script";
    };
    DynamicAssetManager.prototype.getScriptSupervisorFilepath = function () {
        return this.getRootFilePath + "script/scriptSupervisor";
    };
    DynamicAssetManager.prototype.getRootFilePath = function () {
        return appRoot + "/Assets/dynamic_assets/" + this.movieID + "/";
    };
    return DynamicAssetManager;
}());
exports.DynamicAssetManager = DynamicAssetManager;
