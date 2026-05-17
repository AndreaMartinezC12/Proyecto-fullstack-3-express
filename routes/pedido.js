const express = require('express')
const router = express.Router()


const{
    // getPedidoById,
    createPedido
} = require('../controllers/pedidos')

// router.get('/:id', getPedidoById)
router.post('/', createPedido)

module.exports = router