import mongoose from "mongoose";
import { CollectionNames, LogSeverityLevel } from "../mongo-contans";

const logSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: Object.values(LogSeverityLevel),
    default: LogSeverityLevel.Low,
  },
  origin: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

export const LogModel = mongoose.model(CollectionNames.Log, logSchema);
