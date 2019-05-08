const { execSync } = require('child_process');
const fs = require('fs');

console.log('Ready to generate RN icon font!');

const FONT_ICON_NAME = 'omio-font-icon';
const FOLDER_TARGET = './assets';
const GLYPH_MAP_DIR = `${FOLDER_TARGET}/${FONT_ICON_NAME}.json`;

// generating ttf and glyph map with all the svg
execSync(
  `icon-font-generator ${FOLDER_TARGET}/*.svg -o omio-assets -n ${FONT_ICON_NAME} -c false --html false --types ttf`,
);

// creating index.native.js file with all the exports of icons
const indexFile = fs.openSync('./src/Icon/index.aux.native.js', 'w');
fs.writeSync(indexFile, `import React from 'react';\nimport Icon from './Icon';\n\n`);

// reading generated glyphMap
const glyphMap = JSON.parse(fs.readFileSync(GLYPH_MAP_DIR));

// for each icon
const glyphMapDecimal = Object.keys(glyphMap).reduce((acc, curr) => {
  // create an entry inside index.native.js
  fs.writeSync(indexFile, `export const ${curr} = props => <Icon {...props} name="${curr}" />;\n`);

  // need to change hexa value to decimal because RN does not handle it
  const decimalValue = parseInt(glyphMap[curr].substr(1), 16);
  return {
    ...acc,
    [curr]: decimalValue,
  };
}, {});

// replace original glyph map with the new one
fs.writeFileSync(GLYPH_MAP_DIR, JSON.stringify(glyphMapDecimal));

console.log('Font and glyph map created.');
