import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';


function PuntosRecoleccion() {
  const [puntos, setPuntos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [ongID, setOngID] = useState('');
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  // Obtener todos los puntos
  const fetchPuntos = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/puntos');
      setPuntos(res.data);
    } catch (error) {
      console.error("❌ Error al cargar puntos de recolección:", error);
    }
  };

  // Crear punto
  const crearPunto = async () => {
    if (!nombre || !direccion) {
      alert("Nombre y dirección son obligatorios.");
      return;
    }

    try {
      await axios.post('http://localhost:3001/api/puntos', {
        nombre,
        direccion,
        ongID
      });
      resetFormulario();
      fetchPuntos();
    } catch (error) {
      console.error("❌ Error al crear punto:", error);
    }
  };

  // Actualizar punto
  const actualizarPunto = async () => {
    try {
      await axios.put(`http://localhost:3001/api/puntos/${idEditando}`, {
        nombre,
        direccion,
        ongID
      });
      resetFormulario();
      fetchPuntos();
    } catch (error) {
      console.error("❌ Error al actualizar punto:", error);
    }
  };

  // Eliminar punto
  const eliminarPunto = async (id) => {
    if (window.confirm("¿Eliminar este punto de recolección?")) {
      try {
        await axios.delete(`http://localhost:3001/api/puntos/${id}`);
        fetchPuntos();
      } catch (error) {
        console.error("❌ Error al eliminar punto:", error);
      }
    }
  };

  // Preparar edición
  const prepararEdicion = (punto) => {
    setNombre(punto.nombre);
    setDireccion(punto.direccion);
    setOngID(punto.ongID || '');
    setIdEditando(punto.pointID);
    setModoEdicion(true);
  };

  // Resetear formulario
  const resetFormulario = () => {
    setNombre('');
    setDireccion('');
    setOngID('');
    setModoEdicion(false);
    setIdEditando(null);
  };

  useEffect(() => {
    fetchPuntos();
  }, []);

 return (
  <div className="App">
    <h2>CRUD de Puntos de Recolección</h2>

    <div className="usuarios-form">
      <input
        placeholder="Nombre del punto"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
      />
      <input
        placeholder="Dirección"
        value={direccion}
        onChange={e => setDireccion(e.target.value)}
      />
      <input
        placeholder="ID de ONG (opcional)"
        value={ongID}
        onChange={e => setOngID(e.target.value)}
      />

      {modoEdicion ? (
        <>
          <button onClick={actualizarPunto}>Actualizar</button>
          <button onClick={resetFormulario}>Cancelar</button>
        </>
      ) : (
        <button onClick={crearPunto}>Crear</button>
      )}
    </div>

    <h3>Lista de Puntos</h3>
    <div className="usuarios-lista">
      {puntos.map(p => (
        <div key={p.pointID} className="lista-item">
          <div>
            <strong>{p.nombre}</strong> | Dirección: {p.direccion} | ONG: {p.ongID || '-'}
          </div>
          <div className="iconos">
            <button onClick={() => prepararEdicion(p)}>✏️</button>
            <button onClick={() => eliminarPunto(p.pointID)}>🗑️</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

}

export default PuntosRecoleccion;
