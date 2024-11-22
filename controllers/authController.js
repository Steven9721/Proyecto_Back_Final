import mongoose from "mongoose";
import User from "../entities/user.entity.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

     // Generar el token para el nuevo usuario
     const token = generarToken(newUser._id);

     // Responder con todos los detalles del nuevo usuario y el token
     res.status(201).json({
       id: newUser._id,
       firstName: newUser.firstName,
       lastName: newUser.lastName,
       email: newUser.email,
       isAdmin: newUser.isAdmin,
       createdAt: newUser.createdAt,  
       updatedAt: newUser.updatedAt,  
       __v: newUser.__v,             
       token: token,
     });
   } catch (error) {
     console.error(error);
     res.status(500).json({ message: "Error en el registro del usuario" });
   }
 };
 

export const userLogin = async (req, res) => {
  //Desestructurar el objeto request
  const {email, password} =req.body
  //Encontrar al usuario por email.
  const user=await User.findOne({email})
  if(user){
     //Si el usuario existe, comparar los hash
  if(await bcrypt.compare(password, user.password)){
    //res.send('Usuario autenticado')
    res.status(200).json({
      id: user._id,
      name: user.firstName,
      token: generarToken(user._id)
    })
  } else{
    res.status(404).json({
      "message": 'Credenciales invalidas'
    })
  }
  } else {
    res.status(404).json({
      "message": 'Credenciales invalidas'
    })
  }
 

};

//Crear funcion que retorne el token
const generarToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}