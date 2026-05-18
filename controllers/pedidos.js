const db=require('../config/db')

const createPedido = async (req, res) => {

  let connection;

  try {
    const{
      cliente,
      destinatario,
      pastel,
      pago
    } = req.body
    
    connection = await db.getConnection()
    await connection.beginTransaction()

    console.log("TRANSACTION STARTED")

    const[clienteResult] = 
      await connection.query(
      `
      INSERT INTO cliente
      (
        Nombre,
        Email,
        Telefono
      )
      VALUES(?,?,?)
      `,
      [
        cliente.nombre,
        cliente.email,
        cliente.telefono
      ]
    )

    const clienteId = clienteResult.insertId

    console.log("CLIENTE LISTO")

    const [destinatarioResult] = 
      await connection.query(
      `
      INSERT INTO destinatario
      (
        Nombre,
        Calle,
        Numero,
        Colonia,
        FechaEntrega
      )
      VALUES(?, ?, ?, ?, ?)
      `,
      [
        destinatario.nombre,
        destinatario.calle,
        destinatario.numero,
        destinatario.colonia,
        destinatario.fechaEntrega
      ]
    )

    const destinatarioId = destinatarioResult.insertId

    console.log("DESTINATARIO LISTO")

    const [pastelResult] = 
      await connection.query(
      `
      INSERT INTO pastel
      (
        Tamano,
        Pan,
        Relleno,
        Extras,
        Betun,
        Decoracion
      )
      VALUES(?, ?, ?, ?, ?, ?)
      `,
      [
        pastel.tamano,
        pastel.pan,
        pastel.relleno,
        pastel.extras,
        pastel.betun,
        pastel.decoracion
      ]
    )
    
    const pastelId = pastelResult.insertId
    console.log("PASTEL LISTO")

    const [pagoResult] = 
      await connection.query(
      `
        INSERT INTO pago
        (
          Total,
          Metodo
        )
        VALUES(?, ?)
      `,
      [
        pago.total,
        pago.metodo
      ]
    )

    const pagoId = pagoResult.insertId
    console.log("PAGO LISTO")

    const [pedidoResult] = 
      await connection.query(
      `
      INSERT INTO pedido
      (
        Cliente_id,
        Destinatario_id,
        Pastel_id,
        Pago_id,
        Estado
      )
      VALUES(?,?,?,?,?)
      `,
      [
        clienteId,
        destinatarioId,
        pastelId,
        pagoId,
        "pendiente"
      ]
    )

    console.log("PEDIDO LISTO")

    await connection.commit()

    console.log("TRANSACTION COMMITTED")

    res.status(201).json({
      message: "Pedido creado correctamente",
      pedidoId: pedidoResult.insertId
    })

  } catch (error) {
    console.log("Error creando pedido")
    console.log(error)

    if (connection) {

      await connection.rollback()

      console.log("ROLLBACK EXECUTED")

    }

    res.status(500).json({
      error: "Error creando pedido"
    })
    
  }
finally {
    if (connection) {

      connection.release()

    }

  }

}

const getPedidoById = async (req, res) => {
  try {
    const pedidoId = req.params.id 
    const [rows] = await db.query(
      `
      SELECT
        pedido.id AS pedidoId,
        pedido.Estado,

        cliente.id AS clienteId,
        cliente.Nombre AS clienteNombre,
        cliente.email,
        cliente.telefono,

        destinatario.id AS destinatarioId,
        destinatario.Nombre AS destinatarioNombre,
        destinatario.calle,
        destinatario.numero,
        destinatario.colonia,
        destinatario.fechaEntrega,

        pastel.id AS pastelId,
        pastel.tamano,
        pastel.pan,
        pastel.relleno,
        pastel.extras,
        pastel.betun,
        pastel.decoracion,

        pago.id AS pagoId,
        pago.total,
        pago.metodo

      FROM pedido

      JOIN cliente
      ON pedido.cliente_id = cliente.id

      JOIN destinatario
      ON pedido.Destinatario_id = destinatario.id
      
      JOIN pastel
      ON pedido.Pastel_id = pastel.id

      JOIN pago
      ON pedido.Pago_id = pago.id

      WHERE pedido.id = ?
      `,
      [pedidoId]
    )

    if(rows.length === 0){
      return res.status(404).json({
        error: "Pedido no encontrado"
      })
    }

    const row = rows[0]

    const pedido ={
      pedidoId:
        row.pedidoId,
      
      estado:
        row.estado,

      cliente: {
        id: row.clienteId,
        nombre: row.clienteNombre,
        email: row.email,
        telefono:row.telefono
      },

      destinatario: {
        id: row.destinatarioId,
        nombre: row.destinatarioNombre,
        calle: row.calle,
        numero: row.numero,
        colonia: row.colonia,
        fechaEntrega: row.fechaEntrega?.toISOString().split("T")[0]
      },

      pastel: {
        id: row.pastelId,
        tamano: row.tamano,
        pan: row.pan,
        relleno: row.relleno,
        extras: row.extras,
        betun: row.betun,
        decoracion: row.decoracion
      },

      pago: {
        id: row.pagoId,
        total: row.total,
        metodo: row.metodo
      }
    }
    res.json(pedido)

  } catch (error) {
    console.log("Error al obtener pedido")
    console.log(error)
    
    res.status(500).json({
      error: "Error encontrando pedido",
      details: error.message
    })
  }
}

const getPedidoByCliente = async (req, res) => {
  try {
    valor = " "
    termino = " "

    if(req.query.nombre){
      valor = req.query.nombre
      termino = "nombre"
    }
    else if(req.query.telefono){
      valor=req.query.telefono
      termino = "telefono"
    }
    else if(req.query.email){
      valor=req.query.email
      termino = "email"
    }
    else if(!valor || valor ===''){
      return res.status(400).json({
        error: "Por favor ingresa un termino de busqueda"
      })
    }

    const [rows] = 
      await db.query(
        `
        SELECT
          pedido.id AS pedidoId,
          pedido.estado,

          cliente.id AS clienteId,
          cliente.nombre AS clienteNombre,
          cliente.email,
          cliente.telefono,

          destinatario.id AS destinatarioId,
          destinatario.nombre AS destinatarioNombre,
          destinatario.calle,
          destinatario.numero,
          destinatario.colonia,
          destinatario.fechaEntrega,

          pastel.id AS pastelId,
          pastel.tamano,
          pastel.pan,
          pastel.relleno,
          pastel.extras,
          pastel.betun,
          pastel.decoracion,

          pago.id AS pagoId,
          pago.total,
          pago.metodo

        FROM pedido

        JOIN cliente
        ON pedido.Cliente_id = cliente.id

        JOIN destinatario 
        ON pedido.Destinatario_id = destinatario.id

        JOIN pastel
        ON pedido.Pastel_id = pastel.id

        JOIN pago
        ON pedido.Pago_id = pago.id

        WHERE cliente.${termino} LIKE ?
        `,
        [`${valor}`]
      )
      if(rows.length === 0){
      return res.status(404).json({
        error: "Pedido no encontrado"
      })
    }

    const row = rows[0]

    const pedido ={
      pedidoId:
        row.pedidoId,
      
      estado:
        row.estado,

      cliente: {
        nombre: row.clienteNombre,
        email: row.email,
        telefono:row.telefono
      },

      destinatario: {
        nombre: row.destinatarioNombre,
        calle: row.calle,
        numero: row.numero,
        colonia: row.colonia,
        fechaEntrega: row.fechaEntrega
      },

      pastel: {
        tamano: row.tamano,
        pan: row.pan,
        relleno: row.relleno,
        extras: row.extras,
        betun: row.betun,
        decoracion: row.decoracion
      },

      pago: {
        total: row.total,
        metodo: row.metodo
      }
    }
    res.json(pedido)

  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: "Error buscando el pedido",
      details: error.message
    })
  }
}

const deletePedido = async (req, res) => {
  let connection

  try {
    const pedidoId = req.params.id
    connection = await db.getConnection()

    await connection.beginTransaction()

    const[pedidoRows] =
      await connection.query(
        `
        SELECT
          Cliente_id,
          Destinatario_id,
          Pastel_id,
          Pago_id
        FROM pedido

        WHERE id = ?
        `,

        [pedidoId]
      )

    if(pedidoRows.length === 0){
      return res.status(404).json({
        error: "Ese pedido no existe"
      })
    }

    const pedido = pedidoRows[0]

    await connection.query(
      `
      DELETE FROM pedido
      WHERE id = ?
      `,
      [pedidoId]
    )

    await connection.query(
      `
      DELETE FROM cliente
      WHERE id = ?
      `,
      [pedido.Cliente_id]
    )

    await connection.query(
      `
      DELETE FROM destinatario
      WHERE id = ?
      `,
      [pedido.Destinatario_id]
    )

    await connection.query(
      `
      DELETE FROM pastel
      WHERE id = ?
      `,
      [pedido.Pastel_id]
    )

    await connection.query(
      `
      DELETE FROM pago
      WHERE id = ?
      `,
      [pedido.Pago_id]
    )

    await connection.commit()

    res.json({
      message: "Pedido eliminado correctamente"
    })


  } catch (error) {
    console.log(error)
    if(connection){
      await connection.rollback()
    }

    res.status(500).json({
      error: "Error eliminando el pedido",
      details: error.message
    })
  }
  finally{
    if(connection){
      connection.release()
    }
  }
}

const editPedido = async (req, res) => {
  let connection
  try {
    const pedidoId = req.params.id
    const{
      cliente,
      destinatario,
      pastel,
      pago
    } = req.body

    connection = await db.getConnection()
    await connection.beginTransaction()

    const[pedidoRows] = 
      await connection.query(
        `
        SELECT
          Cliente_id,
          Destinatario_id,
          Pastel_id,
          Pago_id

        FROM pedido

        WHERE id = ?
        `,
        [pedidoId]
      )

    if(pedidoRows.length === 0){
      return res.status(404).json({
        error: "No existe ese pedido"
      })
    }

    const pedido = pedidoRows[0]

    if(cliente){
      const fields = []
      const values = []

      for(const key in cliente){
        fields.push(`${key} = ?`)
        values.push(cliente[key])
      }

      values.push(pedido.Cliente_id)

      await connection.query(
        `
        UPDATE cliente
        SET ${fields.join(", ")}
        WHERE id =?
        `,
        values
      )
    }

    if(destinatario){
      const fields = []
      const values = []

      for(const key in destinatario){
        fields.push(`${key} = ?`)
        values.push(destinatario[key])
      }

      values.push(pedido.Destinatario_id)

      await connection.query(
        `
        UPDATE destinatario
        SET ${fields.join(", ")}
        WHERE id =?
        `,
        values
      )
    }

    if(pastel){
      const fields = []
      const values = []

      for(const key in pastel){
        fields.push(`${key} = ?`)
        values.push(pastel[key])
      }

      values.push(pedido.Pastel_id)

      await connection.query(
        `
        UPDATE pastel
        SET ${fields.join(", ")}
        WHERE id =?
        `,
        values
      )
    }

    if(pago){
      const fields = []
      const values = []

      for(const key in pago){
        fields.push(`${key} = ?`)
        values.push(pago[key])
      }

      values.push(pedido.Pago_id)

      await connection.query(
        `
        UPDATE pago
        SET ${fields.join(", ")}
        WHERE id =?
        `,
        values
      )
    }

    await connection.commit()
    res.json({
      message: "Pedido actualizado correctamente"
    })

  } catch (error) {
    console.log(error)
    if(connection){
      await connection.rollback()
    }

    res.status(500).json({
      error:"Error al actualizar pedido. Vuelve a intentar.",
      details: error.message
    })
  }
  finally{
    if(connection){
      connection.release()
    }
  }
}

module.exports={
  createPedido,
  getPedidoById,
  getPedidoByCliente,
  deletePedido,
  editPedido
}