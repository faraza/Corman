import sharp from 'sharp'
import fs from 'fs'
import appRoot from 'app-root-path';
import { CameraShot, VideoTimeline } from './videotimeline';
import { DynamicAssetManager } from '../Crew/dynamicassetgenerator';
import { ActorID } from '../CommonClasses/actor';

const ANIMATION_FPS = 10


export async function animateVideoTimeline(videoTimeline: VideoTimeline, assets: DynamicAssetManager){
    //TODO: Generate shot backgrounds - need to cut background image location to do that
        //TODO: Blur shot background (if appropriate)
        //TODO: Add secondary character to shot (if appropriate)
    
    const fileManager = new AnimationFileManager(assets.movieID)
    
    videoTimeline.cameraTrack.forEach((cameraShot)=>{
        animateShot(cameraShot)                        
    })

    //TODO: Copy all of the frames into a single folder, and rename the frames appropriately
    //TODO: Generate video
}

/**
 * 
 * @param backgroundImageFilepath Make sure you've cut the image to match the shot you want. That image file path will be passed here
 * @param characterImageDirectory The directory that contains the character in the angle and the emotion that you want
 * @param timeInMS //How many ms to animate for
 * @param fileoutputDirectory //Folder to drop the final video file in
 */
async function animateShot(camerashot: CameraShot){
    //Get number of frames - 
    //For each frame, choose a mouth position
    //Add the character to the frame


    const numberOfFrames = Math.round((camerashot.endTime - camerashot.startTime) /1000*ANIMATION_FPS)
    
    let curMouthPosition = 0        
    for(let frameNum = 0; frameNum < numberOfFrames; frameNum++){
        if(curMouthPosition == 0) curMouthPosition = 1
        else if(curMouthPosition == 2) curMouthPosition = 1
        else if(Math.random() > .5) curMouthPosition = 2 
        else curMouthPosition = 0
                
        //TODO: Create file folder if it doesn't exist
        
        const frameImageLocation = ""
        // addCharacterToFrame(curMouthPosition, fileoutputlocation)
    }
}

/**
 * TODO: Also include emotion
 * @param actorID 
 * @param isPrimary irrelevant for wideshot, but for OTS this is the character who is facing us. Usually the speaking character.
 */
function getCharacterDirectory(cameraShot: CameraShot, isPrimary: boolean){
    return "" //TODO
}

//Assumes that the static image (cut + blurred background, static character) has already been generated
    //TODO: Character directory should be the directory for the character in that shot. It should factor in the character's size and whether or not the character is in motion
    //TODO: Remember to make all directories before calling these
async function addCharToFrame(frameImage: string, characterImage: string, position: CharacterPosition, outputFile: string ){     
    await sharp(frameImage)
    .composite([
        {input: characterImage, top: position.distanceFromTop, left: position.distanceFromLeft} 
    ])
    .toFile(outputFile)
}

class AnimationFileManager{
    movieID: string
    constructor(movieID: string){
        this.movieID = movieID
    }
    
    /**
     * Returns path to directory for this shot
     * @param sceneNumber 
     * @param shotNumber 
     */
    public getShotDirectoryPath(sceneNumber: number, shotNumber: number): string{
        return this.getRootFilePath() + "shots/" + sceneNumber + "/" + shotNumber + "/"
    } 

    public getShotImageFileLocation(cameraShot: CameraShot): string{        
        return cameraShot.backgroundImagePath //TODO: Return actual cut version of this
    }
    
    private getRootFilePath(): string{
        return appRoot + "/Assets/dynamic_assets/" + this.movieID + "/intermediateAnimations/"
    }

}


const _hardcodedBackgroundImageFilepath = "/Users/farazabidi/Documents/Corman/Assets/dynamic_assets/testassets1/locations/1.png"
const _hardcodedOutputFileDirectory = "/Users/farazabidi/Documents/Corman/output_animation/"

async function _testAddCharToFrame(){
    //Intermediate    
        //TODO
    const frame_int = "/Users/farazabidi/Documents/Corman/Assets/dynamic_assets/testassets1/scenes/0/shots/0/processedshotbackground.png"
    const charImage_int = "/Users/farazabidi/Documents/Corman/Assets/static_assets/characters/maho/back/1.png"
    const position_int: CharacterPosition = {distanceFromTop: 100, distanceFromLeft: 10}
    const output_int = "/Users/farazabidi/Documents/Corman/Assets/dynamic_assets/testassets1/scenes/0/shots/0/finalizedshotbackground.png"
    await addCharToFrame(frame_int, charImage_int, position_int, output_int)


    //Actual frame
    const frameImage_actual = "/Users/farazabidi/Documents/Corman/Assets/dynamic_assets/testassets1/scenes/0/shots/0/finalizedshotbackground.png"
    const characterImage_actual = "/Users/farazabidi/Documents/Corman/Assets/static_assets/characters/maho/ots/neutral/0.png" //TODO: Also factor in size
    const position_actual: CharacterPosition = {distanceFromTop: 160, distanceFromLeft: 300}
    const outputFile_actual = "/Users/farazabidi/Documents/Corman/Assets/dynamic_assets/testassets1/scenes/0/shots/0/frame1.png"

    addCharToFrame(frameImage_actual, characterImage_actual, position_actual, outputFile_actual)
}

type CharacterPosition = {
    distanceFromLeft: number,
    distanceFromTop: number 
}

_testAddCharToFrame()