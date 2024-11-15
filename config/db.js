import mongoose from "mongoose";
import colors from 'colors'

const connectDB =async () => {
    try{
        const conn = await mongoose.connect('mongodb://localhost:27017/db_final')
        console.log(`Conexion exitosa a mondongo: ${conn.connection.host}`.bgGreen)
    } catch(error) {
        console.log(`Error al conectar a mongo: ${error}`.bgRed)
        process.exit(1)
    }
}

export default connectDB