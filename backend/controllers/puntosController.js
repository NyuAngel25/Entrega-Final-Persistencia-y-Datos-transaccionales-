const db = require('../db');

// Obtener todos los puntos
exports.obtenerTodos = (req, res) => {
  db.query('SELECT * FROM puntorecoleccion', (err, resultados) => {
    if (err) return res.status(500).json(err);
    res.json(resultados);
  });
};

// Crear nuevo punto
exports.crear = (req, res) => {
  let { nombre, direccion, ongID } = req.body;

  // Validar el tipo de dato
  ongID = ongID && !isNaN(ongID) ? parseInt(ongID) : null;

  db.query(
    'INSERT INTO puntorecoleccion (nombre, direccion, ongID) VALUES (?, ?, ?)',
    [nombre, direccion || null, ongID],
    (err, result) => {
      if (err) {
        console.error("❌ Error al crear punto de recolección:", err);
        return res.status(500).json({ error: err.message });
      }
      res.json({ mensaje: 'Punto creado correctamente', result });
    }
  );
};

// Actualizar punto
exports.actualizar = (req, res) => {
  const id = req.params.id;
  let { nombre, direccion, ongID } = req.body;

  // Validar el tipo de dato
  ongID = ongID && !isNaN(ongID) ? parseInt(ongID) : null;

  db.query(
    'UPDATE puntorecoleccion SET nombre = ?, direccion = ?, ongID = ? WHERE pointID = ?',
    [nombre, direccion || null, ongID, id],
    (err, result) => {
      if (err) {
        console.error("❌ Error al actualizar punto:", err);
        return res.status(500).json(err);
      }
      res.json({ mensaje: 'Punto actualizado correctamente', result });
    }
  );
};

// Eliminar punto
exports.eliminar = (req, res) => {
  const id = req.params.id;

  db.query('DELETE FROM puntorecoleccion WHERE pointID = ?', [id], (err, result) => {
    if (err) {
      console.error("❌ Error al eliminar punto:", err);
      return res.status(500).json(err);
    }
    res.json({ mensaje: 'Punto eliminado', result });
  });
};
