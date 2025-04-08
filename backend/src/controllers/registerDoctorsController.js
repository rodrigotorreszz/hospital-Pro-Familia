import doctorsModel from "../models/doctors.js";
import bcryptjs from "bcryptjs"; //para encriptar
import jsonwebtoken from "jsonwebtoken"; //para generar token
import { config } from "../config.js";

const registerDoctorsController = {};

registerDoctorsController.register = async (req, res) => {
  const {
    name,
    specialty,
    email,
    password
  } = req.body;

  try {
    //Verificamos si el empleado ya existe
    const existDoctor = await doctorsModel.findOne({ email });
    if (existDoctor) {
      return res.json({ message: "Doctor ya existe" });
    }

    // Encriptar la contraseña
    const passwordHash = await bcryptjs.hash(password, 10);

    // Guardemos el empleado nuevo
    const newDoctor = new doctorsModel({
        name,
        specialty,
        email,
        password: passwordHash
    });

    await newDoctor.save();

    // --> TOKEN <--
    jsonwebtoken.sign(
      //1-Que voy a guardar
      { id: newDoctor._id },
      //2-secreto
      config.JWT.secret,
      //3- cuando expira
      { expiresIn: config.JWT.expiresIn },
      //4- funcion flecha
      (error, token) => {
        if (error) console.log(error);
        res.cookie("authToken", token);
        res.json({message: "Doctor registrado"})
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export default registerDoctorsController;