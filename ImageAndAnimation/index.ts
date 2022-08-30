import sharp from 'sharp'
import path from 'path'
import { animateCharacter } from './Character'


const backgroundImageFilepath = "/Users/farazabidi/Documents/Corman/animation_assets/backgrounds/kings_chambers.png"
export function testBasicImageGen (): void{
    console.log("Testing basic image gen")
    duplicateImage('/Users/farazabidi/Documents/Corman/animation_assets/backgrounds/kings_chambers.png')
}

export function testCharacterMouthAnimation (): void{
    console.log("Testing character mouth animation")
    animateCharacter(backgroundImageFilepath)
}

async function duplicateImage(pathToImage: string): Promise<void>{
    const newPath = path.dirname(pathToImage) + "/" + path.parse(pathToImage).name + "_dup" + path.extname(pathToImage)
    await sharp(pathToImage).toFile(newPath)
}