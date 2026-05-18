const express = require('express')
const router = express.Router()


const{
    getPedidoById,
    createPedido,
    getPedidoByNombre,
    deletePedido,
    editPedido
} = require('../controllers/pedidos')

router.get("/search", getPedidoByNombre)
router.get('/:id', getPedidoById)
router.post('/', createPedido)
router.delete("/:id", deletePedido)
router.patch("/:id", editPedido)


module.exports = router