let pagos = [
    {id:1, total: 500 , metodo: 'tarjeta'},
    {id:2, total: 1500 , metodo: 'transferencia'}
  ];
  
  const getPagos = (req, res) => {
    res.json(pagos);
  };
  
  const getPagoById = (req, res) => {
    const id = parseInt(req.params.id);
    const pago = pagos.find(p => p.id === id);
  
    if (!pago) {
      return res.status(404).json({
        error: 'Paso no encontrado',
        message: `No existe un pago con el id ${id}`
      });
    }
  
    res.json(pago);
  };
  
  const createPago = (req, res) => {
    const {total, metodo} = req.body

    if(!total || total.trim()===''){
        return res.status(400).json({
            error:"El total del pedido es obligatorio"
        })
    }

    if (!metodo || metodo.trim() === '') {
        return res.status(400).json({
            error: "El metodo de pago es obligatorio"
        })
    }

    const nuevo = {
        id:pagos.length > 0 ? pagos[pagos.length - 1].id + 1 : 1, 
        total,
        metodo
    }

    pagos.push(nuevo);
  
    res.status(201).json(nuevo);
  };
  
  const updatePago = (req, res) => {
    const id = parseInt(req.params.id);
    const index = pagos.findIndex(p => p.id === id);
  
    if (index === -1) {
      return res.status(404).json({
        error: 'Pago no encontrado',
        message: `No existe un pago con el id ${id}`
      });
    }
  
    const {total, metodo} = req.body

    if(!total || total.trim()===''){
        return res.status(400).json({
            error:"El total del pedido es obligatorio"
        })
    }

    if (!metodo || metodo.trim() === '') {
        return res.status(400).json({
            error: "El metodo de pago es obligatorio"
        })
    }
  
    pagos[index] = {
      ...pagos[index],
      total,
      metodo
    };
  
    res.json({
      message: 'Pago actualizado',
      pago: pagos[index]
    });
  };
  
  const deletePago = (req, res) => {
    const id = parseInt(req.params.id);
    const index = pagos.findIndex(p => p.id === id);
  
    if (index === -1) {
      return res.status(404).json({
        error: 'Pago no encontrado',
        message: `No existe un pago con el id ${id}`
      });
    }
  
    const pagoEliminado = pagos.splice(index, 1);
  
    res.json({
      message: 'Pago eliminado',
      pago: pagoEliminado[0]
    });
  };
  
  module.exports = {
    getPagos,
    getPagoById,
    createPago,
    updatePago,
    deletePago
  };