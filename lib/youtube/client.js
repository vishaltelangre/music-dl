const path = require("path");
const Promise = require("promise");

const YouTubeSearch = require("./search");
const YouTubeDownloader = require("./downloader");
const Id3Tagger = require("./../id3_tagger");

module.exports = class YoutubeClient {
  downloadAudioTrack(query, outputPath, outputFilename, trackInfo) {
    return new Promise((resolve, reject) => {
      const search = new YouTubeSearch(query);

      search
        .findLink()
        .then((link) => {
          new YouTubeDownloader(link, outputPath, outputFilename)
            .download()
            .then((mp3OutputPath) => {
              const tagger = new Id3Tagger(mp3OutputPath, trackInfo);
              tagger.tag();
              resolve(mp3OutputPath);
            })
            .catch((reason) => {
              console.error(reason);
              reject(reason);
            });
        })
        .catch((reason) => {
          console.error(reason);
          reject(reason);
        });
    });
  }
};
