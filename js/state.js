const values={model:null,cameraStream:null,serialPort:null,serialWriter:null,running:false,lastHighlightedScenario:null};
export const state=Object.seal({
  get model(){return values.model},setModel:model=>{values.model=model},get cameraStream(){return values.cameraStream},setCameraStream:stream=>{values.cameraStream=stream},get serialPort(){return values.serialPort},setSerial:(port,writer)=>{values.serialPort=port;values.serialWriter=writer},clearSerial:()=>{values.serialPort=null;values.serialWriter=null},get serialWriter(){return values.serialWriter},get running(){return values.running},setRunning:running=>{values.running=running},get lastHighlightedScenario(){return values.lastHighlightedScenario},setLastHighlightedScenario:index=>{values.lastHighlightedScenario=index}
});
