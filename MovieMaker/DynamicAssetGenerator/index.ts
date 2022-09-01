
const Script = require('./Script')

/**
 * Start generation w/  
 */
class DynamicAssetGenerator{
    private prompt: string
    //TODO: Dynamic Asset Manager

    /**
     * TODO: Also support user written script
     * TODO: Also include movieID so we don't have to rebuild certain assets
     * @param prompt short prompt user enters
     */
    public constructor(prompt: string){
        this.prompt = prompt
    }
    
    //TODO: Make this return DynamicAssetManager
    public generateAssets(): Promise<void>{
        //TODO: If user passed in a script, don't call generate Script
        
        this.generateScript(); //TODO: Convert into promise chain
        this.generateLocations();
        this.generateVoicedDialoge();

        return Promise.resolve()
    }

    //TODO: Make all of these properly async
    private generateScript(): Promise<void>{
        const script = Script.generateScript(prompt)
        
        //TODO: give script to DynamicAssetManager
        
        return Promise.resolve()
    }

    private generateLocations(): Promise<void>{
        //TODO: Call imageGenerator from IG class, passing it getAllLocations from DAM.scriptSupervisor
        //TODO: Give location images to DAM

        return Promise.resolve()
    }

    private generateVoicedDialoge(): Promise<void>{
        //TODO: Call generate voices from Voice 
        //TODO: Give audio files to DAM

        return Promise.resolve()
    }

}

class DynamicAssetManager{    
    
    
    public constructor(script: string){
        //TODO: Parses the script to get location
    }
}