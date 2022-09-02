import { DynamicAssetManager } from "../Crew/dynamicassetgenerator";
import { EmptyDialogue, RecordedDialogue, isRecordedDialogue, TimelineAudio } from "../CommonClasses/dialogue";

export function createAudioTimeline(assets: DynamicAssetManager): AudioTimeline{
    const timeline = new AudioTimeline()
    for (let curScene = 0; curScene < assets.scriptSupervisor.getNumberOfScenes(); curScene++){
        for(let curDialogueLine = 0; curDialogueLine < assets.scriptSupervisor.getNumberOfLinesOfDialogue(curScene); curDialogueLine++){
            const dialogueFile = assets.getRecordedDialogueFilepath(curScene, curDialogueLine) //TODO: Get RecordedDialogue w/ this method
            const dialogue: EmptyDialogue = {duration: 5, sceneNumber: 1} //TODO
            timeline.addDialogueToEnd(dialogue)
        }
    }
    
    return timeline
}

export class AudioTimeline{
    dialogueTrack: TimelineAudio[] = []
    curTimelineLength: number = 0

    addDialogueToEnd(dialogue: RecordedDialogue | EmptyDialogue){                
        const timelineAudio: TimelineAudio = {dialogue: dialogue, startTime: this.curTimelineLength}
        this.curTimelineLength += dialogue.duration        
    }
}
