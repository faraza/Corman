import { DynamicAssetManager } from "../Crew/dynamicassetgenerator";
import { createAudioTimeline, AudioTimeline} from "./audiotimeline";
import { RecordedDialogue } from "../CommonClasses/dialogue";
import { isRecordedDialogue } from "../CommonClasses/dialogue";
import { ActorID } from "../CommonClasses/actor";

export function createVideoTimeline(assets: DynamicAssetManager, audioTimeline: AudioTimeline): VideoTimeline{
    const videoTimeline = new VideoTimeline()

    let shotNumber = 0
    for(let lineNumber = 0; lineNumber < audioTimeline.dialogueTrack.length; lineNumber++){
        const curDialog = audioTimeline.dialogueTrack[lineNumber]
        const dialogueAudio = curDialog.dialogue         
        if(isRecordedDialogue(dialogueAudio)){
            const backgroundImagePath =  assets.getLocationImageFilepath(dialogueAudio.rawDialogue.sceneNumber)
            
            const cameraShot: CameraShot = {shotType: pickShot(), backgroundImagePath: backgroundImagePath, 
                startTime: curDialog.startTime, endTime: curDialog.startTime + curDialog.dialogue.duration, 
                speakingActorID: dialogueAudio.rawDialogue.actorID, shotNumber: shotNumber++, sceneNumber: dialogueAudio.rawDialogue.sceneNumber}
            
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

export enum ShotType{
    wideshot = 0,
    OTS_primaryActor = 1, //Primary actor is the focus of the shot w/ ; Primary actor is defined at the start and never changes. It IS NOT NECESSARILY the speaker    
    closeup_primaryActor = 2,    
    OTS_secondaryActor = 3,
    closeup_secondaryActor = 4    
}

export function isTwoShot(shot: ShotType): boolean{
    if(shot === ShotType.wideshot) return true
    if(shot === ShotType.OTS_primaryActor) return true
    if(shot === ShotType.OTS_secondaryActor) return true

    return false
}

/**
 * This describes a shot where the camera doesn't move.
 * There will still be motion from the character being animated. So it's not just a single frame
 */
export type CameraShot = {        
    shotType: ShotType
    backgroundImagePath: string
    startTime: number //ms
    endTime: number //ms
    speakingActorID: ActorID //Actor who is talking; 0 if it's a still shot;
    shotNumber: number
    sceneNumber: number
}

function pickShot(): ShotType{        
    return Math.random()*4 //TODO: Set shot based on heuristics
}