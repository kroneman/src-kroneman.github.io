#! /usr/bin/env node

const path = require('path');
const fse = require('fs-extra');

const [, , ...args] = process.argv;

const mapDownload = require('./lib/download-map-data-set');
const mapBuilder = require('./lib/geo-json-to-svg');

require('dotenv').config({
  path: path.resolve('.env'),
});

main();
async function main() {
  if(isInvalidArgOrHelp() || isMissingCredentials()) {
    helpText();
    return;
  }

  const lenArgs = args.length;

  for(let i = 0; i < lenArgs; i++) {
    const currentArg = args[i];

    switch (currentArg) {
      case '-d':
      case '--download':
        await mapDownload();
        break;
      case '-b':
      case '--build':
        await mapBuilder();
        break;
      case '-db':
      case '-bd':
        await mapDownload();
        await mapBuilder();
        break;
      default:
        break;
    }
  }
}

/**
 * Logs Help Text
 * @returns {void}
 */
function helpText() {
  console.info(`
    Kroneman IO Map Utils

    bin/map-tools.js [options]

    --download
      Downloads GeoJson data from Mapbox account using credentials
      which are stored in .env file

      If no .env file exists create one with updated credentials

      MAPBOX_USER_NAME=
      MAPBOX_ACCESSTOKEN=
      MAPBOX_COUNTRYDATASETID=

    --build
      Transforms geoJson downloaded from Mapbox into svg format

    --help
      This prompt

    examples:
      bin/map-tools.js -d
      bin/map-tools.js --download

      bin/map-tools.js -b
      bin/map-tools.js --build

      bin/map-tools.js -db
      bin/map-tools.js -bd
      bin/map-tools.js --download --build
  `);
}

/**
 * Checks for credentials to mapbox api in env
 * @returns {boolean}
 */
function isMissingCredentials() {
  const {
    MAPBOX_USER_NAME,
    MAPBOX_ACCESSTOKEN,
    MAPBOX_COUNTRYDATASETID,
  } = process.env;
  const requiredCredentials = {
    MAPBOX_USER_NAME,
    MAPBOX_ACCESSTOKEN,
    MAPBOX_COUNTRYDATASETID
  };
  const credentialsExist = Object.keys(requiredCredentials).every(
    credentialKey => {
      const keyHasValue = Boolean(requiredCredentials[credentialKey]);
      if(keyHasValue !== true) {
        console.error(
        `
          ERROR: ${credentialKey}: Not set
          Check .env
        `)
      }

      return keyHasValue;
    }
  );

  return !(credentialsExist);
}

/**
 * Checks for empty args, or --help being passed as an arg
 * @returns {boolean}
 */
function isInvalidArgOrHelp() {
  return !args || args.length < 1 || args.includes('--help');
}
