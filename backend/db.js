// backend/db.js
const mysql = require('mysql2');

//CONEXION A LA BASE DE DATOS SQL CREADA POR EL GRUPO
const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'root', //USUARIO DEL MOTOR
  password: '', // CONTRASEÑA DEL USUARIO
  database: 'FoodWasteTracker' // BASE DATOS ENTREGA 3
});

conexion.connect((err) => {
  if (err) throw err;
  console.log('✅ Conectado a la base de datos MySQL'); // MESAJE QUE SE VE EN EL CMD AL CORRER EL BACKEND EN CMD
});

module.exports = conexion;
