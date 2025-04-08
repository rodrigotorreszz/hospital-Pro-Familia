/*
    Campos:
      name
      age
      email
      password
      telephone 
      isVerified
*/

import { Schema, model } from "mongoose";

const patientsSchema = new Schema(
    {
      name: {
        type: String,
        require: true,
      },
  
      age: {
        type: Number,
        require: true
      },

      email: {
        type: String,
      },

      telephone: {
        type: Number,
        require: true,
      },
      
      isVerified: {
        type: Boolean,
      },
    },
    {
      timestamps: true,
      strict: false,
    }
  );
  

export default model("Patients", patientsSchema);