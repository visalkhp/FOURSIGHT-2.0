# FOURSIGHT 2.0

FOURSIGHT 2.0 is a static, installable web application that recognizes one of six visual scenarios through a webcam and sends the recognized scenario (`1\n` through `6\n`) to a BBC micro:bit using the Web Serial API.

## Requirements

- A current desktop version of Chrome or Microsoft Edge for camera and Web Serial support.
- A secure origin: GitHub Pages, HTTPS, or `http://localhost`. Opening `index.html` directly from disk will not work.
- A Teachable Machine Image export built with exactly these six labels, in this order: `Scenario 1` through `Scenario 6`.

## Add the model

Export your Teachable Machine Image model as TensorFlow.js, then copy **all** export files into `model/` so this layout exists:

```text
model/
  model.json
  metadata.json
  group1-shard1of1.bin   # or all shard files supplied by the export
```

The model is not included in this repository because it is project-specific. The application checks that the model has exactly six classes and that their labels match the frozen specification before starting the camera.

## Run locally

Serve the repository with any local web server. For example, use your editor's static-server feature, then open the supplied localhost address in Chrome or Edge. Allow camera access when prompted.

## Use

1. Press **Start camera**. The model loads, then the browser requests camera permission.
2. Hold a scenario in view. Its top prediction must remain unchanged for one second before it is accepted.
3. Optionally press **Connect micro:bit**, choose the micro:bit serial device, and ensure its program reads newline-delimited values at 115200 baud.
4. Each newly accepted scenario sends one value, `1\n` through `6\n`; repeated stable frames for the same scenario are suppressed.

## Deploy to GitHub Pages

1. Create a GitHub repository and upload the contents of this project, including the `model/` folder.
2. In **Settings → Pages**, deploy from the desired branch and the repository root.
3. Open the generated HTTPS URL in Chrome or Edge.

The asset paths are relative, so deployment works from a GitHub Pages project site (for example `https://account.github.io/repository/`) without changes.

## Offline behavior

After the first successful load, the service worker caches the app shell and same-origin files fetched by the app, including your model export. The browser must be online for the first visit because TensorFlow.js and Teachable Machine are loaded from their CDNs.

## Project layout

```text
index.html       Application UI
style.css        Responsive visual design
js/              ES modules for configuration, state, UI, camera, model, prediction, serial, PWA, and orchestration
model/           Your Teachable Machine TensorFlow.js export
sw.js            Service worker
manifest.json    PWA manifest
```
