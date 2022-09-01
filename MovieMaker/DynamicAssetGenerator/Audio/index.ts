
export async function generateTTS(textToSpeak: string, voiceID: number, fileOutputLocation: string){ //TODO: Make async
    await _getDummyTTSFromServer(textToSpeak, voiceID, fileOutputLocation)    
}

function _getDummyTTSFromServer(textToSpeak: string, voiceID: number, fileOutputLocation: string): Promise<void>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve()
        }, 3000)
    })
}