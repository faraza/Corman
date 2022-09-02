
import { generateScript } from "./screenwriter";
import { ScriptSupervisor } from "../CommonClasses/scriptsupervisor";
import { generateImage } from "./setdesigner";
import { generateTTS } from "./voiceoverartist";
import {v4 as uuidv4} from 'uuid'
const appRoot = require('app-root-path');


/**
 * TODO: No need for this to be a class. Just break it down into functions
 */
export class DynamicAssetGenerator{
    private movieID: string
    private assetManager: DynamicAssetManager    

    /**
     * TODO: Also support user written script
     * TODO: Also include movieID so we don't have to rebuild certain assets
     * @param prompt short prompt user enters
     */
    public constructor(){        
        this.movieID = uuidv4() + Date.now()
        this.assetManager = new DynamicAssetManager(this.movieID)                
    }
    
    public async generateAssetsFromPrompt({ prompt }: { prompt: string; }){
        await this.generateScript({ prompt })
        return this.generateAssetsFromScript({ script: this.assetManager.getScript() })
    }

    public async generateAssetsFromScript({ script }: { script: string; }){
        this.assetManager.setScript(script)

        await Promise.all([this.generateLocations(), this.generateVoicedDialoge()])                
        return this.assetManager
    }
    
    private async generateScript({ prompt }: { prompt: string; }){
        try{            
            this.assetManager.prompt = prompt 
            console.log("DAG::generateScript 1")
            const script = await generateScript(prompt, this.assetManager.getScriptFilepath())        
            console.log("DAG::generateScript 2")                        
            this.assetManager.setScript(script)                   
            console.log("DAG::generateScript 3")
        }
        catch(error){
            console.log("ERROR - DAG::generateScript: ", error)
        }        
    }

    private async generateLocations(){     
        console.log("DAG::generateLocations")
        let locationGenPromises: Promise<void>[] = []        
        for(let sceneNumber = 0; sceneNumber < this.assetManager.scriptSupervisor.getNumberOfScenes(); sceneNumber++){
            const locationName = this.assetManager.scriptSupervisor.getSceneLocation(sceneNumber);            
            
            locationGenPromises.push(generateImage(locationName, this.assetManager.getLocationImageFilepath(sceneNumber)))
        }             

        await Promise.all(locationGenPromises)
        console.log("DAG::generateLocations - DONE")
    }

    private async generateVoicedDialoge(){
        console.log("DAG::generatedVoicedDialogue")
        let voiceGenPromises: Promise<void>[] = []
        for(let sceneNumber = 0; sceneNumber < this.assetManager.scriptSupervisor.getNumberOfScenes(); sceneNumber++){
            for(let lineNumber = 0; lineNumber < this.assetManager.scriptSupervisor.getNumberOfLinesOfDialogue(sceneNumber); lineNumber++){
                const dialogue = this.assetManager.scriptSupervisor.getDialogue(sceneNumber, lineNumber);          
                voiceGenPromises.push(generateTTS(dialogue, this.assetManager.getRecordedDialogueFilepath(sceneNumber, lineNumber)))                       
            }
        }
        await Promise.all(voiceGenPromises)     
        console.log("DAG::generatedVoicedDialogue - DONE")           
    }

}

/**
 * This class just stores all the stuff that's generated and gives convenient functions for accessing them.
 * Not really any logic going on here
 */
export class DynamicAssetManager{  
    public scriptSupervisor: ScriptSupervisor
    public prompt?: string
    
    private script: string = ""      
    private movieID: string = ""    


    /**
     * 
     * @param movieID Unique identifier that describes the movie. Uses this for folder naming
     */
    public constructor(movieID: string){
        this.movieID = movieID
        this.scriptSupervisor = new ScriptSupervisor()
    }
    
    //TODO: Do we need to do file extensions?

    public getLocationImageFilepath(sceneNumber: number): string{
        return this.getRootFilePath() + "locations/" + sceneNumber
    }

    /**
     * 
     * @param sceneNumber the order of the scene in the script. Each time a new location is set, that is a new scene number
     * @param lineNumber Each new character speech heading increments the line by 1. Narrator lines also count.
     * 
     * Returns the filepath to that piece of audio
     */
    public getRecordedDialogueFilepath(sceneNumber: number, lineNumber: number): string{
        return this.getRootFilePath() + "dialogue/" + sceneNumber + "_" + lineNumber
    }

    public getScript(): string{
        return this.script
    }    
    
    public setScript(script: string){
        this.scriptSupervisor.loadScript(script, this.getScriptSupervisorFilepath())
        this.script = script
    }

    public getScriptFilepath(): string{
        return this.getRootFilePath() + "script/script"
    }

    public getScriptSupervisorFilepath(): string{
        return this.getRootFilePath + "script/scriptSupervisor"
    }

    private getRootFilePath(): string{
        return appRoot + "/Assets/dynamic_assets/" + this.movieID + "/"
    }

}