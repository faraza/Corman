import sharp from 'sharp'
import path from 'path'

export function testBasicImageGen (): void{
    console.log("Testing basic image gen")
    duplicateImage('/Users/farazabidi/Documents/Corman/animation_assets/backgrounds/kings_chambers.png')
}

async function duplicateImage(pathToImage: string): Promise<void>{
    const newPath = path.dirname(pathToImage) + "/" + path.parse(pathToImage).name + "_dup" + path.extname(pathToImage)
    await sharp(pathToImage).toFile(newPath)
}