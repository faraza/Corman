import { ActorID } from './actor'
import {getDummyRawDialogue, RawDialogue} from './dialogue'

/**
 * This class takes a written script and parses out all the relevant information and gives easy access to it for other classes
 * E.g. what are the locations, dialogueLines, etc
 */

//TODO: Make constructor require script 
export class ScriptCoordinator{    
    private allDialogue: RawDialogue[] = []
    private sceneNames: string[] = []

    /**
     * Returns Dialogue object
     * @param sceneNumber - 0 indexed
     * @param lineNumber - 0 indexed
     * @returns 
     */
    public getDialogue(sceneNumber: number, lineNumber: number): RawDialogue{        
        const foundDialogue =  this.allDialogue.find((dialogue)=>{
            return (dialogue.sceneNumber === sceneNumber && dialogue.lineNumber === lineNumber)
        })

        if(foundDialogue) return foundDialogue
        
        console.log("ERROR - ScriptSupervisor::getDialogue. Not found for scene: ", sceneNumber, " line: ", lineNumber)
        return getDummyRawDialogue() //TODO: Throw error 
    }

    public getSceneLocation(sceneNumber: number): string{
        if(sceneNumber >= this.sceneNames.length){
            console.log("ERROR - ScriptSupervisor::getSceneLocation. Requested a scene number that is too high: ", sceneNumber, " Total scenes: ", this.sceneNames.length) //TODO: Throw error
            return "ERROR SCENE"
        }

        return this.sceneNames[sceneNumber]
    }

    public getNumberOfScenes(): number{
        return this.sceneNames.length
    }

    public getNumberOfLinesOfDialogue(sceneNumber: number): number{
        let numberOfLines = 0
        this.allDialogue.forEach((dialogue)=>{
            if(dialogue.sceneNumber === sceneNumber) numberOfLines++
        })
        return numberOfLines
    }

    /**
     * Parses the script and fills in all of the variables. NOTE - this class should not be called until you've done this!
     * Also saves the ScriptSupervisor object to disk for debugging
     * @param script 
     */
    public loadScript(script: string, filepath: string){
        //TODO
    }

    public _generateDummy(){
        this.sceneNames = ["dummyscene"]
        const dummyDialogue: RawDialogue = {actorID: ActorID.Jennifer, sceneNumber: 0, lineNumber: 0, words: "Dummy words"}
        this.allDialogue = [dummyDialogue]
    }
}