import sharp from 'sharp'
import fs from 'fs'

const ANIMATION_FPS = 10

/**
 * 
 * @param backgroundImageFilepath Make sure you've cut the image to match the shot you want. That image file path will be passed here
 * @param characterImageDirectory The directory that contains the character in the angle and the emotion that you want
 * @param timeInMS //How many ms to animate for
 * @param fileoutputDirectory //Folder to drop all the files in. They will be named as 1,2,3,4 etc. for each frame. 1-indexed
 */
export async function animateShot({ backgroundImageFilepath, characterImageDirectory, timeInMS, fileoutputDirectory }: { backgroundImageFilepath: string; characterImageDirectory: string; timeInMS: number; fileoutputDirectory: string; }){
    const numberOfFrames = Math.round(timeInMS/1000*ANIMATION_FPS)
    let curMouthPosition = 0
    for(let frameNum = 0; frameNum < numberOfFrames; frameNum++){
        if(curMouthPosition == 0) curMouthPosition = 1
        else if(curMouthPosition == 2) curMouthPosition = 1
        else if(Math.random() > .5) curMouthPosition = 2 
        else curMouthPosition = 0
        
        await addCharacterToFrame({ mouthPosition: curMouthPosition, characterImageDirectory: characterImageDirectory, frameNumber: frameNum, 
            fileoutputDirectory: fileoutputDirectory, backgroundImageFilepath: backgroundImageFilepath})
    }
}

async function addCharacterToFrame({ mouthPosition, characterImageDirectory, fileoutputDirectory, frameNumber, backgroundImageFilepath }: { mouthPosition: number; characterImageDirectory: string; fileoutputDirectory: string; frameNumber: number; backgroundImageFilepath: string; }){
    if(!fs.existsSync(fileoutputDirectory))
        fs.mkdirSync(fileoutputDirectory)
    
    await sharp(backgroundImageFilepath)
    .composite([
        {input: characterImageDirectory + mouthPosition + ".png", top: 100, left: 200}
    ])
    .toFile(fileoutputDirectory + frameNumber + ".png")
}


export const _hardcodedCharacterFilePath = "/Users/farazabidi/Documents/Corman/Assets/static_assets/characters/maho/ots/neutral/"
export const _hardcodedBackgroundImageFilepath = "/Users/farazabidi/Documents/Corman/Assets/dynamic_assets/testassets1/locations/1.png"
export const _hardcodedOutputFileDirectory = "/Users/farazabidi/Documents/Corman/output_animation/"

function _testAnimation(){
    const timeInMS = 800
    animateShot({backgroundImageFilepath: _hardcodedBackgroundImageFilepath, characterImageDirectory: _hardcodedCharacterFilePath, timeInMS: timeInMS,
    fileoutputDirectory: _hardcodedOutputFileDirectory})
}