/*
Campos:
    date 
    time 
    reason 
    idDoctor 
    idPatient
*/

import { Schema, model } from "mongoose";

const appointmentSchema = new Schema(
  {
    date: {
        type: Date,
        require: true,
        min: 0,
    },
    time: {
      type: String,
      require: true,
    },
    reason: {
        type: String,
        require: true,
      },
    idDoctor: {
      type: Schema.Types.ObjectId,
      ref: "Doctors",
      require: true,
    },
    idPatient: {
        type: Schema.Types.ObjectId,
        ref: "Patients",
        require: true,
      },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("appointments", appointmentSchema);
