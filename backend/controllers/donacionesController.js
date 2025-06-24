const db = require('../db');

// Crear una nueva donación
exports.crear = (req, res) => {
  const { userID, pointID, alimentos } = req.body;
  const fechaCreacion = new Date();
  const estado = 'pendiente';

  // 1. Insertar en donación
  db.query(
    'INSERT INTO donacion (userID, pointID, fechaCreacion, estado) VALUES (?, ?, ?, ?)',
    [userID, pointID, fechaCreacion, estado],
    (err, result) => {
      if (err) {
        console.error("❌ Error al crear donación:", err);
        return res.status(500).json({ error: err.message });
      }

      const donID = result.insertId;

      // 2. Filtrar alimentos válidos
      const values = alimentos
        .filter(a => a.foodID && a.cantidad)
        .map(a => [donID, a.foodID, a.cantidad]);

      if (values.length === 0) {
        return res.status(400).json({ error: 'No se proporcionaron alimentos válidos.' });
      }

      db.query(
        'INSERT INTO detalledonacion (donID, foodID, cantidadKg) VALUES ?',
        [values],
        (err2, result2) => {
          if (err2) {
            console.error("❌ Error al insertar alimentos:", err2);
            return res.status(500).json({ error: err2.message });
          }

          res.json({ mensaje: 'Donación registrada con éxito', donID });
        }
      );
    }
  );
};

// Obtener todas las donaciones
exports.obtenerTodas = (req, res) => {
  const sql = `
    SELECT 
      d.donID,
      u.nombre AS usuario,
      u.email,
      p.nombre AS punto,
      d.fechaCreacion,
      d.estado
    FROM donacion d
    JOIN usuario u ON d.userID = u.userID
    JOIN puntorecoleccion p ON d.pointID = p.pointID
    ORDER BY d.fechaCreacion DESC
  `;
  db.query(sql, (err, resultados) => {
    if (err) return res.status(500).json(err);
    res.json(resultados);
  });
};

// Actualizar estado
exports.actualizarEstado = (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  const estadosValidos = ['pendiente', 'recogido', 'cancelado'];
  if (!estadosValidos.includes(estado)) {
    return res.status(400).json({ error: 'Estado no válido' });
  }

  db.query(
    'UPDATE donacion SET estado = ? WHERE donID = ?',
    [estado, id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ mensaje: 'Estado actualizado', result });
    }
  );
};
