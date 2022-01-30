#! /usr/bin/env node

const path = require('path');
const fse = require('fs-extra');

// using a modified version of https://github.com/w8r/geojson2svg
// cloned locally to be able to add property values as attributes on the path
const geojson2svg = require('geojson-to-svg');
const proj4 = require('proj4');
const EPSG3857 = require('epsg-index/s/3857.json');

const OUTPUT_PATH = path.resolve(__dirname, '../../vue-implementation/src/components/map/');
const VUE_TEMPLATE = path.resolve(OUTPUT_PATH, './map.template.vue');
const OUTPUT_FILE = path.join(OUTPUT_PATH, './map.generated.vue');
const OUTPUT_SVG_FILE = path.join(__dirname, '../../next-implementation/public/assets/map/worldMap.svg')

const dataset = require('../../data/mapboxdataset.json');
const styles = {
  Point: {
    fill: '#ff7433',
    opacity: .5,
    stroke: 'none',
    radius: 7500
  },
  Polygon: {
    fill: 'transparent',
    opacity: .3,
    stroke: '#fff',
    weight: 1500
  },
  LineString: {
    color: 'currentColor',
    opacity: 1,
    fill: 'transparent',
    stroke: 'currentColor',
    weight: 15000
  }
};
styles.MultiPolygon = styles.Polygon;

module.exports = main;

async function main() {
  const filteredData = filterLineStrings(dataset);
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
      const newCoords = proj4(EPSG3857.proj4, [lat, long]);
      return flipVertical(newCoords);
    })
    .styles(styles)
    .data(filteredData)
    .render();

  try {
    const vueTemplateBuffer = await fse.readFile(VUE_TEMPLATE);
    const vueTemplate = vueTemplateBuffer.toString();
    const outputString = vueTemplate.replace('<replace-with-generated />', svgElementsRender);
    await fse.writeFile(
      OUTPUT_FILE,
      outputString,
    );
    await fse.writeFile(
      OUTPUT_SVG_FILE,
      svgElementsRender
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
