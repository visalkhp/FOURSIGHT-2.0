export const CONFIG = Object.freeze({
  APP_NAME: "FOURSIGHT 2.0", CACHE_NAME: "foursight-2.0-v1",
  MODEL: Object.freeze({ BASE_PATH: "./model/", MODEL_FILE: "model.json", METADATA_FILE: "metadata.json", LABELS: Object.freeze(["Scenario 1","Scenario 2","Scenario 3","Scenario 4","Scenario 5","Scenario 6"]) }),
  STABILITY_MS: 1000, SERIAL_BAUD_RATE: 115200,
  EVENTS: Object.freeze({ PREDICTION_ACCEPTED: "predictionaccepted" })
});
export const LABEL_COUNT = CONFIG.MODEL.LABELS.length;
