import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [tipo, setTipo] = useState('');
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  const fetchUsuarios = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/usuarios');
      setUsuarios(res.data);
    } catch (error) {
      console.error('❌ Error al cargar usuarios:', error);
    }
  };

  const crearUsuario = async () => {
    if (!nombre || !email || !tipo) {
      alert("Por favor completa todos los campos");
      return;
    }

    try {
      await axios.post('http://localhost:3001/api/usuarios', {
        nombre,
        email,
        tipo
      });
      resetFormulario();
      fetchUsuarios();
    } catch (error) {
      console.error('❌ Error al crear usuario:', error);
      alert("Error al crear usuario. Verifica los datos o la conexión.");
    }
  };

  const eliminarUsuario = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este usuario?")) {
      try {
        await axios.delete(`http://localhost:3001/api/usuarios/${id}`);
        fetchUsuarios();
      } catch (error) {
        console.error("❌ Error al eliminar usuario:", error);
      }
    }
  };

  const prepararEdicion = (usuario) => {
    setNombre(usuario.nombre);
    setEmail(usuario.email);
    setTipo(usuario.tipo);
    setIdEditando(usuario.userID);
    setModoEdicion(true);
  };

  const actualizarUsuario = async () => {
    if (!nombre || !email || !tipo) {
      alert("Por favor completa todos los campos");
      return;
    }

    try {
      await axios.put(`http://localhost:3001/api/usuarios/${idEditando}`, {
        nombre,
        email,
        tipo
      });
      resetFormulario();
      fetchUsuarios();
    } catch (error) {
      console.error("❌ Error al actualizar usuario:", error);
    }
  };

  const resetFormulario = () => {
    setNombre('');
    setEmail('');
    setTipo('');
    setModoEdicion(false);
    setIdEditando(null);
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

 return (
  <div className="App">
    <h2>CRUD de Usuarios</h2>

    <div className="usuarios-form">
      <input
        placeholder="Nombre"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
      />
      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        placeholder="Tipo (hogar/restaurante/comercio)"
        value={tipo}
        onChange={e => setTipo(e.target.value)}
      />

      {modoEdicion ? (
        <>
          <button onClick={actualizarUsuario}>Actualizar Usuario</button>
          <button onClick={resetFormulario}>Cancelar</button>
        </>
      ) : (
        <button onClick={crearUsuario}>Crear Usuario</button>
      )}
    </div>

    <h3>Lista de Usuarios</h3>
    <div className="usuarios-lista">
      {usuarios.map(u => (
        <div key={u.userID} className="lista-item">
          {u.nombre} - {u.tipo} - {u.email}
          <div className="iconos">
           <button className="btn-editar" onClick={() => prepararEdicion(u)}>✏️</button>
            <button onClick={() => eliminarUsuario(u.userID)}>🗑️</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

}

export default Usuarios;
