const db=require('../config/db')

const getPagos=async(req,res)=>{
  try {
    const [rows]= await db.query('SELECT * FROM pago')
    res.json(rows)
  } catch (error) {
    console.error('Error al obtener pagos', error)
    res.status(500).json({error:'Error al obtener pagos'})
  }
}

const getPagoById=async(req,res)=>{
  try {
    const id= parseInt(req.params.id)
    const [rows] = await db.query('SELECT * FROM pago WHERE idPago =?', [id])

    if(rows.length===0){
      return res.status(404).json({error: "Pago no encontrado"})
    }
    res.json(rows[0])

  } catch (error) {
    console.error('Error al obtener pago', error)
    res.status(500).json({error:'Error al obtener pago'})
  }
}

const createPago=async(req,res)=>{
  try {
    const {total, metodo, Cliente_idCliente} = req.body
    if(!total || total.trim()===''){
      return res.status(400).json({
        error:'El total es obligatorio'
      })
    }

    if(!metodo || metodo.trim()===''){
      return res.status(400).json({
        error:'El metodo es obligatorio'
      })
    }

    const[result]= await db.query('INSERT INTO pago (total, metodo, Cliente_idCliente) VALUES (?, ?, ?)', [total, metodo, Cliente_idCliente])
    const [newPago]= await db.query('SELECT * FROM pago WHERE idPago = ?', [result.insertId])

    res.status(201).json(newPago[0])

  } catch (error) {
    console.error('Error al crear pago', error)
    res.status(500).json({error:'Error al crear pago'})
  }
}

const updatePago = async(req,res)=>{
  try {
    const id= parseInt(req.params.id)
    const {nombre} = req.body
    if(!nombre||nombre.trim()===''){
      return res.status(400).json({
        error:'El nombre es obligatorio'
      })
    }
    
    const [existing]= await db.query('SELECT * FROM pago WHERE idPago = ?', [id])

    if(existing.length===0){
      return res.status(404).json({
        error:'Pago no encontrado'
      })
    }

    await db.query('UPDATE pago SET nombre = ? WHERE idPago = ?', [nombre, id])
    const[updatePago]=await db.query('SELECT * FROM pago WHERE idPago = ?', [id])

    res.json({
      message:'Usuario actualizado',
      pago:updatePago[0]
    })

  } catch (error) {
    console.error('Error al actualizar pago', error)
    res.status(500).json({error:'Error al actualizar pago'})
  }
}

const deletePago = async(req,res)=>{
  try {
    const id= parseInt(req.params.id)
    const [existing]= await db.query('SELECT * FROM pago WHERE idPago = ?', [id])

    if(existing.length===0){
      return res.status(404).json({
        error:'Pago no encontrado'
      })
    }

    await db.query('DELETE FROM pago WHERE idPago = ?', [id])

    res.json({
      message:"Pago eliminado",
      pago:existing[0]
    })

  } catch (error) {
    console.error('Error al eliminar pago', error)
    res.status(500).json({error:'Error al eliminar pago'})
  }
}

module.exports={
  getPagos,
  getPagoById,
  createPago,
  updatePago,
  deletePago
}