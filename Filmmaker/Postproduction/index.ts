import { DynamicAssetManager } from "../Crew/dynamicassetgenerator";
import { createAudioTimeline, AudioTimeline} from "./audiotimeline";
import {createVideoTimeline, VideoTimeline} from "./videotimeline"
import {animateVideoTimeline} from './animator'

/**
 * Creates the full movie from all assets, making choices about shot selection
 * Returns filepath to video
 */
export async function createMovie(assets: DynamicAssetManager): Promise<string>{
    const audioTimeline = createAudioTimeline(assets)
    const videoTimeline = createVideoTimeline(assets, audioTimeline)
    await animateAndMix(audioTimeline, videoTimeline, assets)
    return "" //TODO
}

async function animateAndMix(audioTimeline: AudioTimeline, videoTimeline: VideoTimeline, assets: DynamicAssetManager){ //TODO: Rename this
    await animateVideoTimeline(videoTimeline, assets)
    await addAudioToAnimatedVideo(audioTimeline, assets)
}

async function addAudioToAnimatedVideo(audioTimeline: AudioTimeline, assets: DynamicAssetManager){
    //TODO: Filepaths?
}