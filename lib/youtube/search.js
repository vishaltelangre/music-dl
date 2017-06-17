'use strict';

const ytSearch = require('youtube-search');
const Promise = require("promise");

const DEFAULT_SEARCH_RESULT_LIMIT = 5;

module.exports = class YouTubeSearch {

  constructor(query, apiKey, limit = DEFAULT_SEARCH_RESULT_LIMIT) {
    this.query = query;
    this.apiKey = apiKey;
    this.limit = limit;
  }

  findLink() {
    const options = { maxResults: this.limit, key: this.apiKey };

    return new Promise((resolve, reject) => {
      ytSearch(this.query, options, (err, results) => {
        if (err) reject(err);

        const matchedVideo = results && results.find(result => result.kind === "youtube#video");

        resolve(matchedVideo && matchedVideo.link);
      });
    });
  }

}
