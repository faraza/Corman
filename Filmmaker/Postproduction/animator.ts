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
                
        //Create file folder if it doesn't exist
        addCharacterToFrame(curMouthPosition, fileoutputlocation)
    }
}

/**
 * TODO: Also include emotion
 * @param actorID 
 * @param isPrimary irrelevant for wideshot, but for OTS this is the character who is facing us. Usually the speaking character.
 */
function getCharacterDirectory(cameraShot: CameraShot, isPrimary: boolean){
    return _hardcodedCharacterFilePath //TODO
}

async function generateCharacterFrame(characterDirectory: string, mouthPosition: number, outputFilePath: string){
    /*if(!fs.existsSync(fileoutputDirectory))
        fs.mkdirSync(fileoutputDirectory)
    
    await sharp(backgroundImageFilepath)
    .composite([
        {input: characterDirectory + mouthPosition + ".png", top: 100, left: 200} //TODO: Factor in shot type to 'top' and 'left'
    ])
    .toFile(fileoutputDirectory + frameNumber + ".png") */
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


const _hardcodedCharacterFilePath = "/Users/farazabidi/Documents/Corman/Assets/static_assets/characters/maho/ots/neutral/"
const _hardcodedBackgroundImageFilepath = "/Users/farazabidi/Documents/Corman/Assets/dynamic_assets/testassets1/locations/1.png"
const _hardcodedOutputFileDirectory = "/Users/farazabidi/Documents/Corman/output_animation/"

function _testAnimation(){
    const timeInMS = 800
    animateShot({backgroundImageFilepath: _hardcodedBackgroundImageFilepath, characterImageDirectory: _hardcodedCharacterFilePath, timeInMS: timeInMS,
    fileoutputDirectory: _hardcodedOutputFileDirectory})
}