const patientsController = {};

import patientsModel from "../models/patient.js";

// SELECT
patientsController.getpatientss = async (req, res) => {
  const patients = await patientsModel.find();
  res.json(patients);
};

// INSERT
patientsController.createpatients = async (req, res) => {
  const { name, age, email, password, telephone, isVerified } = req.body;
  const newpatients = new patientsModel({ name, age, email, password, telephone, isVerified});
  await newpatients.save();
  res.json({ message: "patient save" });
};

// DELETE
patientsController.deletepatients = async (req, res) => {
const deletedpatients = await patientsModel.findByIdAndDelete(req.params.id);
  if (!deletedpatients) {
    return res.status(404).json({ message: "patient dont find" });
  }
  res.json({ message: "patients deleted" });
};

// UPDATE
patientsController.updatepatients = async (req, res) => {
  // Solicito todos los valores
  const { name, specialty, email, password  } = req.body;
  // Actualizo
  await patientsModel.findByIdAndUpdate(
    req.params.id,
    {
        name, 
        specialty, 
        email, 
        password
    },
    { new: true }
  );
  // muestro un mensaje que todo se actualizo
  res.json({ message: "patient update" });
};

export default patientsController;