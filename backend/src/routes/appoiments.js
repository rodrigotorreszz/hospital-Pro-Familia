import express from "express";

const router = express.Router();

import appointmentsController from "../controllers/appointmentsController.js";

router
  .route("/")
  .get(appointmentsController.getappointments)
  .post(appointmentsController.insertappointments);

router
  .route("/:id")
  .put(appointmentsController.deleteappointments)
  .delete(appointmentsController.updateappointments);

export default router;