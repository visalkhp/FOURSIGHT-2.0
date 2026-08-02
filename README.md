# FOURSIGHT 2.0

## Requirements
- Chrome/Edge (Web Serial)
- HTTPS or GitHub Pages
- Teachable Machine export (TFJS 1.7.4)

## Setup
1. Copy exported model files into `/model`.
2. Open `index.html` via GitHub Pages or a local web server.
3. Click **Start Camera**.
4. Click **Connect micro:bit**.
5. Hold a scenario until it remains stable for 1 second.
6. The app sends `1\n` to `6\n` over Web Serial.

## Structure

- index.html
- style.css
- manifest.json
- sw.js
- js/
- model/

