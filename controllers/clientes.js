let clientes = [
    { id: 1, nombre: 'Cris', email:'cris12@gmail.com', telefono:'6145637829' },
    { id: 2, nombre: 'Juan', email:'juanillo@gmail.com', telefono: '6146379287'}
  ];
  
  const getClientes = (req, res) => {
    res.json(clientes);
  };
  
  const getClienteById = (req, res) => {
    const id = parseInt(req.params.id);
    const cliente = clientes.find(c => c.id === id);
  
    if (!cliente) {
      return res.status(404).json({
        error: 'Cliente no encontrado',
        message: `No existe un cliente con el id ${id}`
      });
    }
  
    res.json(cliente);
  };
  
  const createCliente = (req, res) => {
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
        id:clientes.length > 0 ? clientes[clientes.length - 1].id + 1 : 1, 
        nombre,
        email,
        telefono
    }

    clientes.push(nuevo);
  
    res.status(201).json(nuevo);
  };
  
  const updateCliente = (req, res) => {
    const id = parseInt(req.params.id);
    const index = clientes.findIndex(c => c.id === id);
  
    if (index === -1) {
      return res.status(404).json({
        error: 'Cliente no encontrado',
        message: `No existe un cliente con el id ${id}`
      });
    }
  
    const {nombre, email, telefono} = req.body
  
    if (!nombre || nombre.trim() === '') {
      return res.status(400).json({
        error: 'El nombre es obligatorio'
      });
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
  
    clientes[index] = {
      ...clientes[index],
      nombre: nombre.trim(),
      email,
      telefono
    };
  
    res.json({
      message: 'Cliente actualizado',
      cliente: clientes[index]
    });
  };
  
  const deleteCliente = (req, res) => {
    const id = parseInt(req.params.id);
    const index = clientes.findIndex(c => c.id === id);
  
    if (index === -1) {
      return res.status(404).json({
        error: 'Cliente no encontrado',
        message: `No existe un cliente con el id ${id}`
      });
    }
  
    const clienteEliminado = clientes.splice(index, 1);
  
    res.json({
      message: 'Cliente eliminado',
      cliente: clienteEliminado[0]
    });
  };
  
  module.exports = {
    getClientes,
    getClienteById,
    createCliente,
    updateCliente,
    deleteCliente
  };