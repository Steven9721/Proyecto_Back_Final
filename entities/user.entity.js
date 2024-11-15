import mongoose from "mongoose";


// Define el esquema de usuario
const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Nombre requerido"]
    },
    lastName: {
        type: String,
        required: [true, "Apellido requerido"]
    },
    email: {
        type: String,
        required: [true, "Nombre de usuario requerido"],
        unique: [true, "Username no debe ser repetido"]
    },
    password: {
        type: String,
        required: [true, "Contraseña requerida"],
    },
    isAdmin: {
        type: Boolean,
        required: [true, "Rol requerido"],
        default: false
    }
}, {
    timestamps: true  // Habilita las marcas de tiempo
});




// Exporta el modelo
export default mongoose.model("User", UserSchema, "users");