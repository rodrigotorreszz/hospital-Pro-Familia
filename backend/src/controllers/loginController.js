import doctorsModel from "../models/doctors.js";
import PatientssModel from "../models/patient.js";
import bcryptjs from "bcryptjs"; // encriptar
import jsonwebtoken from "jsonwebtoken"; //Token
import { config } from "../config.js";

const loginController = {};

loginController.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let userFound; //Para guardar el usuario encontrado
    let userType; //Para guardar el tipo usuario encontrado

    // 1. ADMIN
    if (
      email === config.emailAdmin.email &&
      password === config.emailAdmin.password
    ) {
      (userType = "admin"), (userFound = { _id: "admin" });
    } else {
      //2-EMPLEADO
      userFound = await doctorsModel.findOne({ email });
      userType = "Doctor";

      if (!userFound) {
        userFound = await PatientssModel.findOne({ email });
        userType = "Patients";
      }
    }

    //Usuario no encontrado
    if (!userFound) {
      console.log("A pesar de buscar en todos lados, no existe");
      return res.json({ message: "User not found" });
    }

    // Validar la contraseña
    // Solo si no es Admin
    if (userType !== "admin") {
      //veamos si la contraseña que están escribiendo
      // en el login
      // Es la misma, que la que está en la BD (encriptada)
      const isMatch = await bcryptjs.compare(password, userFound.password);
      if (!isMatch) {
        console.log("no matchea");
        return res.json({ message: "Contraseña incorrecta" });
      }
    }

    // --> TOKEN <--
    jsonwebtoken.sign(
      //1-Que voy a guardar
      { id: userFound._id, userType },
      //2-Secreto
      config.JWT.secret,
      //3- cuando expira
      { expiresIn: config.JWT.expiresIn },
      //4-funcion flecha
      (error, token) => {
        if (error) console.log(error);

        res.cookie("authToken", token);
        res.json({ message: "login successful" });
      }
    );
  } catch (error) {
    res.json({ message: "error" });
  }
};

export default loginController;