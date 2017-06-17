const fs = require('fs');
const os = require('os');
const path = require('path');

const MANIFEST_PATH = path.join(os.homedir(), '.music-dl.json');

exports.Settings = class Settings {
  static get() {
    if (fs.existsSync(MANIFEST_PATH)) {
      try {
        return JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
      } catch(err) {
        throw new Error(`Error while parsing setting manifest at "${MANIFEST_PATH}": ${err}`);
      }
    } else {
      return {};
    }
  }

  static set(json) {
    const newManifest = Object.assign(this.get(), json);

    fs.writeFileSync(MANIFEST_PATH, JSON.stringify(newManifest), 'utf8');
  }

  static setYouTubeApiKey(key) {
    this.set({apiKey: key});
  }

  static getYouTubeApiKey() {
    return this.get().apiKey;
  }
}

exports.SettingsManifestPath = MANIFEST_PATH;
