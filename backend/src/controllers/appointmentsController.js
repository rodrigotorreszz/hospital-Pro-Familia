const appointmentsController = {};
import appointmentModel from "../models/appointments.js";

// SELECT
appointmentsController.getappointments = async (req, res) => {
  const reviews = await appointmentModel.find().populate("idDoctor").populate("idPatient");
  res.json(reviews);
};

// INSERT
appointmentsController.insertappointments = async (req, res) => {
  const { date, time, reason, idDoctor, idPatient } = req.body;
  const newappointment = new appointmentModel({ date, time, reason, idDoctor, idPatient });
  await newappointment.save();
  res.json({ message: "appointment saved" });
};

// DELETE
appointmentsController.deleteappointments = async (req, res) => {
  await appointmentModel.findByIdAndDelete(req.params.id);
  res.json({ message: "appointment deleted" });
};

// UPDATE
appointmentsController.updateappointments = async (req, res) => {
  const { date, time, reason, idDoctor, idPatient } = req.body;
  await appointmentModel.findByIdAndUpdate(
    req.params.id,
    { date, time, reason, idDoctor, idPatient },
    { new: true }
  );
  res.json({ message: "appointment updated" });
};

export default appointmentsController;