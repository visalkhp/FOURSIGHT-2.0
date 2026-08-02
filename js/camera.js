import { state } from "./state.js";
import { setCameraControls,setStatus } from "./ui.js";
const video=document.getElementById("webcam"),overlay=document.getElementById("overlay");
export async function startCamera(){
  if(!navigator.mediaDevices?.getUserMedia)throw new Error("This browser does not support camera access.");
  setStatus("camera","Requesting access","busy");
  try{const stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"},audio:false});video.srcObject=stream;await video.play();state.setCameraStream(stream);state.setRunning(true);resizeOverlay();setCameraControls(true);setStatus("camera","Running","good");}
  catch(error){setStatus("camera","Unavailable","error");throw new Error(error.name==="NotAllowedError"?"Camera access was denied. Allow camera access and try again.":`Unable to start the camera: ${error.message}`);}
}
export function stopCamera(){state.setRunning(false);state.cameraStream?.getTracks().forEach(track=>track.stop());video.srcObject=null;overlay.width=overlay.height=0;setCameraControls(false);setStatus("camera","Stopped");}
export function resizeOverlay(){if(!video.videoWidth)return;overlay.width=video.videoWidth;overlay.height=video.videoHeight;}
export function getVideoElement(){return video;}
