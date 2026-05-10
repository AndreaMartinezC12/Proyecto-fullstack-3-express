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

//DESTINATARIO
let destinatarios = [{id:1, nombre: 'Andrea', calle: 'Pino', numero: "2031", colonia: "Industrial"}]

app.get('/destinatarios', (req,res) =>res.json(destinatarios))

app.post('/destinatarios', (req,res) => {
    const {nombre, calle, numero, colonia} = req.body

    if(!nombre || nombre.trim()===''){
        return res.status(400).json({
            error:"El nombre es obligatorio"
        })
    }

    if(!calle || calle.trim()===''){
        return res.status(400).json({
            error:"La calle es obligatoria"
        })
    }

    if(!numero || numero.trim()===''){
        return res.status(400).json({
            error:"El numero es obligatorio"
        })
    }

    if(!colonia || colonia.trim()===''){
        return res.status(400).json({
            error:"La colonia es obligatoria"
        })
    }

    const nuevo = {
        id:destinatarios.length+1, 
        nombre,
        calle,
        numero,
        colonia
    }
    destinatarios.push(nuevo)
    res.status(201).json(nuevo)
})

app.delete('/destinatarios/:id', (req,res) => {
    const idDelete=parseInt(req.params.id)
    const index = destinatarios.findIndex(c=>c.id===idDelete)
    if(index===-1){
        return res.status(404).json({
            error:"Destinatario no encontrado",
            message:`No existe un destinatario con el id ${idDelete}`
        })
    }

    const destinatarioEliminated=destinatarios.splice(index,1)

    res.json({
        message:"Destinatario eliminado",
        destinatario:destinatarioEliminated[0]
    })
})

app.get('/destinatarios/:id', (req,res) =>{
    const id=parseInt(req.params.id)
    const destinatario = destinatarios.find(c=>c.id===id)

    if(!destinatario){
        return res.status(404).json({
            error:"Destinatario no encontrado"
        })
    }
    res.json(destinatario)

})

app.put('/destinatarios/:id', (req,res)=>{
    const id=parseInt(req.params.id)
    const index = destinatarios.findIndex(c=>c.id===id)

    if(index===-1){
        return res.status(404).json({
            error:"Destinatario no encontrado"
        })
    }

    destinatarios[index] = {...destinatarios[index], ...req.body}
    res.json({
        message:"Destinatario actualizado",
        destinatario: destinatarios[index]
    })
})

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})