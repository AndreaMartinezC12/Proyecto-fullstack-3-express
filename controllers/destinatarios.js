let destinatarios = [
    { id: 1, nombre: 'Cris', calle:'Montana', numero:"230", colonia:"Industrias"},
    { id: 2, nombre: 'Juan', calle:'Juarez', numero:"5812", colonia:"Granjas"}
  ];
  
  const getDestinatarios = (req, res) => {
    res.json(destinatarios);
  };
  
  const getDestinatarioById = (req, res) => {
    const id = parseInt(req.params.id);
    const destinatario = destinatarios.find(d => d.id === id);
  
    if (!destinatario) {
      return res.status(404).json({
        error: 'Destinatario no encontrado',
        message: `No existe un destinatario con el id ${id}`
      });
    }
  
    res.json(destinatario);
  };
  
  const createDestinatario = (req, res) => {
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
        id:destinatarios.length > 0 ? destinatarios[destinatarios.length - 1].id + 1 : 1, 
        nombre,
        calle,
        numero,
        colonia
    }

    destinatarios.push(nuevo);
  
    res.status(201).json(nuevo);
  };
  
  const updateDestinatario = (req, res) => {
    const id = parseInt(req.params.id);
    const index = destinatarios.findIndex(d => d.id === id);
  
    if (index === -1) {
      return res.status(404).json({
        error: 'Destinatario no encontrado',
        message: `No existe un destinatario con el id ${id}`
      });
    }
  
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
  
    destinatarios[index] = {
      ...destinatarios[index],
      nombre: nombre.trim(),
      calle,
      numero,
      colonia
    };
  
    res.json({
      message: 'Destinatario actualizado',
      destinatario: destinatarios[index]
    });
  };
  
  const deleteDestinatario = (req, res) => {
    const id = parseInt(req.params.id);
    const index = destinatarios.findIndex(d => d.id === id);
  
    if (index === -1) {
      return res.status(404).json({
        error: 'Destinatario no encontrado',
        message: `No existe un destinatario con el id ${id}`
      });
    }
  
    const destinatarioEliminado = destinatarios.splice(index, 1);
  
    res.json({
      message: 'Destinatario eliminado',
      destinatario: destinatarioEliminado[0]
    });
  };
  
  module.exports = {
    getDestinatarios,
    getDestinatarioById,
    createDestinatario,
    updateDestinatario,
    deleteDestinatario
  };