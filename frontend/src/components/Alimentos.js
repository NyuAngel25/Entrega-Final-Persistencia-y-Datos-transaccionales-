import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';


function Alimentos() {
  const [alimentos, setAlimentos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [unidadMedida, setUnidadMedida] = useState('');
  const [categoria, setCategoria] = useState('');
  const [calorias, setCalorias] = useState('');
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  const fetchAlimentos = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/alimentos');
      setAlimentos(res.data);
    } catch (error) {
      console.error('❌ Error al cargar alimentos:', error);
    }
  };

  const crearAlimento = async () => {
    if (!nombre || !unidadMedida) {
      alert("Nombre y unidad de medida son obligatorios.");
      return;
    }

    try {
      await axios.post('http://localhost:3001/api/alimentos', {
        nombre,
        unidadMedida,
        categoria,
        calorias
      });
      resetFormulario();
      fetchAlimentos();
    } catch (error) {
      console.error('❌ Error al crear alimento:', error);
      alert("Error al crear alimento. Verifica los datos.");
    }
  };

  const actualizarAlimento = async () => {
    try {
      await axios.put(`http://localhost:3001/api/alimentos/${idEditando}`, {
        nombre,
        unidadMedida,
        categoria,
        calorias
      });
      resetFormulario();
      fetchAlimentos();
    } catch (error) {
      console.error('❌ Error al actualizar alimento:', error);
    }
  };

  const eliminarAlimento = async (id) => {
    if (window.confirm("¿Eliminar este alimento?")) {
      try {
        await axios.delete(`http://localhost:3001/api/alimentos/${id}`);
        fetchAlimentos();
      } catch (error) {
        console.error('❌ Error al eliminar alimento:', error);
      }
    }
  };

  const prepararEdicion = (alimento) => {
    setNombre(alimento.nombre);
    setUnidadMedida(alimento.unidadMedida);
    setCategoria(alimento.categoria || '');
    setCalorias(alimento.calorias || '');
    setIdEditando(alimento.foodID);
    setModoEdicion(true);
  };

  const resetFormulario = () => {
    setNombre('');
    setUnidadMedida('');
    setCategoria('');
    setCalorias('');
    setModoEdicion(false);
    setIdEditando(null);
  };

  useEffect(() => {
    fetchAlimentos();
  }, []);

 return (
  <div className="App">
    <h2>CRUD de Alimentos</h2>

    <div className="usuarios-form">
      <input
        placeholder="Nombre"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
      />
      <input
        placeholder="Unidad de medida (kg, l, etc.)"
        value={unidadMedida}
        onChange={e => setUnidadMedida(e.target.value)}
      />
      <input
        placeholder="Categoría (opcional)"
        value={categoria}
        onChange={e => setCategoria(e.target.value)}
      />
      <input
        type="number"
        placeholder="Calorías (opcional)"
        value={calorias}
        onChange={e => setCalorias(e.target.value)}
      />

      {modoEdicion ? (
        <>
          <button onClick={actualizarAlimento}>Actualizar</button>
          <button onClick={resetFormulario}>Cancelar</button>
        </>
      ) : (
        <button onClick={crearAlimento}>Crear</button>
      )}
    </div>

    <h3>Lista de Alimentos</h3>
    <div className="usuarios-lista">
      {alimentos.map(a => (
        <div key={a.foodID} className="lista-item">
          <div>
            <strong>{a.nombre}</strong> | Unidad: {a.unidadMedida} | Categoría: {a.categoria || '-'} | Calorías: {a.calorias || '-'}
          </div>
          <div className="iconos">
            <button onClick={() => prepararEdicion(a)}>✏️</button>
            <button onClick={() => eliminarAlimento(a.foodID)}>🗑️</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

}

export default Alimentos;
