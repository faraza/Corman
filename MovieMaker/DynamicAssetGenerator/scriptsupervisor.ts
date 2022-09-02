/**
 * This class takes a written script and parses out all the relevant information and gives easy access to it for other classes
 * E.g. what are the locations, dialogueLines, etc
 */

//TODO: Make constructor require script 
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
     * Also saves the ScriptSupervisor object to disk for debugging
     * @param script 
     */
    public loadScript(script: string, filepath: string){
        //TODO
    }
}

class Dialogue{
    actorID: string = "" //TODO: 
    lineNumber: number = 0
    words: string = ""

    public getActorVoiceID(): number{ //converts actorName into ID for TTS
        //TODO
        return 0
    }
}