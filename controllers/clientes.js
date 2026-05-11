const db=require('../config/db')

const getClientes=async(req,res)=>{
  try {
    const [rows]= await db.query('SELECT * FROM cliente')
    res.json(rows)
  } catch (error) {
    console.error('Error al obtener clientes', error)
    res.status(500).json({error:'Error al obtener clientes'})
  }
}

const getClienteById=async(req,res)=>{
  try {
    const id= parseInt(req.params.id)
    const [rows] = await db.query('SELECT * FROM cliente WHERE idCliente =?', [id])

    if(rows.length===0){
      return res.status(404).json({error: "Cliente no encontrado"})
    }
    res.json(rows[0])

  } catch (error) {
    console.error('Error al obtener cliente', error)
    res.status(500).json({error:'Error al obtener cliente'})
  }
}

const createCliente=async(req,res)=>{
  try {
    const {nombre, email, telefono} = req.body
    if(!nombre || nombre.trim()===''){
      return res.status(400).json({
        error:'El nombre es obligatorio'
      })
    }

    if(!email || email.trim()===''){
      return res.status(400).json({
        error:'El email es obligatorio'
      })
    }

    if(!telefono || telefono.trim()===''){
      return res.status(400).json({
        error:'El telefono es obligatorio'
      })
    }
    const[result]= await db.query('INSERT INTO cliente (nombre, email, telefono) VALUES (?, ?, ?)', [nombre, email, telefono])
    const [newCliente]= await db.query('SELECT * FROM cliente WHERE idCliente = ?', [result.insertId])

    res.status(201).json(newCliente[0])

  } catch (error) {
    console.error('Error al crear cliente', error)
    res.status(500).json({error:'Error al crear cliente'})
  }
}

const updateCliente = async(req,res)=>{
  try {
    const id= parseInt(req.params.id)
    const {nombre} = req.body
    if(!nombre||nombre.trim()===''){
      return res.status(400).json({
        error:'El nombre es obligatorio'
      })
    }
    
    const [existing]= await db.query('SELECT * FROM cliente WHERE idCliente = ?', [id])

    if(existing.length===0){
      return res.status(404).json({
        error:'Cliente no encontrado'
      })
    }

    await db.query('UPDATE cliente SET nombre = ? WHERE idCliente = ?', [nombre, id])
    const[updateCliente]=await db.query('SELECT * FROM cliente WHERE idCliente = ?', [id])

    res.json({
      message:'Usuario actualizado',
      cliente:updateCliente[0]
    })

  } catch (error) {
    console.error('Error al actualizar cliente', error)
    res.status(500).json({error:'Error al actualizar cliente'})
  }
}

const deleteCliente = async(req,res)=>{
  try {
    const id= parseInt(req.params.id)
    const [existing]= await db.query('SELECT * FROM cliente WHERE idCliente = ?', [id])

    if(existing.length===0){
      return res.status(404).json({
        error:'Cliente no encontrado'
      })
    }

    await db.query('DELETE FROM cliente WHERE idCliente = ?', [id])

    res.json({
      message:"Cliente eliminado",
      cliente:existing[0]
    })

  } catch (error) {
    console.error('Error al eliminar cliente', error)
    res.status(500).json({error:'Error al eliminar cliente'})
  }
}

module.exports={
  getClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente
}