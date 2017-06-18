'use strict';

const path = require('path');
const fs = require('fs');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const Promise = require("promise");
const mkdirp = require('mkdirp');
const colors = require('colors');

const { syncStdoutProgress } = require('./../util');

module.exports = class YouTubeDownloader {

  constructor(link, outputPath, outputFilename) {
    this.link = link;
    this.outputPath = outputPath;
    this.mp4OutputPath = path.join(outputPath, `${outputFilename}.mp4`);
    this.mp3OutputPath = path.join(outputPath, `${outputFilename}.mp3`);
  }

  download() {
    mkdirp.sync(this.outputPath);

    return new Promise((resolve, reject) => {
      const track = ytdl(this.link, { filter: "audioonly" });

      track.pipe(fs.createWriteStream(this.mp4OutputPath));

      track.on('progress', (chunkLength, downloaded, total) => {
        syncStdoutProgress(`Downloading: ${(downloaded / total * 100).toFixed(2)}% `);
      });

      track.on('end', () => {
        this.getLength().then(lengthInSeconds => {
          const conversionProc = ffmpeg(this.mp4OutputPath);

          // Fix: Incorrectly displays doubled duration metadata
          // in the converted audio file
          // Reference: https://github.com/fluent-ffmpeg/node-fluent-ffmpeg/issues/387
          conversionProc.outputOptions(['-write_xing 0']);

          if (lengthInSeconds) conversionProc.withDuration(lengthInSeconds);

          conversionProc.on('progress', (info) => {
            syncStdoutProgress(`Converting: ${info.percent.toFixed(2)}% `);
          }).on('end', () => {
            syncStdoutProgress('✓'.green.bold, true);
            fs.unlinkSync(this.mp4OutputPath);
            resolve(this.mp3OutputPath);
          }).save(this.mp3OutputPath);
        }).catch((err) => console.log(err));
      });

      track.on('error', err => reject(err));
    });
  }

  getLength() {
    return new Promise((resolve, _) => {
      ytdl.getInfo(this.link, (err, info) => resolve(info && info.length_seconds));
    });
  }

}
