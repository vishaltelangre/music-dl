const _ = require('lodash');
const cli = require('cli');
const path = require('path');
const Promise = require("promise");
const colors = require('colors');

const YoutubeClient = require('./youtube/client');

module.exports = class Provider {
  constructor(trackListUrl) {
    this.trackListUrl = trackListUrl;
  }

  canIdentify() {
    throw "Not Implemented";
  }

  parseList() {
    throw "Not Implemented";
  }

  downloadTracks() {
    const youtubeClient = new YoutubeClient();

    this.parseList().then(parsedInfo => {
      const { listTitle, trackList } = parsedInfo;
      const outputPath = path.join(process.cwd(), _.kebabCase(listTitle));

      console.log("Album/Playlist:".dim, listTitle.rainbow.bold, `(${outputPath})`.dim.italic);

      let sequence = Promise.resolve();
      trackList.forEach((trackInfo, index) => {
        sequence = sequence.then(() => {
          console.log("→".cyan, `(${index + 1}/${trackList.length})`, trackInfo.title.bgBlack.bold.yellow);

          if (!trackInfo.title) {
            cli.info("Empty track title, skipping...");
          } else {
            const query = `${trackInfo.title} ${trackInfo.album}`;
            const outputFilename = _.kebabCase(trackInfo.title);

            return youtubeClient.downloadAudioTrack(query, outputPath, outputFilename, trackInfo);
          }
        }).catch(cli.error);
      });
    }).catch(cli.error);
  }
}
