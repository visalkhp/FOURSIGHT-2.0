const ids={
 modelStatus:document.getElementById("modelStatus"),
 cameraStatus:document.getElementById("cameraStatus"),
 predictionStatus:document.getElementById("predictionStatus"),
 confidenceValue:document.getElementById("confidenceValue"),
 serialStatus:document.getElementById("serialStatus")
};
const cards=[1,2,3,4,5,6].map(i=>document.getElementById("card"+i));

export function resetUI(){
 ids.modelStatus.textContent="Loading...";
 ids.cameraStatus.textContent="Waiting";
 ids.predictionStatus.textContent="None";
 ids.confidenceValue.textContent="0%";
 ids.serialStatus.textContent="Disconnected";
 cards.forEach(c=>c.classList.remove("selected"));
}
export function setModelReady(){ids.modelStatus.textContent="Ready";}
export function setCameraReady(){ids.cameraStatus.textContent="Ready";}
export function setSerialConnected(){ids.serialStatus.textContent="Connected";}
export function setSerialDisconnected(){ids.serialStatus.textContent="Disconnected";}
export function showStablePrediction(label,confidence,index){
 ids.predictionStatus.textContent=label;
 ids.confidenceValue.textContent=(confidence*100).toFixed(1)+"%";
 cards.forEach(c=>c.classList.remove("selected"));
 if(cards[index]) cards[index].classList.add("selected");
}
