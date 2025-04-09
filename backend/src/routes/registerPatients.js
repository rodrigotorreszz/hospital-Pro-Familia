import express from "express";
import registerPatientsController from "../controllers/registerPatientsController.js";
const router = express.Router();

router.route("/").post(registerPatientsController.register);
router
  .route("/verifyCodeEmail")
  .post(registerPatientsController.verifyCodeEmail);

export default router;