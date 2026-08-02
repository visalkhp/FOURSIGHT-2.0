import { CONFIG,LABEL_COUNT } from "./config.js";
import { state } from "./state.js";
import { setStatus } from "./ui.js";
const modelUrl=`${CONFIG.MODEL.BASE_PATH}${CONFIG.MODEL.MODEL_FILE}`,metadataUrl=`${CONFIG.MODEL.BASE_PATH}${CONFIG.MODEL.METADATA_FILE}`;
export async function loadModel(){
  if(state.model)return state.model;
  if(!globalThis.tmImage)throw new Error("The Teachable Machine library could not be loaded. Check your internet connection and reload.");
  setStatus("model","Loading","busy");
  try{const model=await tmImage.load(modelUrl,metadataUrl);const labels=model.getClassLabels();if(labels.length!==LABEL_COUNT)throw new Error(`Expected ${LABEL_COUNT} classes, but the model has ${labels.length}.`);const mismatch=labels.some((label,index)=>label!==CONFIG.MODEL.LABELS[index]);if(mismatch)throw new Error("Model labels must be Scenario 1 through Scenario 6, in that order.");state.setModel(model);setStatus("model","Ready","good");return model;}
  catch(error){setStatus("model","Unavailable","error");throw new Error(`Model loading failed. Add a compatible Teachable Machine export to /model/. ${error.message}`);}
}
export async function classify(video){if(!state.model)throw new Error("The model is not loaded.");const results=await state.model.predict(video);let bestIndex=0;results.forEach((result,index)=>{if(result.probability>results[bestIndex].probability)bestIndex=index;});return {index:bestIndex,label:CONFIG.MODEL.LABELS[bestIndex],confidence:results[bestIndex].probability};}
