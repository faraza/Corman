import sharp from 'sharp'
import path from 'path'
import { addCharacterToBackground, animateCharacter } from './Character'


const backgroundImageFilepath = "/Users/farazabidi/Documents/Corman/animation_assets/backgrounds/kings_chambers.png"
export function testBasicImageGen (): void{
    console.log("Testing basic image gen")
    duplicateImage('/Users/farazabidi/Documents/Corman/animation_assets/backgrounds/kings_chambers.png')
}

export function testCharacterMouthAnimation (numberOfMouthMovements: number = 50): void{
    console.log("Testing character mouth animation")
    let curMouthNum = 0
    for(let i = 0; i < numberOfMouthMovements; i++){
        if(curMouthNum == 0) curMouthNum = 1
        else if(curMouthNum == 2) curMouthNum = 1
        else if(Math.random() > .5) curMouthNum = 2 
        else curMouthNum = 0
        
        addCharacterToBackground(curMouthNum, backgroundImageFilepath)
    }
    
}

async function duplicateImage(pathToImage: string): Promise<void>{
    const newPath = path.dirname(pathToImage) + "/" + path.parse(pathToImage).name + "_dup" + path.extname(pathToImage)
    await sharp(pathToImage).toFile(newPath)
}