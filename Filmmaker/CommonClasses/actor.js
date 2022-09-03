"use strict";
exports.__esModule = true;
exports.getActorIDFromName = exports.ActorID = void 0;
/**
 * This correlates to both Voice and Actor Image
 */
var ActorID;
(function (ActorID) {
    ActorID[ActorID["Sarah"] = 0] = "Sarah";
    ActorID[ActorID["Jennifer"] = 1] = "Jennifer";
})(ActorID = exports.ActorID || (exports.ActorID = {}));
function getActorIDFromName(characterName) {
    //TODO
    return ActorID.Sarah;
}
exports.getActorIDFromName = getActorIDFromName;
