
const Script = require('./Script')
const ScriptSupervisor = require('../ScriptSupervisor')

export class DynamicAssetGenerator{
    private prompt: string
    private assetManager = new DynamicAssetManager //TODO: Figure out type bs
    private scriptSupervisor = new ScriptSupervisor //TODO: Figure out type bs
    

    /**
     * TODO: Also support user written script
     * TODO: Also include movieID so we don't have to rebuild certain assets
     * @param prompt short prompt user enters
     */
    public constructor(prompt: string){ //TODO: Can you make a constructor async? If so, that's what we should do so scriptSupervisor can always be initialized
        this.prompt = prompt
    }
    
    public generateAssets(): DynamicAssetManager{ //TODO: Return Tuple of DAM and ScriptSupervisor    
        this.generateScript(); //TODO: Convert into promise chain
        this.generateLocations();
        this.generateVoicedDialoge();

        return this.assetManager
    }

    //TODO: Make all of these properly async
    private generateScript(){
        const script = Script.generateScript(prompt)        
        this.scriptSupervisor.setScript(script)
        this.assetManager.setScript(script)
        
    }

    private generateLocations(){     
        console.log("DAG::generateLocations")
     
        //TODO: Call imageGenerator from IG class, passing it getAllLocations from DAM.scriptSupervisor
        //TODO: Give location images to DAM

    }

    private generateVoicedDialoge(){
        //TODO: Call generate voices from Voice 
        //TODO: Give audio files to DAM
    }

}

/**
 * This class just stores all the stuff that's generated and gives convenient functions for accessing them.
 * Not really any logic going on here
 */
class DynamicAssetManager{  
    private script = ""      

    public getLocationImage(sceneNumber: number): string{
        return ""
    }

    /**
     * 
     * @param sceneNumber the order of the scene in the script. Each time a new location is set, that is a new scene number
     * @param lineNumber Each new character speech heading increments the line by 1. Narrator lines also count.
     * 
     * Returns the filepath to that piece of audio
     */
    public getRecordedDialogue(sceneNumber: number, lineNumber: number): string{
        return ""
    }

    public getScript(): string{
        return this.script
    }
    
    
    public setScript(script: string){
        this.script = script
    }

    public setLocationImages(){ //TODO: What does it take as param?
        //TODO:
    }

    public setVoicedDialogueFiles(){
        //TODO: 
    }

    /**
     * For that scene number in the script, what is the location image associated with it? This will return that
     * returns the filepath
     * @param sceneNumber the order of the scene in the script. Each time a new location is set, that is a new scene number
     */

}