import { DynamicAssetManager } from "../Crew/dynamicassetgenerator";
import { createAudioTimeline, AudioTimeline} from "./audiotimeline";
import {createVideoTimeline, VideoTimeline} from "./videotimeline"

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

async function animateVideoTimeline(videoTimeline: VideoTimeline, assets: DynamicAssetManager){
    //TODO: Filepaths?
    //TODO: We're going to need to refactor and unify a bunch of types for this to be clean. Once we do that, actually doing the animation should be easy
        //Each shot in the video timeline needs to tell us ActiveSpeaker and shot location
        //We also don't want to regen the shot background everytime, so we should have a step that just does that once
}

async function addAudioToAnimatedVideo(audioTimeline: AudioTimeline, assets: DynamicAssetManager){
    //TODO: Filepaths?
}