const nodeID3 = require('node-id3');
const request = require('request');

module.exports = class Id3Tagger {
  constructor(audioFilepath, tags) {
    this.audioFilepath = audioFilepath;
    this.tags = tags;
  }

  tag() {
    return request({
      url: this.tags.image,
      encoding: null,
      method: 'GET'
    }, (err, res, imageBuffer) => {
      if (imageBuffer) {
        this.tags.image = imageBuffer;
      }

      nodeID3.write(this.tags, this.audioFilepath);
    });
  }
}
