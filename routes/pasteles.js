const express = require('express')
const router = express.Router()


const{
    getPasteles,
    getPastelById,
    createPastel,
    updatePastel,
    deletePastel
} = require('../controllers/pasteles')

router.get('/', getPasteles)
router.get('/:id', getPastelById)
router.post('/', createPastel)
router.put('/:id', updatePastel)
router.delete('/:id', deletePastel)

module.exports = router