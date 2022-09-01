import sharp from "sharp"

const characterFilePath = "/Users/farazabidi/Documents/Corman/animation_assets/characters/maho/ots/neutral/"
const outputFilePath = "/Users/farazabidi/Documents/Corman/output_animation/"
let frameNumber:number = 0
/**
 * TODO: This should be exported to a separate class called Animator
 */
export function animateCharacter(backgroundImage: string): void{
    
    //TODO: generate multiple
    addCharacterToBackground(1, backgroundImage)
}

//TODO: Take character info as param
export async function addCharacterToBackground(poseNumber: number, backgroundImage: string): Promise<void>{    
    await sharp(backgroundImage)
    .composite([
        {input: characterFilePath + poseNumber + ".png", top: 100, left: 200}
    ])
    .toFile(outputFilePath + frameNumber++ + ".png")
    console.log("addCharacterToBackground. Filepath: " + (outputFilePath + (frameNumber - 1)))
}