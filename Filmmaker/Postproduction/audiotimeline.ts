import { DynamicAssetManager } from "../Crew/dynamicassetgenerator";
import { EmptyDialogue, RecordedDialogue, TimelineAudio } from "../CommonClasses/dialogue";

export function createAudioTimeline(assets: DynamicAssetManager): AudioTimeline{
    const timeline = new AudioTimeline()
    for (let curScene = 0; curScene < assets.scriptSupervisor.getNumberOfScenes(); curScene++){
        for(let curDialogueLine = 0; curDialogueLine < assets.scriptSupervisor.getNumberOfLinesOfDialogue(curScene); curDialogueLine++){
            const recordedDialogue = assets.getRecordedDialogue(curScene, curDialogueLine)
            timeline.addDialogueToEnd(recordedDialogue)
        }
    }
    
    return timeline
}

export class AudioTimeline{
    dialogueTrack: TimelineAudio[] = []
    curTimelineLength: number = 0

    addDialogueToEnd(dialogue: RecordedDialogue | EmptyDialogue){                
        const timelineAudio: TimelineAudio = {dialogue: dialogue, startTime: this.curTimelineLength}
        this.dialogueTrack.push(timelineAudio)
        this.curTimelineLength += dialogue.duration        
    }
}
