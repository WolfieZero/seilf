/* eslint-env node */

import icongen from 'icon-gen';
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetDirectoryPath = path.join(__dirname, '../src/assets');

const iconsToConvert = [
  {
    name: 'app',
    filePath: path.join(assetDirectoryPath, 'app.png'),
    options: {
      ico: {
        name: 'app',
        sizes: [16, 24, 32, 48, 64, 128, 256],
      },
      icns: {
        name: 'app',
        sizes: [16, 32, 64, 128, 256, 512, 1024],
      },
    },
  },
];

const iconsToResize = [
  {
    filePathFrom: path.join(assetDirectoryPath, 'tray.png'),
    filePathTo: path.join(assetDirectoryPath, 'TrayIconTemplate@1x.png'),
    size: [16, 16],
  },
  {
    filePathFrom: path.join(assetDirectoryPath, '_tray.png'),
    filePathTo: path.join(assetDirectoryPath, 'TrayIconTemplate@2x.png'),
    size: [32, 32],
  },
];

const resizeIcon = icon =>
  sharp(icon.filePathFrom)
    .resize(icon.size[0], icon.size[1], { fit: 'cover' })
    .toFile(icon.filePathTo)
    .then(results => {
      console.info(results);
    })
    .catch(err => {
      console.error(err);
    });

const pngToOsIconCoverter = icon =>
  icongen(icon.filePath, assetDirectoryPath, { name: icon.name, ...icon.options })
    .then(results => {
      console.info(results);
    })
    .catch(err => {
      console.error(err);
    });

iconsToConvert.forEach(pngToOsIconCoverter);
iconsToResize.forEach(resizeIcon);
