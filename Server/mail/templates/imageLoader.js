// mail/utils/imageLoader.js
const fs = require('fs');
const path = require('path');

exports.loadImageAsBase64 = (imageName) => {
  let base64 = '';
  try {
    const imagePath = path.join(__dirname, `../../images/${imageName}`);
    base64 = fs.readFileSync(imagePath).toString('base64');
  } catch (error) {
    console.warn(`Warning: Could not load image ${imageName}:`, error.message);
  }
  return base64;
};