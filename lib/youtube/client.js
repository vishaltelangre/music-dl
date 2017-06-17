const path = require('path');
const Promise = require("promise");

const YouTubeSearch = require('./search');
const YouTubeDownloader = require('./downloader');
const Id3Tagger = require('./../id3_tagger');

module.exports = class YoutubeClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  downloadAudioTrack(query, outputPath, outputFilename, trackInfo) {
    return new Promise((resolve, reject) => {
      if (!this.apiKey) reject(new Error("YouTube api key is not provided"));

      const search = new YouTubeSearch(query, this.apiKey);

      search.findLink().then((link) => {
        new YouTubeDownloader(link, outputPath, outputFilename).download()
          .then((mp3OutputPath) => {
            const tagger = new Id3Tagger(mp3OutputPath, trackInfo);
            tagger.tag();
            resolve(mp3OutputPath);
          }).catch(reject);
      }).catch(reject);
    })
  }
}
