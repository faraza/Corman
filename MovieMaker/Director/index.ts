import { DynamicAssetManager } from "../DynamicAssetGenerator";
import { createAudioTimeline, AudioTimeline} from "./AudioTimeline";
import {createVideoTimeline, VideoTimeline} from "./VideoTimeline"

/**
 * Creates the full movie from all assets, making choices about shot selection
 */
export async function createMovie(assets: DynamicAssetManager){
    const audioTimeline = createAudioTimeline(assets)
    const videoTimeline = createVideoTimeline(assets, audioTimeline)
    return await constructMovie(audioTimeline, videoTimeline, assets)
}

async function constructMovie(audioTimeline: AudioTimeline, videoTimeline: VideoTimeline, assets: DynamicAssetManager){
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