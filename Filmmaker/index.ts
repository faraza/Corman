/**
 * This is the abstraction layer for users to make requests to the MovieMaking pipepline
 * 
 * This calls two classes: 
 *  1) The generation pipeline, which generates assets like Background Images, Script, and Voices
 *  2) The directing pipeline, which chooses the shots, animates the movie, adds sounds (like score, SFX, and voices), and creates the final video
 * 
 * Keep things clean and simple here. Most of the logic should take place within the relevant classes in those folders.
 */

// const DynamicAssetGenerator = require('./DynamicAssetGenerator')
import {DynamicAssetGenerator, DynamicAssetManager} from './Crew/dynamicassetgenerator'
import { createMovie } from './Postproduction';

/**
 * Calls entire pipeline
 * @returns path to movie video file
 * //TODO: Should also return movieID
 */
export async function makeMovieFromPrompt(prompt: string): Promise<string>{
    const dag = new DynamicAssetGenerator()
    // dag.generateAssetsFromPrompt({prompt: prompt}) //TODO
    
    const assets: DynamicAssetManager = await dag.__generateDummyAssets(100);
    return await createMovie(assets)
} 

/**
 * (Should) only call parts of pipeline that need to be regenerated based on what has changed in the script.
 * That's why it takes movieID as param - the generator pipeline will check its existing assets w/ that movieID and reuse the ones that still apply.
 * 
 * @returns path to movie video file
 * //TODO: Should also return movieID
 */
export async function makeMovieFromScript(script: string, movieID: string): Promise<string>{
    //TODO

    const pathToMovieFile = ""
    return pathToMovieFile
}

module.exports.makeMovieFromPrompt = makeMovieFromPrompt
module.exports.makeMovieFromScript = makeMovieFromScript

// makeMovieFromPrompt("Blah blah")