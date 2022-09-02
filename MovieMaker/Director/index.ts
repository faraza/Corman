import { DynamicAssetManager } from "../DynamicAssetGenerator";
import { createAudioTimeline, AudioTimeline} from "./AudioTimeline";

/**
 * Creates the full movie from all assets, making choices about shot selection
 */
export async function createMovie(assets: DynamicAssetManager){
    const audioTimeline = createAudioTimeline(assets)
    const videoTimeline = createVideoTimeline(assets, audioTimeline)
    return await constructMovie(audioTimeline, videoTimeline)
}

function createVideoTimeline(assets: DynamicAssetManager, audioTimeline: AudioTimeline): VideoTimeline{
    //TODO: Decide shots
    //TODO: Animate 
    const timeline = new VideoTimeline()
    return timeline
}


async function constructMovie(audioTimeline: AudioTimeline, videoTimeline: VideoTimeline){

}

class VideoTimeline{

}
