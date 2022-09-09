import { RawDialogue, RecordedDialogue } from "../CommonClasses/dialogue"
import { ActorID } from "../CommonClasses/actor"

import {azureTTSKey, azureTTSRegion} from '../../secrets'
import * as azureTTS from 'microsoft-cognitiveservices-speech-sdk'
import * as fs from 'fs'

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

async function _testHardcodedTTS(textToSpeak: string){
    const ttsConfig = azureTTS.SpeechConfig.fromSubscription(azureTTSKey, azureTTSRegion)
    ttsConfig.speechSynthesisOutputFormat = 5; // mp3
    const outfile = "/Users/farazabidi/Documents/Corman/Assets/dynamic_assets/testassets2/scenes/0/audio/tts1.mp3"
    const audioConfig = azureTTS.AudioConfig.fromAudioFileOutput(outfile)

    const synthesizer = new azureTTS.SpeechSynthesizer(ttsConfig, audioConfig)

    return new Promise((res, rej)=>{
        synthesizer.speakTextAsync(textToSpeak, (result)=>{
            const audioFile = fs.createReadStream(outfile)
            res(audioFile)
        },
        error=>{
            synthesizer.close()
            rej(error)
        })
    })    
}

console.log("VO Artist. TTS key : ", azureTTSKey)
_testHardcodedTTS("Microphone check one two what is this. The five foot assassin with the ruff neck business.").finally(()=>{
    console.log("Done running VO")
})
