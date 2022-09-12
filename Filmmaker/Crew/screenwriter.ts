import { Configuration, OpenAIApi } from "openai";
import { gpt3Key } from "../../secrets";
import { hardcodedPromptCloser, hardcodedPromptOpener } from "./promptstuffer";


export async function generateScript(scriptTitle: string, filePath: string): Promise<string>{    
    const config = new Configuration({apiKey: gpt3Key})
    const openai = new OpenAIApi(config);

    const prompt = hardcodedPromptOpener + scriptTitle + hardcodedPromptCloser

    const script = await sendPromptToServer(openai, prompt)
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

async function _testGenScript(){
    const filmTitle = "Invent time travel"
    const response = await generateScript(filmTitle, "fakeFilePath")    
    console.log("Response: ", response)
}

async function sendPromptToServer(openai: OpenAIApi, prompt: string): Promise<string>{
    console.log("Send prompt to server: ", prompt)
    const completion = await openai.createCompletion({
        model: "text-davinci-002",
        // model: "davinci:ft-personal-2022-09-12-00-42-06",
        prompt: prompt,
        max_tokens: 1000,
        frequency_penalty: 0,
        temperature: 0.7,
        top_p: 1.0,
        presence_penalty: 1.2,
        stop: ["END", "##"]    
    })

    console.log(completion.data)
    if(!completion.data.choices){
        throw("No choices returned")
    }
    const response = completion.data.choices[0].text
    return response?.trim() ?? ""
}


_testGenScript()