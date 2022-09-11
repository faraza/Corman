import { Configuration, OpenAIApi } from "openai";
import { gpt3Key } from "../../secrets";


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
        prompt: prompt,
        max_tokens: 400           
    })

    console.log(completion.data)
    if(!completion.data.choices){
        throw("No choices returned")
    }
    const response = completion.data.choices[0].text
    return response?.trim() ?? ""
}

const hardcodedShortFilmPrompt = `Write a short film about a King who wants to travel to the stars in 5 scenes. Give a location, a description, and dialogue

Scene 1
-Location: King's Chambers
-Description: The King is in his chambers, looking at the stars. He longs to be up there, among them. He has heard tales of other worlds and wonders what it would be like to visit them.
-Dialogue:
King: I want to go to the stars.
Advisor: But your majesty. That is impossible with today's technology.
King: Then we must find a way. I will not be content to stay here on this world my whole life. There must be something out there for me.

Scene 2
-Location: Public Square
-Description: The King is talking to his subjects, telling them of his plans to travel to the stars. Some believe him, others think he is crazy.`

 
_testGenScriptHardcoded()