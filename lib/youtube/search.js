'use strict';

const ytSearch = require('yt-search');
const Promise = require("promise");

const MAX_LENGTH_IN_SECONDS = 15 /* minutes */ * 60;

module.exports = class YouTubeSearch {

  constructor(query) {
    this.query = query;
  }

  findLink() {
    const options = { query: this.query, pageStart: 1, pageEnd: 1 };

    return new Promise((resolve, reject) => {
      ytSearch(options, (err, { videos }) => {
        if (err) reject(err);


        const matchedVideo = videos.filter(
          (video) => video.seconds <= MAX_LENGTH_IN_SECONDS
          )[0];

        resolve(matchedVideo && matchedVideo.url);
      });
    });
  }

}
