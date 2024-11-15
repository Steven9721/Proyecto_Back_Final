import express from 'express'
const  pruebaRouter = express.Router()


//Primera ruta REST en express
pruebaRouter.get('/saludo', (solicitud, respuesta)=> {
    respuesta.send("Hola mundo 2902093")
})

//ruta de post
pruebaRouter.post("/registro", (req, response) => {
    console.log(req.body)
    response.status(200).json({
        mensaje: "Registro exitoso",
        datos: {
            "email": req.body.email,
            "password": req.body.password
            
        }
    })
})








export default pruebaRouter