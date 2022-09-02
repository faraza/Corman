import { DynamicAssetManager } from "../../DynamicAssetGenerator";

export function createAudioTimeline(assets: DynamicAssetManager): AudioTimeline{
    const timeline = new AudioTimeline()
    for (let curScene = 0; curScene < assets.scriptSupervisor.getNumberOfScenes(); curScene++){
        for(let curDialogueLine = 0; curDialogueLine < assets.scriptSupervisor.getNumberOfLinesOfDialogue(curScene); curDialogueLine++){
            const dialogueFile = assets.getRecordedDialogueFilepath(curScene, curDialogueLine)
            const dialogueLength = 5 //TODO: Get this. Figure out if API returns this or if we have to parse it from file
            timeline.addDialogueToEnd(dialogueFile, dialogueLength, curScene)
        }
    }
    
    return timeline
}

export class AudioTimeline{
    dialogueTrack: RecordedDialogue[] = []
    curTimelineLength: number = 0

    addDialogueToEnd(filePath: string, audioLength: number, sceneNumber: number){
        const dialogue = new RecordedDialogue(this.curTimelineLength, this.curTimelineLength + audioLength, filePath, sceneNumber)
        this.dialogueTrack.push(dialogue)
        this.curTimelineLength += audioLength
    }
}

class RecordedDialogue{
    startTime: number
    endTime: number
    filePath: string
    sceneNumber: number
    //TODO: Add support for blank audio

    constructor(startTime: number, endTime: number, filePath: string, sceneNumber: number){
        this.startTime = startTime
        this.endTime = endTime
        this.filePath = filePath
        this.sceneNumber = sceneNumber
    }    
}