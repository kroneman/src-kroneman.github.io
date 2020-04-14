#! /usr/bin/env node

const path = require('path');
const fse = require('fs-extra');

// using a modified version of https://github.com/w8r/geojson2svg
// cloned locally to be able to add property values as attributes on the path
const geojson2svg = require('geojson-to-svg');
const proj4 = require('proj4');
const EPSG3857 = require('epsg-index/s/3857.json');
const turf = require('@turf/turf');
const has = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);

const OUTPUT_PATH = path.resolve(__dirname, '../src/components/map/');
const VUE_TEMPLATE = path.resolve(OUTPUT_PATH, './map.template.vue');
const OUTPUT_FILE = path.join(OUTPUT_PATH, './map.generated.vue');

const dataset = require('../data/mapboxdataset.json');
const styles = {
  Point: {
    fill: '#ff7433',
    opacity: 1,
    stroke: 'none',
    radius: 15000
  },
  Polygon: {
    fill: 'transparent',
    opacity: .3,
    stroke: '#777',
    weight: 1500
  },
  LineString: {
    color: 'red',
    opacity: 1,
    fill: 'transparent',
    stroke: 'red',
    weight: 15000
  }
};
styles.MultiPolygon = styles.Polygon;

main();

async function main() {
  const filteredData = filterLineStrings(dataset);
  const combinedData = addGreatCircleRoutes(filteredData);
  const flipVertical = ([lat, long]) => {
    const isPositive = long > 0;
    const newlong = isPositive ? 0 - Math.abs(long) : Math.abs(long);
    const scaleLat = lat / 10;
    const scaleLong = newlong / 10;
    return [
      scaleLat,
      scaleLong,
    ];
  };

  const svgElementsRender = geojson2svg()
    .projection(([lat, long]) => {
      // return flipped;
      const newCoords = proj4(EPSG3857.proj4, [lat, long]);
      const flipped = flipVertical(newCoords);
      return flipped;
    })
    .styles(styles)
    .data(combinedData)
    .render();

  try {
    const vueTemplateBuffer = await fse.readFile(VUE_TEMPLATE);
    const vueTemplate = vueTemplateBuffer.toString();
    const outputString = vueTemplate.replace('<replace-with-generated />', svgElementsRender);
    await fse.writeFile(
      OUTPUT_FILE,
      outputString,
    );

    // eslint-disable-next-line no-console
    console.log(`Successfully generated file ${OUTPUT_FILE}`);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
}

/**
 * Filters out line strings from dataset.
 * @param {Object} dataset from mapbox
 * @returns {Object} dataset with filtered features
 */
function filterLineStrings(dataset) {
  const { features } = dataset;
  const withoutLineStrings = features.filter(
    feature => ['LineString'].every(
      type => type !== feature.geometry.type
    )
  );

  return {
    ...dataset,
    features: withoutLineStrings
  };
}

/**
 * @param {Object} dataset
 * @returns {Object}
 */
function addGreatCircleRoutes(dataset) {
  const { features } = dataset;
  const points = features.filter(feature => has(feature.properties, 'lennart'));
  const sortedPoints = sortByProperty(points, 'lennart');
  const greatCircleRoutes = sortedPoints.map((item, index, arr) => {
    if(index === arr.length - 1) {
      return null;
    }

    const current = item;
    const next = arr[index + 1];
    const turfCurrent = turf.point(current.geometry.coordinates);
    const turfNext = turf.point(next.geometry.coordinates);

    // https://turfjs.org/docs/#greatCircle
    const route = turf.greatCircle(turfCurrent, turfNext, {
      'name': 'flight-route',
      properties: {
        className: 'flight-route'
      },
      offset: 40
    });
    return route;
  }).filter(lineString => lineString !== null);

  return {
    ...dataset,
    features: [
      ...dataset.features,
      ...greatCircleRoutes
    ]
  };
}

/**
 * @param {array} arr of obj to sort
 * @param {string} property to sort arr of objects by
 * @returns {array} sorted
 */
function sortByProperty(arr, property) {
  return arr.sort((a, b) => {
    if(a.properties[property] < b.properties[property]) {
      return -1;
    }

    if(a.properties[property] === b.properties[property]) {
      return 0;
    }

    return 1;
  });
}
