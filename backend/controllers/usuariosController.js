const db = require('../db');

exports.obtenerTodos = (req, res) => {
  db.query('SELECT * FROM usuario', (err, resultados) => {
    if (err) {
      console.error("❌ Error al consultar usuarios:", err);
      return res.status(500).json(err);
    }
    res.json(resultados);
  });
};

exports.crear = (req, res) => {
  const { nombre, email, tipo } = req.body;

  if (!nombre || !email || !tipo) {
    return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
  }

  db.query(
    'INSERT INTO usuario (nombre, email, tipo) VALUES (?, ?, ?)',
    [nombre, email, tipo],
    (err, result) => {
      if (err) {
        console.error('❌ Error al insertar:', err);
        return res.status(500).json(err);
      }
      res.json({ mensaje: 'Usuario creado correctamente', result });
    }
  );
};

exports.eliminar = (req, res) => {
  const id = req.params.id;

  db.query('DELETE FROM usuario WHERE userID = ?', [id], (err, result) => {
    if (err) {
      console.error('❌ Error al eliminar usuario:', err);
      return res.status(500).json(err);
    }
    res.json({ mensaje: 'Usuario eliminado correctamente', result });
  });
};

exports.actualizar = (req, res) => {
  const id = req.params.id;
  const { nombre, email, tipo } = req.body;

  db.query(
    'UPDATE usuario SET nombre = ?, email = ?, tipo = ? WHERE userID = ?',
    [nombre, email, tipo, id],
    (err, result) => {
      if (err) {
        console.error('❌ Error al actualizar usuario:', err);
        return res.status(500).json(err);
      }
      res.json({ mensaje: 'Usuario actualizado correctamente', result });
    }
  );
};
