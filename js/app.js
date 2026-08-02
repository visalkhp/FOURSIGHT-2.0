import { CONFIG } from "./config.js";
import { startCamera,stopCamera } from "./camera.js";
import { loadModel } from "./classifier.js";
import { startPrediction,stopPrediction } from "./predictor.js";
import { connectSerial,isSerialSupported,sendPrediction } from "./serial.js";
import { clearPrediction,resetUI,setCompatibility,setStatus,showStablePrediction } from "./ui.js";
import { initializeInstallPrompt,registerServiceWorker,watchInstallation } from "./pwa.js";
const startButton=document.getElementById("startBtn"),stopButton=document.getElementById("stopBtn"),serialButton=document.getElementById("serialBtn");
async function startRecognition(){startButton.disabled=true;clearPrediction("Preparing recognition");try{await loadModel();await startCamera();startPrediction();}catch(error){console.error(error);clearPrediction("Unable to start");setCompatibility(error.message);startButton.disabled=false;}}
function stopRecognition(){stopPrediction();stopCamera();clearPrediction("Camera stopped");}
async function connectMicrobit(){serialButton.disabled=true;try{await connectSerial();}catch(error){console.error(error);setCompatibility(error.message);}finally{serialButton.disabled=false;}}
document.addEventListener(CONFIG.EVENTS.PREDICTION_ACCEPTED,async event=>{showStablePrediction(event.detail.label,event.detail.confidence,event.detail.index);await sendPrediction(event.detail);});
startButton.addEventListener("click",startRecognition);stopButton.addEventListener("click",stopRecognition);serialButton.addEventListener("click",connectMicrobit);
function boot(){resetUI();if(!isSerialSupported()){setCompatibility("Web Serial is not supported here. Use Chrome or Edge on desktop to connect a micro:bit.");serialButton.disabled=true;}initializeInstallPrompt();watchInstallation();registerServiceWorker();}
boot();
