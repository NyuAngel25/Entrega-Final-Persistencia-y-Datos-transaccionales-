const express = require('express');
const router = express.Router();
const puntosController = require('../controllers/puntosController');

router.get('/', puntosController.obtenerTodos);
router.post('/', puntosController.crear);
router.put('/:id', puntosController.actualizar);
router.delete('/:id', puntosController.eliminar);

module.exports = router;
