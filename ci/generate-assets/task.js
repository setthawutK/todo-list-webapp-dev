const fs = require('fs-extra');
const path = require('path');
const { reorient } = require('svg-reorient');
const { generateFonts, FontAssetType, OtherAssetType } = require('fantasticon');

// Read all SVG files in the directory
// remove fill-rule of SVG files
function preprocesSvgs(dir) {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    // Loop through each SVG file
    files.forEach(file => {
      const filePath = path.join(dir, file);

      // Read the contents of the SVG file
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          return;
        }

        // Modified SVG conent
        const modifiedContent = reorient(data);

        // Create the output file path
        const outputFilePath = path.join(dir, file);

        // Save the modified SVG file
        fs.writeFile(outputFilePath, modifiedContent, err => {
          if (err) {
            console.error('Error saving file:', err);
            return;
          }

          console.log('Modified file saved:', outputFilePath);
        });
      });
    });
  });
}

function clearAndCreateDir(dir) {
  if (fs.existsSync(dir)) {
    fs.removeSync(dir);
  }
  fs.ensureDirSync(dir);
}

function generateIcon(inputDir, outputDir, name, prefix) {
  // preprocess SVG files
  preprocesSvgs(inputDir);
  // prepare dir
  clearAndCreateDir(outputDir);

  return generateFonts({
    inputDir: inputDir,
    outputDir: outputDir,
    name: name,
    fontTypes: [FontAssetType.EOT, FontAssetType.WOFF2, FontAssetType.WOFF],
    assetTypes: [OtherAssetType.CSS, OtherAssetType.HTML, OtherAssetType.JSON, OtherAssetType.TS],
    formatOptions: { json: { indent: 2 } },
    templates: {
      html: 'ci/generate-assets/template/index.html.hbs',
    },
    pathOptions: {},
    codepoints: {},
    fontHeight: 300,
    round: undefined, // --
    descent: undefined, // Will use `svgicons2svgfont` defaults
    normalize: undefined, // --
    selector: null,
    tag: 'i',
    prefix: prefix,
  });
}

async function bootstrap() {
  // generate movembiz-icon
  const movebizIcon = await generateIcon(
    './src/assets/generate/icon',
    './src/assets/generate/icon-font/m-icon',
    'x-icon',
    'mb-i'
  );
  console.log(movebizIcon);
}

bootstrap();
