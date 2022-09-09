"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPrimaryActor = exports.ActorEmotion = exports.getActorIDFromName = exports.ActorID = void 0;
/**
 * This correlates to both Voice and Actor Image
 */
var ActorID;
(function (ActorID) {
    ActorID["Sarah"] = "sarah";
    ActorID["Jennifer"] = "jennifer";
})(ActorID = exports.ActorID || (exports.ActorID = {}));
function getActorIDFromName(characterName) {
    //TODO
    return ActorID.Sarah;
}
exports.getActorIDFromName = getActorIDFromName;
var ActorEmotion;
(function (ActorEmotion) {
    ActorEmotion[ActorEmotion["Happy"] = 0] = "Happy";
    ActorEmotion[ActorEmotion["Neutral"] = 1] = "Neutral";
    ActorEmotion[ActorEmotion["Sad"] = 2] = "Sad";
})(ActorEmotion = exports.ActorEmotion || (exports.ActorEmotion = {}));
function isPrimaryActor(actor) {
    return actor === ActorID.Sarah;
}
exports.isPrimaryActor = isPrimaryActor;
