import { CONFIG } from "./config.js";
import { state } from "./state.js";
import { setStatus } from "./ui.js";
const encoder=new TextEncoder();
export function isSerialSupported(){return "serial" in navigator;}
export async function connectSerial(){
  if(!isSerialSupported())throw new Error("Web Serial is unavailable. Use Chrome or Edge on a desktop computer.");
  if(state.serialPort)return;
  setStatus("serial","Connecting","busy");
  try{const port=await navigator.serial.requestPort();await port.open({baudRate:CONFIG.SERIAL_BAUD_RATE});state.setSerial(port,port.writable.getWriter());port.addEventListener?.("disconnect",handleDisconnect);setStatus("serial","Connected","good");}
  catch(error){setStatus("serial","Not connected","error");throw new Error(error.name==="NotFoundError"?"No micro:bit was selected.":`Could not connect the micro:bit: ${error.message}`);}
}
export async function sendPrediction(prediction){if(!state.serialWriter)return false;try{await state.serialWriter.write(encoder.encode(`${prediction.index+1}\n`));return true;}catch(error){handleDisconnect();console.error("Serial write failed",error);return false;}}
export async function disconnectSerial(){const writer=state.serialWriter,port=state.serialPort;try{writer?.releaseLock();await port?.close();}catch(error){console.warn("Serial close failed",error);}finally{state.clearSerial();setStatus("serial","Not connected");}}
function handleDisconnect(){state.clearSerial();setStatus("serial","Disconnected","error");}
