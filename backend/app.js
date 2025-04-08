import express from "express";
import cookieParser from "cookie-parser";
import doctorsRoutes from "./src/routes/doctors.js";
import patientsRoutes from "./src/routes/patients.js";
import appointmentsRoutes from "./src/routes/appoiments.js";


const app = express();

app.use(express.json());

app.use(cookieParser());

app.use("/api/doctors", doctorsRoutes);
app.use("/api/patients", patientsRoutes);
app.use("/api/appointments", appointmentsRoutes);


export default app;