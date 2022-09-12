import * as child from 'child_process'
import { stabilityKey } from '../../secrets';

export async function generateImage(imagePrompt: string, _fileOutputLocation: string): Promise<void>{    
    const pythonScriptPath = './ImageGeneratorPython/client.py' //TODO: Deal with file paths
    const scriptCommand = "export STABILITY_KEY=" + stabilityKey + " ; python3 " + pythonScriptPath + " -W 512 -H 512 \"" + imagePrompt + "\""
    return new Promise((res, rej)=>{
        child.exec(scriptCommand, (error, stdout: string, stderr: string) => {
            if(error){
                console.log("Error: ", error)
                rej(error)
            } 
            
            console.log("STDOUT: ", stdout);      
            console.log("STDERR: ", stderr)
            res()
        });
    })
    
}

function _getDummyImageFromServer(_prompt: string, _fileOutputLocation: string): Promise<void>{
    return new Promise((resolve, _reject)=>{
        setTimeout(()=>{
            resolve()
        }, 3000)
    })
}

async function _testGenerateImage(){
    console.log("TestGenerateImage")
    const prompt = "A flaming red sun"
    await generateImage(prompt, "")    
    console.log("Done running Test GenerateImage")
}

_testGenerateImage()