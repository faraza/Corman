import { RawDialogue, RecordedDialogue } from "../CommonClasses/dialogue"
import { ActorID } from "../CommonClasses/actor"

export async function generateTTS(dialogue: RawDialogue, fileOutputLocation: string): Promise<RecordedDialogue>{
    
    await _getDummyTTSFromServer()          
    const audioDuration = 2000
    return {rawDialogue: dialogue, filepath: fileOutputLocation, duration: audioDuration}    
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