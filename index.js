const express = require('express')
const clienteRoutes= require('./routes/clientes')
const destinatarioRoutes= require('./routes/destinatarios') 
const pastelRoutes= require('./routes/pasteles')

const app=express()

app.use('/clientes', clienteRoutes)
app.use('/destinatarios', destinatarioRoutes)
app.use('/pasteles', pastelRoutes)

app.listen(3015, ()=>{
    console.log('servidor corriendo')
})