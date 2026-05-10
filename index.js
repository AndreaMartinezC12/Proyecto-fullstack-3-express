const express = require('express')
const clienteRoutes= require('./routes/clientes')
const destinatarioRoutes= require('./routes/destinatarios') 

const app=express()

app.use('/clientes', clienteRoutes)
app.use('/destinatarios', destinatarioRoutes)

app.listen(3015, ()=>{
    console.log('servidor corriendo')
})