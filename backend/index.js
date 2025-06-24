// backend/index.js

// Importamos los módulos necesarios
const express = require('express'); // Framework para construir el servidor web
const cors = require('cors');       // Middleware para permitir peticiones desde otro origen (como React)

const app = express(); // Creamos una instancia de Express (nuestro servidor)

// Importamos las rutas definidas en cada archivo de entidad
const usuariosRoutes = require('./routes/usuarios');
const alimentosRoutes = require('./routes/alimentos');
const puntosRoutes = require('./routes/puntos');
const donacionesRoutes = require('./routes/donaciones');

// Habilitamos CORS para que el frontend (React) pueda conectarse al backend
app.use(cors());

// Middleware para permitir recibir y procesar datos en formato JSON en las peticiones
app.use(express.json());

// Asignamos las rutas base de la API para cada módulo
app.use('/api/usuarios', usuariosRoutes);     // Ruta para todo lo relacionado con usuarios
app.use('/api/alimentos', alimentosRoutes);   // Ruta para alimentos
app.use('/api/puntos', puntosRoutes);         // Ruta para puntos de recolección
app.use('/api/donaciones', donacionesRoutes); // Ruta para donaciones

// Iniciamos el servidor en el puerto 3001
app.listen(3001, () => {
  console.log('Servidor corriendo en http://localhost:3001');
});
