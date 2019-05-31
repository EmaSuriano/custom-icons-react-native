const { execSync } = require('child_process');
const fs = require('fs');

const toPascalCase = string =>
  string
    .match(/[a-z]+/gi)
    .map(word => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase())
    .join('');

console.log('Ready to generate RN icon font ⏰');

// STEP 1: Generate .ttf and glyph map with all the icons
execSync(
  `icon-font-generator ./assets/icons/*.svg -o ./assets/font -n custom-font-icon -c false --html false --types ttf`,
);

// STEP 2: Modify glyph map, change hexa values to decimal
const glyphMap = JSON.parse(fs.readFileSync('./assets/font/custom-font-icon.json'));
const glyphMapDecimal = Object.keys(glyphMap).reduce(
  (acc, curr) => ({
    ...acc,
    [curr]: parseInt(glyphMap[curr].substr(1), 16),
  }),
  {},
);

fs.writeFileSync('./assets/font/custom-font-icon.json', JSON.stringify(glyphMapDecimal)); // write file

// STEP 3: Create index.js file with the respective exports
const indexLines = ["import React from 'react';", "import Icon from './Icon';", ''];
indexLines.push(
  ...Object.keys(glyphMap).map(
    iconKey =>
      `export const ${toPascalCase(iconKey)} = props => <Icon {...props} name="${iconKey}" />;`,
  ),
);

fs.writeFileSync('./src/Icon/index.js', indexLines.join('\n')); // write file

console.log('Font and glyph map created 🎉');
