import {CONFIG} from "./config.js";
import {APP_STATE} from "./state.js";
import {setSerialConnected,setSerialDisconnected} from "./ui.js";
const enc=new TextEncoder();
export async function connectSerial(){
 const p=await navigator.serial.requestPort();
 await p.open({baudRate:CONFIG.SERIAL.BAUD_RATE});
 APP_STATE.serialPort=p;
 APP_STATE.serialWriter=p.writable.getWriter();
 APP_STATE.serialConnected=true;
 setSerialConnected();
}
export async function sendPrediction(pred){
 if(!APP_STATE.serialConnected) return;
 if(APP_STATE.lastSentPrediction===pred.label) return;
 await APP_STATE.serialWriter.write(enc.encode((pred.index+1)+CONFIG.SERIAL.LINE_ENDING));
 APP_STATE.lastSentPrediction=pred.label;
}
export async function disconnectSerial(){
 if(APP_STATE.serialWriter){await APP_STATE.serialWriter.close();APP_STATE.serialWriter.releaseLock();}
 if(APP_STATE.serialPort) await APP_STATE.serialPort.close();
 APP_STATE.serialConnected=false;
 setSerialDisconnected();
}
