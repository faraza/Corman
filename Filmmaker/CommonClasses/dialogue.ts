import { ActorID } from "./actor"

export type RawDialogue = {
    actorID: ActorID
    sceneNumber: number
    lineNumber: number
    words: string
}

export type RecordedDialogue = {
    rawDialogue: RawDialogue
    filepath: string
    duration: number //in ms
}

/**
 * Audio in timeline where no character should say anything
 */
export type EmptyDialogue = {
    duration: number //in ms
    sceneNumber: number
}

export function isRecordedDialogue(dialogue: RecordedDialogue | EmptyDialogue): dialogue is RecordedDialogue{
    if((dialogue as RecordedDialogue).rawDialogue)
        return true
    return false
}

export type TimelineAudio = {
    dialogue: RecordedDialogue | EmptyDialogue
    startTime: number        
}

export function getDummyRawDialogue(): RawDialogue{
    return {actorID: ActorID.Sarah, sceneNumber: 1, lineNumber: 1, words: "dummy words"}
}

export function getDummyRecordedDialogue(): RecordedDialogue{
    return {
        rawDialogue: getDummyRawDialogue(),
        filepath: "dummyfilePath",
        duration: 1234
    }
}