const express = require('express')

const app = express()
app.use(express.json())

const PORT = 3014

//definir las rutas
app.get('/', (req,res) =>{
    res.send('Hola mundo desde back')
})

//CLIENTE
let clientes = [{id:1, nombre: 'Andrea', email: 'hola@gmail.com', telefono:'614938475'}]

app.get('/clientes', (req,res) =>res.json(clientes))

app.post('/clientes', (req,res) => {
    const {nombre, email, telefono} = req.body

    if(!nombre || nombre.trim()===''){
        return res.status(400).json({
            error:"El nombre es obligatorio"
        })
    }

    if (!email || email.trim() === '') {
        return res.status(400).json({
            error: "El email es obligatorio"
        })
    }

    if (!telefono || telefono.trim() === '') {
        return res.status(400).json({
            error: "El telefono es obligatorio"
        })
    }

    const nuevo = {
        id:clientes.length+1, 
        nombre,
        email,
        telefono
    }
    clientes.push(nuevo)
    res.status(201).json(nuevo)
})

app.delete('/clientes/:id', (req,res) => {
    const idDelete=parseInt(req.params.id)
    const index = clientes.findIndex(c=>c.id===idDelete)
    if(index===-1){
        return res.status(404).json({
            error:"Cliente no encontrado",
            message:`No existe un cliente con el id ${idDelete}`
        })
    }

    const clienteEliminated=clientes.splice(index,1)

    res.json({
        message:"Cliente eliminado",
        cliente:clienteEliminated[0]
    })
})

app.get('/clientes/:id', (req,res) =>{
    const id=parseInt(req.params.id)
    const cliente = clientes.find(c=>c.id===id)

    if(!cliente){
        return res.status(404).json({
            error:"Cliente no encontrado"
        })
    }
    res.json(cliente)

})

app.put('/clientes/:id', (req,res)=>{
    const id=parseInt(req.params.id)
    const index = clientes.findIndex(c=>c.id===id)

    if(index===-1){
        return res.status(404).json({
            error:"Cliente no encontrado"
        })
    }

    clientes[index] = {...clientes[index], ...req.body}
    res.json({
        message:"Cliente actualizado",
        cliente: clientes[index]
    })
})

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})