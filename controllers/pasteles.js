let pasteles = [
    {id:1, tamano: 'grande', pan: 'vainilla', relleno:'nutella', extras:'almendra', betun:'rosa', decoracion:'flores'},
    {id:2, tamano: 'chico', pan: 'chocolate', relleno:'nutella', extras:'chispas', betun:'azul', decoracion:'clasica'}
  ];
  
  const getPasteles = (req, res) => {
    res.json(pasteles);
  };
  
  const getPastelById = (req, res) => {
    const id = parseInt(req.params.id);
    const pastel = pasteles.find(p => p.id === id);
  
    if (!pastel) {
      return res.status(404).json({
        error: 'Pastel no encontrado',
        message: `No existe un pastel con el id ${id}`
      });
    }
  
    res.json(pastel);
  };
  
  const createPastel = (req, res) => {
    const {tamano, pan, relleno, extras, betun, decoracion} = req.body

    if(!tamano || tamano.trim()===''){
        return res.status(400).json({
            error:"El tamano es obligatorio"
        })
    }

    if (!pan || pan.trim() === '') {
        return res.status(400).json({
            error: "El pan es obligatorio"
        })
    }

    if (!relleno || relleno.trim() === '') {
        return res.status(400).json({
            error: "El relleno es obligatorio"
        })
    }

    if (!extras || extras.trim() === '') {
        return res.status(400).json({
            error: "Los extras son obligatorios"
        })
    }

    if (!betun || betun.trim() === '') {
        return res.status(400).json({
            error: "El betun es obligatorio"
        })
    }

    if (!decoracion || decoracion.trim() === '') {
        return res.status(400).json({
            error: "La decoracion es obligatoria"
        })
    }

    const nuevo = {
        id:pasteles.length > 0 ? pasteles[pasteles.length - 1].id + 1 : 1, 
        tamano,
        pan,
        relleno,
        extras,
        betun,
        decoracion
    }

    pasteles.push(nuevo);
  
    res.status(201).json(nuevo);
  };
  
  const updatePastel = (req, res) => {
    const id = parseInt(req.params.id);
    const index = pasteles.findIndex(p => p.id === id);
  
    if (index === -1) {
      return res.status(404).json({
        error: 'Pastel no encontrado',
        message: `No existe un pastel con el id ${id}`
      });
    }
  
    const {tamano, pan, relleno, extras, betun, decoracion} = req.body

    if(!tamano || tamano.trim()===''){
        return res.status(400).json({
            error:"El tamano es obligatorio"
        })
    }

    if (!pan || pan.trim() === '') {
        return res.status(400).json({
            error: "El pan es obligatorio"
        })
    }

    if (!relleno || relleno.trim() === '') {
        return res.status(400).json({
            error: "El relleno es obligatorio"
        })
    }

    if (!extras || extras.trim() === '') {
        return res.status(400).json({
            error: "Los extras son obligatorios"
        })
    }

    if (!betun || betun.trim() === '') {
        return res.status(400).json({
            error: "El betun es obligatorio"
        })
    }

    if (!decoracion || decoracion.trim() === '') {
        return res.status(400).json({
            error: "La decoracion es obligatoria"
        })
    }
  
    pasteles[index] = {
      ...pasteles[index],
      tamano,
      pan,
      relleno,
      extras,
      betun,
      decoracion
    };
  
    res.json({
      message: 'Pastel actualizado',
      pastel: pasteles[index]
    });
  };
  
  const deletePastel = (req, res) => {
    const id = parseInt(req.params.id);
    const index = pasteles.findIndex(p => c=p.id === id);
  
    if (index === -1) {
      return res.status(404).json({
        error: 'Pastel no encontrado',
        message: `No existe un pastel con el id ${id}`
      });
    }
  
    const pastelEliminado = pasteles.splice(index, 1);
  
    res.json({
      message: 'Pastel eliminado',
      pastel: pastelEliminado[0]
    });
  };
  
  module.exports = {
    getPasteles,
    getPastelById,
    createPastel,
    updatePastel,
    deletePastel
  };