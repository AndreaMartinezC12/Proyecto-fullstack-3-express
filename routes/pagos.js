const express = require('express')
const router = express.Router()


const{
    getPagos,
    getPagoById,
    createPago,
    updatePago,
    deletePago
} = require('../controllers/pagos')

router.get('/', getPagos)
router.get('/:id', getPagoById)
router.post('/', createPago)
router.put('/:id', updatePago)
router.delete('/:id', deletePago)

module.exports = router