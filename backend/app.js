import express from "express";
import cookieParser from "cookie-parser";
import doctorsRoutes from "./src/routes/doctors.js";
import patientsRoutes from "./src/routes/patients.js";
import appointmentsRoutes from "./src/routes/appoiments.js";
import loginRoute from "./src/routes/login.js";
import registerDoctors from "./src/routes/register.js"
import registerPatients from "./src/routes/registerPatients.js"
import logoutRoute from "./src/routes/logout.js";


const app = express();

app.use(express.json());

app.use(cookieParser());

app.use("/api/doctors", doctorsRoutes);
app.use("/api/patients", patientsRoutes);
app.use("/api/appointments", appointmentsRoutes);
app.use("/api/login", loginRoute);
app.use("/api/registerDoctors", registerDoctors);
app.use("/api/registerPatients", registerPatients);
app.use("/api/logout", logoutRoute);


export default app;