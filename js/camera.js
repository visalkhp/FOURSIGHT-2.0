import {CONFIG} from "./config.js";
import {APP_STATE} from "./state.js";
import {setCameraReady} from "./ui.js";

const video=document.getElementById("webcam");

export async function startCamera(){
  if(APP_STATE.cameraReady) return video;
  const stream=await navigator.mediaDevices.getUserMedia({
    video:{
      facingMode:CONFIG.CAMERA.facingMode,
      width:{ideal:CONFIG.CAMERA.width},
      height:{ideal:CONFIG.CAMERA.height}
    },
    audio:false
  });
  APP_STATE.webcamStream=stream;
  video.srcObject=stream;
  await new Promise(r=>video.onloadedmetadata=r);
  await video.play();
  APP_STATE.cameraReady=true;
  setCameraReady();
  return video;
}

export function getVideoElement(){return video;}
