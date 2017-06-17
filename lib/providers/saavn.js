const url = require('url');
const osmosis = require('osmosis');
const Promise = require("promise");
const cli = require('cli');

const Provider = require('./../provider');

const USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36";

module.exports = class Saavn extends Provider {
  canIdentify() {
    return url.parse(this.trackListUrl).host.match(RegExp(Saavn.hostName()));
  }

  parseList() {
    return new Promise((resolve, reject) => {
      osmosis
        .get(this.trackListUrl)
        .config('headers', { "User-Agent": USER_AGENT })
        .find('.page-wrap.album-view, .page-wrap.playlist')
        .set({ listTitle: 'h1', list: [osmosis.find('.track-list li .song-json')] })
        .data((data) => {
          const trackList = data.list.map(JSON.parse).map(track => {
            return {
              title: track.title,
              album: track.album,
              image: track.image_url,
              composer: track.music,
              artist: track.singers,
              year: track.year
            };
          });

          resolve({listTitle: data.listTitle, trackList});
        })
        .log(message => { process.env.DEBUG && cli.debug(message); })
        .error(err => {
          if (err.match(/no results/))
            reject("Couldn't find any tracks on the provided link")
          else
            reject(err)
        })
    });
  }

  static hostName() {
    return "saavn.com";
  }
}
