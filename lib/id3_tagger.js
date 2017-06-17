const nodeID3 = require('node-id3');

module.exports = class Id3Tagger {
  constructor(audioFilepath, tags) {
    this.audioFilepath = audioFilepath;
    this.tags = tags;
  }

  tag() {
    nodeID3.write(this.tags, this.audioFilepath);
  }
}
