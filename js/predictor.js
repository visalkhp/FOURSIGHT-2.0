import {CONFIG} from "./config.js";
import {APP_STATE} from "./state.js";
import {predict} from "./classifier.js";
import {getVideoElement} from "./camera.js";

let running=false,lastTime=0,raf=0,busy=false;

function emit(result){
 document.dispatchEvent(new CustomEvent(CONFIG.EVENTS.PREDICTION_ACCEPTED,{detail:result}));
}

function evaluate(result,now){
 if(result.confidence<CONFIG.PREDICTION.CONFIDENCE_THRESHOLD){
   APP_STATE.candidatePrediction=null;
   return;
 }
 if(APP_STATE.candidatePrediction!==result.label){
   APP_STATE.candidatePrediction=result.label;
   APP_STATE.candidateStartTime=now;
   return;
 }
 if(now-APP_STATE.candidateStartTime>=CONFIG.PREDICTION.STABILITY_TIME_MS &&
    APP_STATE.stablePrediction!==result.label){
   APP_STATE.stablePrediction=result.label;
   APP_STATE.stableConfidence=result.confidence;
   emit(result);
 }
}

async function loop(ts){
 if(!running) return;
 raf=requestAnimationFrame(loop);
 if(ts-lastTime<1000/CONFIG.PREDICTION.MAX_FPS||busy) return;
 lastTime=ts; busy=true;
 try{ evaluate(await predict(getVideoElement()),ts);}finally{busy=false;}
}
export function startPrediction(){if(running)return;running=true;raf=requestAnimationFrame(loop);}
export function stopPrediction(){running=false;cancelAnimationFrame(raf);}
