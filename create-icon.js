const { execSync } = require('child_process');
const fs = require('fs');
const { camelCase, upperFirst } = require('lodash');

console.log('Ready to generate RN icon font!');

const FONT_ICON_NAME = 'custom-font-icon';
const ICONS_FOLDER = './assets/icons/real';
const OUTPUT_FOLDER = './assets/font';
const GLYPH_MAP_DIR = `${OUTPUT_FOLDER}/${FONT_ICON_NAME}.json`;
const ICON_COMPONENT_DIR = './src/Icon/index.native.js';

// generating ttf and glyph map with all the svg
execSync(
  `icon-font-generator ${ICONS_FOLDER}/*.svg -o ${OUTPUT_FOLDER} -n ${FONT_ICON_NAME} -c false --html false --types ttf`,
);

// creating index.native.js file with all the exports of icons
const indexFile = fs.openSync(ICON_COMPONENT_DIR, 'w');
fs.writeSync(indexFile, `import React from 'react';\nimport Icon from './Icon';\n\n`);

// reading generated glyphMap
const glyphMap = JSON.parse(fs.readFileSync(GLYPH_MAP_DIR));

// for each icon
const glyphMapDecimal = Object.keys(glyphMap).reduce((acc, curr) => {
  // create an entry inside index.native.js
  const nameInCamelCase = camelCase(curr);
  const nameInPascalCase = upperFirst(nameInCamelCase);
  fs.writeSync(
    indexFile,
    `export const ${nameInPascalCase} = props => <Icon {...props} name="${curr}" />;\n`,
  );

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
