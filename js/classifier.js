import {CONFIG} from "./config.js";
import {APP_STATE} from "./state.js";
import {setModelReady} from "./ui.js";

export async function loadModel(){
  if(APP_STATE.modelLoaded) return APP_STATE.model;
  const model=await tmImage.load(CONFIG.MODEL.MODEL_URL,CONFIG.MODEL.METADATA_URL);
  APP_STATE.model=model;
  APP_STATE.modelLoaded=true;
  setModelReady();
  return model;
}

export async function predict(video){
  const results=await APP_STATE.model.predict(video);
  let best=0;
  for(let i=1;i<results.length;i++){
    if(results[i].probability>results[best].probability) best=i;
  }
  return{
    index:best,
    label:CONFIG.MODEL.LABELS[best],
    confidence:results[best].probability,
    raw:results
  };
}
