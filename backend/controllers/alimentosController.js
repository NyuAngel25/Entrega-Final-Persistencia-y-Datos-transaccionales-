const db = require('../db');

// Obtener todos los alimentos
exports.obtenerTodos = (req, res) => {
  db.query('SELECT * FROM alimento', (err, resultados) => {
    if (err) return res.status(500).json(err);
    res.json(resultados);
  });
};

// Crear un nuevo alimento
exports.crear = (req, res) => {
  let { nombre, unidadMedida, categoria, calorias } = req.body;

  calorias = calorias ? parseInt(calorias) : null;

  console.log("Recibido:", { nombre, unidadMedida, categoria, calorias });

  db.query(
    'INSERT INTO alimento (nombre, unidadMedida, categoria, calorias) VALUES (?, ?, ?, ?)',
    [nombre, unidadMedida, categoria || null, calorias],
    (err, result) => {
      if (err) {
        console.error("❌ Error al insertar alimento:", err);
        return res.status(500).json({ error: err.message });
      }
      res.json({ mensaje: 'Alimento creado correctamente', result });
    }
  );
};


// Actualizar un alimento existente
exports.actualizar = (req, res) => {
  const id = req.params.id;
  let { nombre, unidadMedida, categoria, calorias } = req.body;

  calorias = calorias ? parseInt(calorias) : null;

  db.query(
    'UPDATE alimento SET nombre = ?, unidadMedida = ?, categoria = ?, calorias = ? WHERE foodID = ?',
    [nombre, unidadMedida, categoria || null, calorias, id],
    (err, result) => {
      if (err) {
        console.error("❌ Error al actualizar alimento:", err);
        return res.status(500).json(err);
      }
      res.json({ mensaje: 'Alimento actualizado correctamente', result });
    }
  );
};

// Eliminar un alimento
exports.eliminar = (req, res) => {
  const id = req.params.id;
  db.query(
    'DELETE FROM alimento WHERE foodID = ?',
    [id],
    (err, result) => {
      if (err) {
        console.error("❌ Error al eliminar alimento:", err);
        return res.status(500).json(err);
      }
      res.json({ mensaje: 'Alimento eliminado', result });
    }
  );
};
