import {CONFIG} from "./config.js";
import {resetUI,showStablePrediction} from "./ui.js";
import {loadModel} from "./classifier.js";
import {startCamera} from "./camera.js";
import {startPrediction} from "./predictor.js";
import {connectSerial,sendPrediction} from "./serial.js";
import {registerServiceWorker,initializeInstallPrompt,watchInstallation} from "./pwa.js";

document.getElementById("startBtn").onclick=async()=>{
 await loadModel();
 await startCamera();
 startPrediction();
};
document.getElementById("serialBtn").onclick=connectSerial;

document.addEventListener(CONFIG.EVENTS.PREDICTION_ACCEPTED,async e=>{
 const p=e.detail;
 showStablePrediction(p.label,p.confidence,p.index);
 await sendPrediction(p);
});

resetUI();
initializeInstallPrompt();
watchInstallation();
registerServiceWorker();
