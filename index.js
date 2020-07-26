#!/usr/bin/env node

var PrerequisitesChecker = require('./lib/prerequisites_checker');

PrerequisitesChecker(function() {
  const _ = require('lodash');
  const cli = require('cli');
  const colors = require('colors');
  const updateNotifier = require('update-notifier');

  const { name, version } = require('./package.json');

  const Saavn = require('./lib/providers/saavn');
  const Gaana = require('./lib/providers/gaana');

  const supportedProviders = [Saavn, Gaana];

  updateNotifier({
    pkg: { name, version },
    updateCheckInterval: 1000 * 60 * 60 * 24 * 1 // Every day
  }).notify();

  cli.enable('version');
  cli.setApp(name, version);
  cli.parse();

  if (!cli.args[0]) {
    cli.error("Please provide the URL to the album/playlist of songs which you want to download.")
    console.log("Usage:".bold);
    console.log("  ", name, "URL_OF_ALBUM_OR_PLAYLIST_HERE".dim);
    console.log();
    console.log("For other options, use --help option.");
    return;
  }

  const tracklistUrl = cli.args.shift();

  const matchedProvider = _.find(supportedProviders, providerKlass => {
    return (new providerKlass(tracklistUrl)).canIdentify();
  });

  if (matchedProvider) {
    (new matchedProvider(tracklistUrl)).downloadTracks();
  } else {
    cli.error(`Couldn't identify the provided playlist/album URL: "${tracklistUrl}"`);
  }
});
