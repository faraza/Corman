/**
 * This class takes a written script and parses out all the relevant information.
 * It gets locations, dialogue
 */

export class ScriptSupervisor{    
    /**
     * Returns Dialogue object
     * @param sceneNumber 
     * @param lineNumber 
     * @returns 
     */
    public getDialogue(sceneNumber: number, lineNumber: number): Dialogue{        
        //TODO
        return new Dialogue()
    }

    public getSceneLocation(sceneNumber: number): string{
        //TODO
        return ""
    }

    public getNumberOfScenes(): number{
        //TODO
        return 0
    }

    public getNumberOfLinesOfDialogue(sceneNumber: number): number{
        //TODO
        return 0
    }

    /**
     * Parses the script and fills in all of the variables. NOTE - this class should not be called until you've done this!
     * @param script 
     */
    public loadScript(script: string){
        //TODO
    }
}

class Dialogue{
    actorName: string = ""
    lineNumber: number = 0
    words: string = ""
}