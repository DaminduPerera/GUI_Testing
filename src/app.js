const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Function to convert Hex to RGB
function hexToRgb(hex) {
    hex = hex.replace("#", "");
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgb(${r}, ${g}, ${b})`;
}

// Function to convert RGB to Hex
function rgbToHex(rgb) {
    const rgbArr = rgb.split(',').map(Number);
    const hex = `#${((1 << 24) | (rgbArr[0] << 16) | (rgbArr[1] << 8) | rgbArr[2]).toString(16).slice(1)}`;
    return hex;
}

// API endpoint to convert Hex to RGB
app.post('/api/hex-to-rgb', (req, res) => {
    const hex = req.body.hex;
    const rgb = hexToRgb(hex);
    res.json({ rgb });
});

// API endpoint to convert RGB to Hex
app.post('/api/rgb-to-hex', (req, res) => {
    const rgb = req.body.rgb;
    const hex = rgbToHex(rgb);
    res.json({ hex });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
