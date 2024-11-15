import pkg from 'colors';
const { colors } = pkg;
import dotenv from 'dotenv';
import express from 'express';
import pruebaRouter from './routes/pruebaRoutes.js';
import authRouter from './routes/authRouter.js';
import connectDB from './config/db.js';

// Leer del .env
dotenv.config();
connectDB()

// Crear objeto aplicación de express
const app = express();

// Configurar app para que acepte bodies en JSON
app.use(express.json());

// Configurar puerto
const PORT = process.env.PORT || 3000;

// Definir la ruta base con la barra diagonal
app.use('/api/pruebas', pruebaRouter);

app.use('/api/auth', authRouter)

// Crear servidor express
app.listen(PORT, () => {
    console.log(`Servidor ejecutando en puerto: ${PORT}`.bgGreen.red.bold);
});
