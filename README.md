# music-dl

Download music from saavn.com, gaana.com, etc.

### See it in action!

[![asciicast](https://user-images.githubusercontent.com/876195/27260168-c5d803fc-5442-11e7-8163-a08955d424ca.gif)](https://asciinema.org/a/125142?t=4)

With ID3 tags!

![id3-tags.png](https://user-images.githubusercontent.com/876195/27254951-4508b762-53b1-11e7-84e1-f5addc2953fa.png)


**NOTE:** Currently, it only supports saavn.com,
but there will be support to download from other sites as well
in future.

### Installation

```
npm install -g music-dl
```

### Usage

```
Usage:
  music-dl [OPTIONS] URL_OF_ALBUM_OR_PLAYLIST_HERE

Options:
  -k, --api_key STRING   API Key of YoutTube
  -v, --version          Display the current version
  -h, --help             Display help and usage details
```

### Does it really download from these sites?

Nope, it doesn't.
It just retrieves the list of songs
and information such as title, album, artists, etc.
from these sites.
It then downloads the matching music from YouTube.



### Copyright and License

Copyright (c) 2017, Vishal Telangre. All Rights Reserved.

This project is licenced under the [MIT License](LICENSE.txt).
