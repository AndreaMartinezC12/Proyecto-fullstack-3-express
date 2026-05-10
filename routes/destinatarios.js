const express = require('express')
const router = express.Router()


const{
    getDestinatarios,
    getDestinatarioById,
    createDestinatario,
    updateDestinatario,
    deleteDestinatario
} = require('../controllers/destinatarios')

router.get('/', getDestinatarios)
router.get('/:id', getDestinatarioById)
router.post('/', createDestinatario)
router.put('/:id', updateDestinatario)
router.delete('/:id', deleteDestinatario)

module.exports = router