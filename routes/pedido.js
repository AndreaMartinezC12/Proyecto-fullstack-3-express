const express = require('express')
const router = express.Router()


const{
    getPedidoById,
    createPedido,
    getPedidoByNombre,
    deletePedido
} = require('../controllers/pedidos')

router.get("/search", getPedidoByNombre)
router.get('/:id', getPedidoById)
router.post('/', createPedido)
router.delete("/:id", deletePedido)


module.exports = router