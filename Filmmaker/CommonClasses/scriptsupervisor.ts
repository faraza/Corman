import {RawDialogue} from './dialogue'

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
    public getDialogue(sceneNumber: number, lineNumber: number): RawDialogue{        
        //TODO
        return {actorID: 1, lineNumber: lineNumber, words: "blah blah", sceneNumber: sceneNumber}
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