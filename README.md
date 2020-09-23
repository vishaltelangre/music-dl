# music-dl

<img src="https://user-images.githubusercontent.com/876195/27261560-261ebf7e-5463-11e7-99d4-40c3481eab17.png" width="300" />

Download music from saavn.com, gaana.com, etc.

[![npm](https://img.shields.io/npm/v/music-dl.svg?style=plastic)](https://www.npmjs.com/package/music-dl) [![npm](https://img.shields.io/npm/dt/music-dl.svg?style=plastic)](https://www.npmjs.com/package/music-dl) [![npm](https://img.shields.io/github/license/vishaltelangre/music-dl.svg?style=plastic)](LICENSE.txt)

### See it in action!

[![asciicast](https://user-images.githubusercontent.com/876195/27260168-c5d803fc-5442-11e7-8163-a08955d424ca.gif)](https://asciinema.org/a/125142?t=4)

With ID3 tags!

![id3-tags.png](https://user-images.githubusercontent.com/876195/27254951-4508b762-53b1-11e7-84e1-f5addc2953fa.png)

**NOTE:** Currently, it only supports saavn.com and gaana.com,
but there will be support to download from other sites as well
in future.

### Installation

Please make sure that you have the following:

- `node v6.x` or latest
- `npm v5.x` or latest versions installed on your machine
- `ffmpeg` (install using `sudo apt-get install ffmpeg` on ubuntu)


```
npm install -g music-dl
```

Please use the same command
to upgrade the already installed package
to the latest version.

### Usage

```
Usage:
  music-dl [OPTIONS] URL_OF_ALBUM_OR_PLAYLIST_HERE

Options:
  -v, --version          Display the current version
  -h, --help             Display help and usage details
```

**Examples:**

Just provide the link of a album or a playlist to `music-dl` and hit enter!

```
music-dl http://gaana.com/album/aashiqui
music-dl http://gaana.com/playlist/gaana-dj-best-of-anuradha-paudwal
music-dl https://www.saavn.com/s/album/hindi/Yaara-Dildara-1993/OKbWYkAThtA_
music-dl https://www.saavn.com/s/featured-playlists/english/Hello_Adele/EFoglaGFXps_
```

### Does it really download from these sites?

Nope, it doesn't.
It just retrieves the list of songs
and information such as title, album, artists, etc.
from these sites.
It then downloads the matching music from YouTube.

### Copyright and License

Copyright (c) 2017-2020, Vishal Telangre and Contributors. All Rights Reserved.

This project is licenced under the [MIT License](LICENSE.txt).
