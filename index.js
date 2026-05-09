const express = require('express')

const app = express()
app.use(express.json())

const PORT = 3014

//definir las rutas
app.get('/', (req,res) =>{
    res.send('Hola mundo desde back')
})

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})