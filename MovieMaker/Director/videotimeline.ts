import { DynamicAssetManager } from "../DynamicAssetGenerator";
import { createAudioTimeline, AudioTimeline, RecordedDialogue} from "./audiotimeline";

export function createVideoTimeline(assets: DynamicAssetManager, audioTimeline: AudioTimeline): VideoTimeline{
    const videoTimeline = new VideoTimeline()

    for(let lineNumber = 0; lineNumber < audioTimeline.dialogueTrack.length; lineNumber++){
        const curDialog = audioTimeline.dialogueTrack[lineNumber]
        const cameraShot: CameraShot = {shotType: pickShot(), backgroundImagePath: curDialog.filePath, 
            startTime: curDialog.startTime, endTime: curDialog.endTime, speakingActorID: curDialog.speakingActorID}
        videoTimeline.addShotToEndOfTimeline(cameraShot)
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