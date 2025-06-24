// routes/alimentos.js

// Importamos Express y creamos un enrutador
const express = require('express');
const router = express.Router();

// Importamos el controlador que tiene la lógica para manejar alimentos
const alimentosController = require('../controllers/alimentosController');

// GET /api/alimentos
// Obtiene la lista de todos los alimentos
router.get('/', alimentosController.obtenerTodos);

// POST /api/alimentos
// Crea un nuevo alimento con los datos enviados desde el frontend
router.post('/', alimentosController.crear);

// PUT /api/alimentos/:id
// Actualiza un alimento existente usando el ID recibido como parámetro
router.put('/:id', alimentosController.actualizar);

// DELETE /api/alimentos/:id
// Elimina un alimento según su ID
router.delete('/:id', alimentosController.eliminar);

// Exportamos el enrutador para que pueda ser usado en `index.js`
module.exports = router;

