const db=require('../config/db')

const createPedido = async (req, res) => {
  try {
    const{
      cliente,
      destinatario,
      pastel,
      pago
    } = req.body

    const[clienteResult] = await db.query(
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

    const [destinatarioResult] = await db.query(
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

    const [pastelResult] = await db.query(
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

    const [pagoResult] = await db.query(
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

    const [pedidoResult] = await db.query(
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

    res.status(201).json({
      message: "Pedido creado correctamente",
      pedidoId: pedidoResult.insertId
    })

  } catch (error) {
    console.log("Error creando pedido")
    console.log(error)
    res.status(500).json({
      error: "Error creando pedido"
    })
    
  }
}

 
module.exports={
  createPedido
}