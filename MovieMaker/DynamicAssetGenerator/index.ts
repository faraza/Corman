
import { generateScript } from "./Script";
import { ScriptSupervisor } from "../ScriptSupervisor";
import { generateImage } from "./Images";
import { generateTTS } from "./Audio";
const appRoot = require('app-root-path');


export class DynamicAssetGenerator{
    private prompt: string
    private movieID: string = "001" //TODO: Dynamically generate
    private assetManager: DynamicAssetManager
    private scriptSupervisor: ScriptSupervisor        

    /**
     * TODO: Also support user written script
     * TODO: Also include movieID so we don't have to rebuild certain assets
     * @param prompt short prompt user enters
     */
    public constructor(prompt: string){ //TODO: Can you make a constructor async? If so, that's what we should do so scriptSupervisor can always be initialized
        this.prompt = prompt
        this.assetManager = new DynamicAssetManager(this.movieID)
        this.scriptSupervisor = new ScriptSupervisor()
    }
    
    public generateAssets(){ //TODO: Return Tuple of DAM and ScriptSupervisor    
        this.generateScript(); //TODO: Convert into promise chain
        this.generateLocations();
        this.generateVoicedDialoge();

        return this.assetManager
    }
    
    private async generateScript(){
        try{
            const script = await generateScript(this.prompt, this.assetManager.getScriptFilepath())        
            this.scriptSupervisor.loadScript(script, this.assetManager.getScriptSupervisorFilepath())
            this.assetManager.setScript(script)        
        }
        catch(error){
            console.log("ERROR - DAG::generateScript: ", error)
        }        
    }

    private generateLocations(){     
        console.log("DAG::generateLocations")
        for(let sceneNumber = 0; sceneNumber < this.scriptSupervisor.getNumberOfScenes(); sceneNumber++){
            const locationName = this.scriptSupervisor.getSceneLocation(sceneNumber);            
            
            generateImage(locationName, this.assetManager.getLocationImageFilepath(sceneNumber)) //TODO: Make async            
        }             
    }

    private generateVoicedDialoge(){
        for(let sceneNumber = 0; sceneNumber < this.scriptSupervisor.getNumberOfScenes(); sceneNumber++){
            for(let lineNumber = 0; lineNumber < this.scriptSupervisor.getNumberOfLinesOfDialogue(sceneNumber); lineNumber++){
                const dialogue = this.scriptSupervisor.getDialogue(sceneNumber, lineNumber);                
                generateTTS(dialogue.words, dialogue.getActorVoiceID(), this.assetManager.getRecordedDialogueFilepath(sceneNumber, lineNumber)) //TODO: Make async
            }
        }                
    }

}

/**
 * This class just stores all the stuff that's generated and gives convenient functions for accessing them.
 * Not really any logic going on here
 */
class DynamicAssetManager{  
    private script: string = ""      
    private movieID: string = ""

    /**
     * 
     * @param movieID Unique identifier that describes the movie. Uses this for folder naming
     */
    public constructor(movieID: string){
        this.movieID = movieID
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