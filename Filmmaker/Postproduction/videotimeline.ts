import { DynamicAssetManager } from "../Crew/dynamicassetgenerator";
import { createAudioTimeline, AudioTimeline} from "./audiotimeline";
import { RecordedDialogue } from "../CommonClasses/dialogue";
import { isRecordedDialogue } from "../CommonClasses/dialogue";

export function createVideoTimeline(assets: DynamicAssetManager, audioTimeline: AudioTimeline): VideoTimeline{
    const videoTimeline = new VideoTimeline()

    for(let lineNumber = 0; lineNumber < audioTimeline.dialogueTrack.length; lineNumber++){
        const curDialog = audioTimeline.dialogueTrack[lineNumber]
        const dialogueAudio = curDialog.dialogue         
        if(isRecordedDialogue(dialogueAudio)){
            const backgroundImagePath =  assets.getLocationImageFilepath(dialogueAudio.rawDialogue.sceneNumber)
            const cameraShot: CameraShot = {shotType: pickShot(), backgroundImagePath: backgroundImagePath, 
                startTime: curDialog.startTime, endTime: curDialog.startTime + curDialog.dialogue.duration, speakingActorID: dialogueAudio.rawDialogue.actorID}
            videoTimeline.addShotToEndOfTimeline(cameraShot)
        }
        //TODO: Support empty dialogue
        
    }    
        
    return videoTimeline
}

export class VideoTimeline{
    cameraTrack: CameraShot[] = []
    curTimelineLength: number = 0
    addShotToEndOfTimeline(shot: CameraShot){
        this.curTimelineLength += (shot.endTime - shot.startTime)
        this.cameraTrack.push(shot)
    }
}

enum ShotType{
    OTS_activeSpeaker = 0, //OTS w/ active speaker facing us + inactive speaker's back to us    
    wideshot = 1,
    closeup_activeSpeaker = 2,
    OTS_inactiveSpeaker = 3,
    closeup_inactiveSpeaker = 4      
}

/**
 * This describes a shot where the camera doesn't move.
 * There will still be motion from the character being animated. So it's not just a single frame
 */
export type CameraShot = {        
    shotType: ShotType
    backgroundImagePath: string
    startTime: number
    endTime: number
    speakingActorID: number //Actor who is talking; 0 if it's a still shot; //TODO: We need to have another class for actors that figures this out. We're juggling it all over            
}

function pickShot(): ShotType{        
    return Math.random()*3 //TODO: Set shot based on heuristics
}