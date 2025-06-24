const express = require('express');
const router = express.Router();
const donacionesController = require('../controllers/donacionesController');

router.post('/', donacionesController.crear);
router.get('/', donacionesController.obtenerTodas);
router.get('/', donacionesController.obtenerTodas); // opcional
router.put('/:id/estado', donacionesController.actualizarEstado); // ✅

module.exports = router;




