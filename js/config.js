export const CONFIG=Object.freeze({
 APP_NAME:"FOURSIGHT 2.0",
 MODEL:{
  MODEL_URL:"./model/model.json",
  METADATA_URL:"./model/metadata.json",
  LABELS:["Scenario 1","Scenario 2","Scenario 3","Scenario 4","Scenario 5","Scenario 6"]
 },
 PREDICTION:{CONFIDENCE_THRESHOLD:0.9,STABILITY_TIME_MS:1000,MAX_FPS:30},
 CAMERA:{width:640,height:640,facingMode:"environment"},
 SERIAL:{BAUD_RATE:115200,LINE_ENDING:"\n"},
 EVENTS:{PREDICTION_ACCEPTED:"predictionaccepted"}
});
