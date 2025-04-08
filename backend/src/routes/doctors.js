import express from "express";
import doctorsController from "../controllers/doctorsController.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

router
  .route("/")
  .get(doctorsController.getdoctors)
  .post(doctorsController.createdoctors);

router
  .route("/:id")
  .put(doctorsController.updatedoctors)
  .delete(doctorsController.deletedoctors);

export default router;