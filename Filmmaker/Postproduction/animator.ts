import sharp from 'sharp'
import fse from 'fs-extra'
import appRoot from 'app-root-path';
import { CameraShot, VideoTimeline, ShotType } from './videotimeline';
import { DynamicAssetManager } from '../Crew/dynamicassetgenerator';
import { ActorID, ActorEmotion, getPrimaryActor, getSecondaryActor} from '../CommonClasses/actor';

const ANIMATION_FPS = 10


export async function animateVideoTimeline(videoTimeline: VideoTimeline, assets: DynamicAssetManager){        
    const fileManager = new AnimationFileManager(assets.movieID)    
    //TODO: Gen folders for each shot and drop background image there
    
    videoTimeline.cameraTrack.forEach((cameraShot)=>{
        animateShot(cameraShot, fileManager)                        
    })

    //TODO: Copy all of the frames into a single folder, and rename the frames appropriately
    //TODO: Generate video
}

/**
 * 
 */
async function animateShot(camerashot: CameraShot, animationFileManager: AnimationFileManager){
    const backgroundImage = animationFileManager.getShotBackgroundImage(camerashot)
    const shotFolder = animationFileManager.getShotDirectory(camerashot)
    const backgroundOut = shotFolder + "/processedShot.png"
    const compositedOut = shotFolder + "/processedShot_composited.png"
    const animatedOut = shotFolder + "/animated_frames/"
    await fse.ensureDir(animatedOut)
    await generateShotBackground(backgroundImage, camerashot.shotType, backgroundOut)
    await addStaticCharacterToFrame(backgroundOut, camerashot, compositedOut)
    await animateSpeakingCharacter(compositedOut, camerashot, animatedOut)            
}

/**
 * TODO: Make this handle speaking character not being in frame
 * This must be called after the shot background has already been generated, or it will throw an error!
 * @param cameraShot 
 * @param outputFolder 
 */
async function animateSpeakingCharacter(frameImage: string, cameraShot: CameraShot, outputFolder: string){    
    
    const characterInfo: CharacterShotInfo = getCharacterShotInfo({ cameraShot, isSpeaker: true})
    const characterPosition = getCharacterPosition(characterInfo)        
    
    const numberOfFrames = Math.round((cameraShot.endTime - cameraShot.startTime) /1000*ANIMATION_FPS)
    
    let curMouthPosition = 0  
    const animationPromises: Promise<void>[] = []
    for(let frameNum = 0; frameNum < numberOfFrames; frameNum++){
        if(curMouthPosition == 0) curMouthPosition = 1
        else if(curMouthPosition == 2) curMouthPosition = 1
        else if(Math.random() > .5) curMouthPosition = 2 
        else curMouthPosition = 0

        const characterImage = getCharacterImageFolder(characterInfo) + curMouthPosition + ".png"
        const outputFile = outputFolder + frameNum + ".png"

        const addCharPromise = addCharacterToFrame({ frameImage: frameImage, characterImage: characterImage, position: characterPosition, outputFile: outputFile, blur: 0})
        animationPromises.push(addCharPromise)
    }
    
    await Promise.all(animationPromises)
}


async function addCharacterToFrame({ frameImage, characterImage, position, outputFile, blur }: { frameImage: string; characterImage: string; position: CharacterPosition; outputFile: string; blur: number }){     
    if(blur > 0){
        await sharp(frameImage)
        .composite([
            {input: characterImage, top: position.distanceFromTop, left: position.distanceFromLeft} 
        ])
        .blur(blur) //TODO: Figure out why this is not working on composited part of image
        .toFile(outputFile)
    }
    else{
        await sharp(frameImage)
        .composite([
        {input: characterImage, top: position.distanceFromTop, left: position.distanceFromLeft} 
    ])    
    .toFile(outputFile)
    }    
}

async function addStaticCharacterToFrame(frameImage: string, cameraShot: CameraShot, outputFile: string){           
    const characterInfo: CharacterShotInfo = getCharacterShotInfo({ cameraShot, isSpeaker: false })
    const characterImage = getCharacterImageFolder(characterInfo) + "1.png"
    const characterPosition = getCharacterPosition(characterInfo)        
    
    await addCharacterToFrame({ frameImage: frameImage, characterImage: characterImage, position: characterPosition, outputFile: outputFile, blur: 0 })    
}

function getCharacterShotInfo({ cameraShot, isSpeaker }: { cameraShot: CameraShot; isSpeaker: boolean; }): CharacterShotInfo{    
    const nonSpeakingActor = (cameraShot.speakingActorID === ActorID.Jennifer) ? ActorID.Sarah : ActorID.Jennifer
    const actorID: ActorID = isSpeaker ? cameraShot.speakingActorID : nonSpeakingActor
    const emotion: ActorEmotion = ActorEmotion.Neutral //TODO: Need to include that in the cameraShot
    const isPrimary = (actorID === getPrimaryActor())
    const shotType = cameraShot.shotType

    return {actorID: actorID, emotion: emotion, isPrimary: isPrimary, shotType: shotType}
}

//TODO
function getCharacterImageFolder(characterInfo: CharacterShotInfo): string{
    const charactersFolder = appRoot + "/Assets/static_assets/characters"
    //TODO: Factor in all the other stuff
    if(characterInfo.isPrimary){
        const shotType = "ots" //TODO
        const emotion = "neutral" //TODO
        const character = "maho"
        return charactersFolder + "/" + character + "/" + shotType + "/" + emotion + "/"        
    }
    else{
        const character = "suzuha"
        return charactersFolder + "/" + character + "/back/"        
    }
    
}

//TODO: Figure out param
function getCharacterPosition(characterInfo: CharacterShotInfo) {
    //TODO: Factor in Shot type
    if(characterInfo.isPrimary)
        return {distanceFromLeft: 310, distanceFromTop: 200}
    else
        return {distanceFromLeft: 20, distanceFromTop: 100}
}

//TODO: Figure out params
async function generateShotBackground(imageFile: string, shotType: ShotType, outputFile: string){     
    if(shotType === ShotType.wideshot){ //TODO: Do some stuff w/ cropping so it looks different from OTS. But it's fine for now
        await sharp(imageFile)
        .blur(1)
        .toFile(outputFile)                
    }
    else if (shotType === ShotType.OTS_primaryActor){
        await sharp(imageFile)
        .blur(3) //TODO: Get right param        
        .toFile(outputFile)        
    }
    else if (shotType === ShotType.OTS_secondaryActor){
        await sharp(imageFile)
        .blur(3) //TODO: Get right param
        .flop()
        .toFile(outputFile)
    }
    else if (shotType === ShotType.closeup_primaryActor){
        await sharp(imageFile)
        .extract({left: 200, top: 100, width: 200, height: 200}) //TODO: Figure out the right params
        .resize(512, 512)
        .blur(5)
        .toFile(outputFile)
    }    
    else if (shotType === ShotType.closeup_secondaryActor){
        await sharp(imageFile)
        .extract({left: 50, top: 100, width: 200, height: 200}) //TODO: Figure out the right params        
        .resize(512, 512)
        .blur(5)
        .toFile(outputFile)
    }    
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
    public getShotDirectory(cameraShot: CameraShot): string{
        const sceneNumber = cameraShot.sceneNumber
        const shotNumber = cameraShot.shotNumber
        const directoryPath = this.getRootFilePath() + "/scenes/" + sceneNumber + "/shots/" + shotNumber
        //TODO: Make directory path
        return directoryPath        
    } 

    public getShotBackgroundImage(cameraShot: CameraShot): string{        
        return this.getRootFilePath() + "/scenes/" + cameraShot.sceneNumber + "/background.png"
    }
    
    private getRootFilePath(): string{
        return appRoot + "/Assets/dynamic_assets/" + this.movieID
    }    

}

type CharacterPosition = {
    distanceFromLeft: number,
    distanceFromTop: number 
}

type CharacterShotInfo = {
    actorID: ActorID,
    emotion: ActorEmotion,
    isPrimary: boolean,
    shotType: ShotType
}


async function _testAddCharToFrame(){
    //Intermediate    
        //TODO
    const frame_int = "/Users/farazabidi/Documents/Corman/Assets/dynamic_assets/testassets1/scenes/0/shots/0/processedshot.png"
    const charImage_int = "/Users/farazabidi/Documents/Corman/Assets/static_assets/characters/maho/back/1.png"
    const position_int: CharacterPosition = {distanceFromTop: 100, distanceFromLeft: 10}
    const output_int = "/Users/farazabidi/Documents/Corman/Assets/dynamic_assets/testassets1/scenes/0/shots/0/finalizedshotbackground.png"
    await addCharacterToFrame({ frameImage: frame_int, characterImage: charImage_int, position: position_int, outputFile: output_int, blur: 0 })


    //Actual frame
    const frameImage_actual = "/Users/farazabidi/Documents/Corman/Assets/dynamic_assets/testassets1/scenes/0/shots/0/finalizedshotbackground.png"
    const characterImage_actual = "/Users/farazabidi/Documents/Corman/Assets/static_assets/characters/maho/ots/neutral/0.png" //TODO: Also factor in size
    const position_actual: CharacterPosition = {distanceFromTop: 160, distanceFromLeft: 300}
    const outputFile_actual = "/Users/farazabidi/Documents/Corman/Assets/dynamic_assets/testassets1/scenes/0/shots/0/frame1.png"

    addCharacterToFrame({ frameImage: frameImage_actual, characterImage: characterImage_actual, position: position_actual, outputFile: outputFile_actual, blur: 0 })
}

async function _testGenerateShot(){
    const backgroundImage = "/Users/farazabidi/Documents/Corman/Assets/dynamic_assets/testassets1/scenes/0/background.png"
    const outbase = "/Users/farazabidi/Documents/Corman/Assets/dynamic_assets/testassets1/scenes/0/shots/0/rawshotbackground"
            
    const out1 = outbase + "_OTSPrimary.png"
    generateShotBackground(backgroundImage, ShotType.OTS_primaryActor, out1)

    const out2 = outbase + "_OTSSecondary.png"
    generateShotBackground(backgroundImage, ShotType.OTS_secondaryActor, out2)

    const out3 = outbase + "_closeupPrimary.png"
    generateShotBackground(backgroundImage, ShotType.closeup_primaryActor, out3)

    const out4 = outbase + "_closeupSecondary.png"
    generateShotBackground(backgroundImage, ShotType.closeup_secondaryActor, out4)

    const out5 = outbase + "_wideshot.png"
    generateShotBackground(backgroundImage, ShotType.wideshot, out5)
}

async function _testGenerateStatic(){
    const backgroundImage = "/Users/farazabidi/Documents/Corman/Assets/dynamic_assets/testassets1/scenes/0/background.png"
    const startTime = 0
    const endTime = 4000
    const shotNumber = 0
    const sceneNumber = 0
    const isPrimary = false
    const actorID = isPrimary ? getPrimaryActor() : getSecondaryActor()
    const speakingActor = actorID == getPrimaryActor() ? getSecondaryActor() : getPrimaryActor() //We can skip this but it's just to illustrate how we came up with it

    const out1 = "/Users/farazabidi/Documents/Corman/Assets/dynamic_assets/testassets1/scenes/0/shots/0/finalShot.png"
    const shotType1 = ShotType.OTS_primaryActor
    const shot1: CameraShot = {shotType: shotType1, backgroundImagePath: backgroundImage, startTime: startTime, endTime: endTime, speakingActorID: speakingActor, shotNumber: shotNumber, sceneNumber: sceneNumber}
    await addStaticCharacterToFrame(backgroundImage, shot1, out1)
}

async function _testAnimateSpeakingCharacter(){
    const frameImage = "/Users/farazabidi/Documents/Corman/Assets/dynamic_assets/testassets1/scenes/0/shots/0/finalShot.png"
    const backgroundImage = "/Users/farazabidi/Documents/Corman/Assets/dynamic_assets/testassets1/scenes/0/background.png"
    
    const shot1: CameraShot = _getTestShot(backgroundImage)

    const outFolder = "/Users/farazabidi/Documents/Corman/Assets/dynamic_assets/testassets1/scenes/0/shots/0/animated_frames/"
    await animateSpeakingCharacter(frameImage, shot1, outFolder)
}

function _getTestShot(backgroundImagePath: string): CameraShot{
    const startTime = 0
    const endTime = 4000
    const shotNumber = 0
    const sceneNumber = 0
    const isPrimary = true
    const actorID = isPrimary ? getPrimaryActor() : getSecondaryActor()

    const shotType = ShotType.OTS_primaryActor
    const shot: CameraShot = {shotType: shotType, backgroundImagePath: backgroundImagePath, startTime: startTime, endTime: endTime, speakingActorID: actorID, shotNumber: shotNumber, sceneNumber: sceneNumber}    

    return shot
}

async function _testAnimateShot(){    
    const backgroundImage = "/Users/farazabidi/Documents/Corman/Assets/dynamic_assets/testassets1/scenes/0/shots/0/finalShot.png" //TODO: Use filemanager
    const shot = _getTestShot(backgroundImage)
    const fileManager = new AnimationFileManager("testassets2")
    
    animateShot(shot, fileManager)    
}


_testAnimateShot()