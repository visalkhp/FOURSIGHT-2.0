import { CONFIG } from "./config.js";
import { state } from "./state.js";
import { getVideoElement } from "./camera.js";
import { classify } from "./classifier.js";
let frameId=null,candidateIndex=null,candidateStart=0,lastAccepted=null;
export function startPrediction(){stopPrediction();candidateIndex=null;candidateStart=0;lastAccepted=null;state.setRunning(true);frameId=requestAnimationFrame(tick);}
export function stopPrediction(){if(frameId)cancelAnimationFrame(frameId);frameId=null;candidateIndex=null;candidateStart=0;}
async function tick(timestamp){
  if(!state.running)return;
  try{const video=getVideoElement();if(video.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA){const prediction=await classify(video);if(prediction.index!==candidateIndex){candidateIndex=prediction.index;candidateStart=timestamp;}else if(timestamp-candidateStart>=CONFIG.STABILITY_MS&&prediction.index!==lastAccepted){lastAccepted=prediction.index;document.dispatchEvent(new CustomEvent(CONFIG.EVENTS.PREDICTION_ACCEPTED,{detail:prediction}));}}}
  catch(error){console.error("Prediction error",error);}
  if(state.running)frameId=requestAnimationFrame(tick);
}
