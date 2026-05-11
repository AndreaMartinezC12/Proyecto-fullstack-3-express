const db=require('../config/db')

const getPasteles=async(req,res)=>{
  try {
    const [rows]= await db.query('SELECT * FROM pastel')
    res.json(rows)
  } catch (error) {
    console.error('Error al obtener Pasteles', error)
    res.status(500).json({error:'Error al obtener pasteles'})
  }
}

const getPastelById=async(req,res)=>{
  try {
    const id= parseInt(req.params.id)
    const [rows] = await db.query('SELECT * FROM pastel WHERE idPastel =?', [id])

    if(rows.length===0){
      return res.status(404).json({error: "Pastel no encontrado"})
    }
    res.json(rows[0])

  } catch (error) {
    console.error('Error al obtener pastel', error)
    res.status(500).json({error:'Error al obtener pastel'})
  }
}

const createPastel=async(req,res)=>{
  try {
    const {tamano, pan, relleno, extras, betun, decoracion, Cliente_idCliente} = req.body
    if(!tamano || tamano.trim()===''){
      return res.status(400).json({
        error:'El tamano es obligatorio'
      })
    }

    if(!pan || pan.trim()===''){
      return res.status(400).json({
        error:'El pan es obligatorio'
      })
    }

    if(!relleno || relleno.trim()===''){
      return res.status(400).json({
        error:'El relleno es obligatorio'
      })
    }

    if(!extras || extras.trim()===''){
      return res.status(400).json({
        error:'Los extras son obligatorios'
      })
    }

    if(!betun || betun.trim()===''){
      return res.status(400).json({
        error:'El betun es obligatorio'
      })
    }

    if(!decoracion || decoracion.trim()===''){
      return res.status(400).json({
        error:'La decoracion es obligatoria'
      })
    }

    const[result]= await db.query('INSERT INTO pastel (tamano, pan, relleno, extras, betun, decoracion, Cliente_idCliente) VALUES (?, ?, ?, ?, ? ,?, ?)', [tamano, pan, relleno, extras, betun, decoracion, Cliente_idCliente])
    const [newPastel]= await db.query('SELECT * FROM pastel WHERE idPastel = ?', [result.insertId])

    res.status(201).json(newPastel[0])

  } catch (error) {
    console.error('Error al crear pastel', error)
    res.status(500).json({error:'Error al crear pastel'})
  }
}

const updatePastel = async(req,res)=>{
  try {
    const id= parseInt(req.params.id)
    const {nombre} = req.body
    if(!nombre||nombre.trim()===''){
      return res.status(400).json({
        error:'El nombre es obligatorio'
      })
    }
    
    const [existing]= await db.query('SELECT * FROM pastel WHERE idPastel = ?', [id])

    if(existing.length===0){
      return res.status(404).json({
        error:'Pastel no encontrado'
      })
    }

    await db.query('UPDATE pastel SET nombre = ? WHERE idPastel = ?', [nombre, id])
    const[updatePastel]=await db.query('SELECT * FROM pastel WHERE idPastel = ?', [id])

    res.json({
      message:'Usuario actualizado',
      pastel:updatePastel[0]
    })

  } catch (error) {
    console.error('Error al actualizar pastel', error)
    res.status(500).json({error:'Error al actualizar pastel'})
  }
}

const deletePastel = async(req,res)=>{
  try {
    const id= parseInt(req.params.id)
    const [existing]= await db.query('SELECT * FROM pastel WHERE idPastel = ?', [id])

    if(existing.length===0){
      return res.status(404).json({
        error:'Pastel no encontrado'
      })
    }

    await db.query('DELETE FROM pastel WHERE idPastel = ?', [id])

    res.json({
      message:"Pastel eliminado",
      pastel:existing[0]
    })

  } catch (error) {
    console.error('Error al eliminar pastel', error)
    res.status(500).json({error:'Error al eliminar pastel'})
  }
}

module.exports={
  getPasteles,
  getPastelById,
  createPastel,
  updatePastel,
  deletePastel
}