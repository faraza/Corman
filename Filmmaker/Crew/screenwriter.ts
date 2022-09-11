import { Configuration, OpenAIApi } from "openai";
import { gpt3Key } from "../../secrets";


export async function generateScript(prompt: string, filePath: string): Promise<string>{    
    const script = await _getDummyScriptFromServer(prompt) //TODO: Actually call server
    await writeScriptToDisk(prompt, filePath)
    return script        
}

function writeScriptToDisk(script: string, filePath: string): Promise<void>{
    return new Promise((res, rej)=>{
        setTimeout(()=>{
            res()
        }, 100)
    })
}

function _getDummyScriptFromServer(prompt: string): Promise<string>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve("Dummy script 1")
        }, 3000)
    })
}

async function _testGenScriptHardcoded(){
    console.log("_testGenScript 1")
    const config = new Configuration({apiKey: gpt3Key})
    const openai = new OpenAIApi(config);
    
    const prompt = "What are three animals that can swim?"
    const response = await sendPromptToServer(openai, prompt)
    console.log("Response: ", response)
}

async function sendPromptToServer(openai: OpenAIApi, prompt: string): Promise<string>{
    const completion = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: prompt        
    })

    console.log(completion.data)
    if(!completion.data.choices){
        throw("No choices returned")
    }
    const response = completion.data.choices[0].text
    return response?.trim() ?? ""
}

_testGenScriptHardcoded()