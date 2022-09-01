"use strict";
/**
 * This is the abstraction layer for users to make requests to the MovieMaking pipepline
 *
 * This calls two classes:
 *  1) The generation pipeline, which generates assets like Background Images, Script, and Voices
 *  2) The directing pipeline, which chooses the shots, animates the movie, adds sounds (like score, SFX, and voices), and creates the final video
 *
 * Keep things clean and simple here. Most of the logic should take place within the relevant classes in those folders.
 */
/**
 * Calls entire pipeline
 * @returns path to movie video file
 * //TODO: Should also return movieID
 */
exports.makeMovieFromPrompt = (prompt) => {
    console.log("MovieMaker::makeMovieFromPrompt: ", prompt);
    //TODO: Create and run generator object
    //TODO: Feed results of generator to director
    //TODO: Run director. Pass video file result back
    const pathToMovieFile = "";
    return pathToMovieFile;
};
/**
 * (Should) only call parts of pipeline that need to be regenerated based on what has changed in the script.
 * That's why it takes movieID as param - the generator pipeline will check its existing assets w/ that movieID and reuse the ones that still apply.
 *
 * @returns path to movie video file
 * //TODO: Should also return movieID
 */
exports.makeMovieFromScript = (script, movieID) => {
    //TODO
    const pathToMovieFile = "";
    return pathToMovieFile;
};
