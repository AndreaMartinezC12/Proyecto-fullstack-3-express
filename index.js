const express = require('express')
const clienteRoutes= require('./routes/clientes')
const destinatarioRoutes= require('./routes/destinatarios') 
const pastelRoutes= require('./routes/pasteles')
const pagoRoutes= require('./routes/pagos')
const pedidoRoutes = require('./routes/pedido')

const db=require('./config/db')

const app=express()
app.use(express.json())

app.use('/cliente', clienteRoutes)
app.use('/destinatario', destinatarioRoutes)
app.use('/pastel', pastelRoutes)
app.use('/pago', pagoRoutes)
app.use('/pedido', pedidoRoutes)

const testDBConnectionAndStart = async() =>{
    try {
        await db.query('SELECT 1')
        console.log('Ta funcionando')
        app.listen(3015, ()=>{
            console.log('servidor corriendo')
        })
    } catch (error) {
        console.error('Tas mal con la db', error.message)
        process.exit(1)
    }
}

testDBConnectionAndStart()