import { RawDialogue, RecordedDialogue } from "../CommonClasses/dialogue"
import { ActorID } from "../CommonClasses/actor"

export async function generateTTS(dialogue: RawDialogue, fileOutputLocation: string): Promise<void>{
    //TODO: Figure out when to add duration to RecordedDialogue. Is it right here?
    //TODO
    await _getDummyTTSFromServer()          
}

//TODO: Batch generate TTS

function _getDummyTTSFromServer(): Promise<void>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve()
        }, 3000)
    })
}

function getTTSParamsFromActorID(actorID: ActorID){ 
    //TODO
}