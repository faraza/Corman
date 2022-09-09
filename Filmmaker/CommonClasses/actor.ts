/**
 * This correlates to both Voice and Actor Image
 */
export enum ActorID{
    Sarah = "sarah",
    Jennifer = "jennifer"
}

export function getActorIDFromName(characterName: string): ActorID{
    //TODO
    return ActorID.Sarah
}

export enum ActorEmotion{
    Happy,
    Neutral,
    Sad
}

export function isPrimaryActor(actor: ActorID): boolean{
    return actor === ActorID.Sarah
}