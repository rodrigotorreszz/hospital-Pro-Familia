const doctorsController = {};

import doctorsModel from "../models/doctors.js";

// SELECT
doctorsController.getdoctors = async (req, res) => {
  const doctors = await doctorsModel.find();
  res.json(doctors);
};

// INSERT
doctorsController.createdoctors = async (req, res) => {
  const { name, specialty, email, password } = req.body;
  const newdoctors = new doctorsModel({ name, specialty, email, password});
  await newdoctors.save();
  res.json({ message: "doctor save" });
};

// DELETE
doctorsController.deletedoctors = async (req, res) => {
const deleteddoctors = await doctorsModel.findByIdAndDelete(req.params.id);
  if (!deleteddoctors) {
    return res.status(404).json({ message: "doctor dont find" });
  }
  res.json({ message: "doctors deleted" });
};

// UPDATE
doctorsController.updatedoctors = async (req, res) => {
  // Solicito todos los valores
  const { name, specialty, email, password  } = req.body;
  // Actualizo
  await doctorsModel.findByIdAndUpdate(
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
  res.json({ message: "doctor update" });
};

export default doctorsController;
