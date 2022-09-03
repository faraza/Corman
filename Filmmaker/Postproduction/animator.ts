

const animationFPS = 10

/**
 * 
 * @param backgroundImageFilepath Make sure you've cut the image to match the shot you want. That image file path will be passed here
 * @param characterImageDirectory The directory that contains the character in the angle and the emotion that you want
 * @param timeInMS //How many ms to animate for
 * @param fileoutputDirectory //Folder to drop all the files in. They will be named as 1,2,3,4 etc. for each frame. 1-indexed
 */
export async function animateShot({ backgroundImageFilepath, characterImageDirectory, timeInMS, fileoutputDirectory }: { backgroundImageFilepath: string; characterImageDirectory: string; timeInMS: number; fileoutputDirectory: string; }){
    console.log("Animator::animateShot. BackgroundImageFilePath: ", backgroundImageFilepath)
}