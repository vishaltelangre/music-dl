const url = require('url');
const osmosis = require('osmosis');
const Promise = require("promise");
const cli = require('cli');

const Provider = require('./../provider');

const USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36";

module.exports = class Gaana extends Provider {
  canIdentify() {
    const host = url.parse(this.trackListUrl).host;
    return host && host.match(new RegExp(Gaana.hostName()));
  }

  parseList() {
    return new Promise((resolve, reject) => {
      osmosis
        .get(this.trackListUrl)
        .config('headers', { "User-Agent": USER_AGENT })
        .set({listTitle: 'h1'})
        .set({ list: [osmosis.find('[data-type="playSong"].parentnode')] })
        .data((data) => {
          try {
            const trackList = data.list.map(JSON.parse).map(track => {
              // Example artists: "Anuradha Paudwal###212098###anuradha-paudwal-2,Kumar Sanu###1###kumar-sanu"
              const artists = `${track.artist}`.split(",")
                .map(artist => artist.split('###')[0]);
              return {
                title: track.title,
                album: track.albumtitle,
                image: track.albumartwork,
                artist: artists.join(", "),
                time: track.duration,
                year: track.release_date && (new Date(track.release_date)).getFullYear()
              };
            });

            if (!trackList.length) {
              reject("Couldn't find any tracks on the provided link");
            }

            resolve({ listTitle: data.listTitle, trackList });
          } catch (error) {
            reject(`Error while parsing the list of tracks on the provided link`);
          }
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
    return "gaana.com";
  }
}
