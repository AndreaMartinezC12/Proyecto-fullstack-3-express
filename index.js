const express = require('express')
const clienteRoutes= require('./routes/clientes')
const destinatarioRoutes= require('./routes/destinatarios') 
const pastelRoutes= require('./routes/pasteles')
const pagoRoutes= require('./routes/pagos')

const app=express()

app.use('/clientes', clienteRoutes)
app.use('/destinatarios', destinatarioRoutes)
app.use('/pasteles', pastelRoutes)
app.use('/pagos', pagoRoutes)

app.listen(3015, ()=>{
    console.log('servidor corriendo')
})