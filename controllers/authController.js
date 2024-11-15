import mongoose from "mongoose";
import User from "../entities/user.entity.js";
import bcrypt from "bcrypt";

export const userRegister = async (req, res) => {
  // Desestructurar el body
  const { firstName, lastName, email, password, isAdmin } = req.body;

  // Verificar si el usuario existe con el email
  const vUser = await User.findOne({ email });
  if (vUser) {
    return res.status(400).json({
      message: "El usuario ya existe",
    });
  }

  // Validar la contraseña
  if (!password || typeof password !== 'string' || password.length < 6) {
    return res.status(400).json({ message: "Contraseña inválida, debe ser un string y tener al menos 6 caracteres" });
  }

  try {
    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear el nuevo usuario
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword, // Guardar la contraseña encriptada
      isAdmin,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el registro del usuario" });
  }
};

export const userLogin = (req, res) => {
  res.send("Login de usuarios");
};
