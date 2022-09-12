import { Configuration, OpenAIApi } from "openai";
import { gpt3Key } from "../../secrets";
import { hardcodedPromptExample } from "./promptstuffer";


export async function generateScript(prompt: string, filePath: string): Promise<string>{    
    const config = new Configuration({apiKey: gpt3Key})
    const openai = new OpenAIApi(config);

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

async function _testGenScriptHardcoded(){
    const response = await generateScript(hardcodedShortFilmPrompt, "fakeFilePath")    
    console.log("Response: ", response)
}

async function sendPromptToServer(openai: OpenAIApi, prompt: string): Promise<string>{
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

// const hardcodedShortFilmPrompt = `Write a short film in 5 scenes titled "Sarah and Jennifer become Tennis Stars". Give a location, a description, and dialogue.`
const hardcodedShortFilmPrompt = hardcodedPromptExample
_testGenScriptHardcoded()