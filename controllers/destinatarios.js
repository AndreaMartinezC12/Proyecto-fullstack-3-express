const db=require('../config/db')

const getDestinatarios=async(req,res)=>{
  try {
    const [rows]= await db.query('SELECT * FROM destinatario')
    res.json(rows)
  } catch (error) {
    console.error('Error al obtener destinatarios', error)
    res.status(500).json({error:'Error al obtener destinatarios'})
  }
}

const getDestinatarioById=async(req,res)=>{
  try {
    const id= parseInt(req.params.id)
    const [rows] = await db.query('SELECT * FROM destinatario WHERE idDestinatario =?', [id])

    if(rows.length===0){
      return res.status(404).json({error: "Destinatario no encontrado"})
    }
    res.json(rows[0])

  } catch (error) {
    console.error('Error al obtener destinatario', error)
    res.status(500).json({error:'Error al obtener destinatario'})
  }
}

const createDestinatario=async(req,res)=>{
  try {
    const {nombre, calle, numero, colonia, Cliente_idCliente} = req.body
    if(!nombre || nombre.trim()===''){
      return res.status(400).json({
        error:'El nombre es obligatorio'
      })
    }

    if(!calle || calle.trim()===''){
      return res.status(400).json({
        error:'La calle es obligatoria'
      })
    }

    if(!numero || numero.trim()===''){
      return res.status(400).json({
        error:'El numero es obligatorio'
      })
    }

    if(!colonia || colonia.trim()===''){
      return res.status(400).json({
        error:'La colonia es obligatoria'
      })
    }

    const[result]= await db.query('INSERT INTO destinatario (nombre, calle, numero, colonia, Cliente_idCliente) VALUES (?, ?, ?, ?, ?)', [nombre, calle, numero, colonia, Cliente_idCliente])
    const [newDestinatario]= await db.query('SELECT * FROM destinatario WHERE idDestinatario = ?', [result.insertId])

    res.status(201).json(newDestinatario[0])

  } catch (error) {
    console.error('Error al crear destinatario', error)
    res.status(500).json({error:'Error al crear destinatario'})
  }
}

const updateDestinatario = async(req,res)=>{
  try {
    const id= parseInt(req.params.id)
    const {nombre} = req.body
    if(!nombre||nombre.trim()===''){
      return res.status(400).json({
        error:'El nombre es obligatorio'
      })
    }
    
    const [existing]= await db.query('SELECT * FROM destinatario WHERE idDestinatario = ?', [id])

    if(existing.length===0){
      return res.status(404).json({
        error:'destinatario no encontrado'
      })
    }

    await db.query('UPDATE destinatario SET nombre = ? WHERE idDestinatario = ?', [nombre, id])
    const[updateDestinatario]=await db.query('SELECT * FROM destinatario WHERE idDestinatario = ?', [id])

    res.json({
      message:'Usuario actualizado',
      destinatario:updateDestinatario[0]
    })

  } catch (error) {
    console.error('Error al actualizar destinatario', error)
    res.status(500).json({error:'Error al actualizar destinatario'})
  }
}

const deleteDestinatario = async(req,res)=>{
  try {
    const id= parseInt(req.params.id)
    const [existing]= await db.query('SELECT * FROM destinatario WHERE idDestinatario = ?', [id])

    if(existing.length===0){
      return res.status(404).json({
        error:'Destinatario no encontrado'
      })
    }

    await db.query('DELETE FROM destinatario WHERE idDestinatario = ?', [id])

    res.json({
      message:"Destinatario eliminado",
      destinatario:existing[0]
    })

  } catch (error) {
    console.error('Error al eliminar destinatario', error)
    res.status(500).json({error:'Error al eliminar destinatario'})
  }
}

module.exports={
  getDestinatarios,
  getDestinatarioById,
  createDestinatario,
  updateDestinatario,
  deleteDestinatario
}