import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';




function Donaciones() {
  const [usuarios, setUsuarios] = useState([]);
  const [puntos, setPuntos] = useState([]);
  const [alimentos, setAlimentos] = useState([]);
  const [userID, setUserID] = useState('');
  const [pointID, setPointID] = useState('');
  const [donAlimentos, setDonAlimentos] = useState([{ foodID: '', cantidad: '' }]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resUsuarios, resPuntos, resAlimentos] = await Promise.all([
          axios.get('http://localhost:3001/api/usuarios'),
          axios.get('http://localhost:3001/api/puntos'),
          axios.get('http://localhost:3001/api/alimentos'),
        ]);
        setUsuarios(resUsuarios.data);
        setPuntos(resPuntos.data);
        setAlimentos(resAlimentos.data);
      } catch (error) {
        console.error('❌ Error al cargar datos iniciales:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddAlimento = () => {
    setDonAlimentos([...donAlimentos, { foodID: '', cantidad: '' }]);
  };

  const handleChangeAlimento = (index, field, value) => {
    const nuevos = [...donAlimentos];
    nuevos[index][field] = value;
    setDonAlimentos(nuevos);
  };

  const handleRemoveAlimento = (index) => {
    const nuevos = [...donAlimentos];
    nuevos.splice(index, 1);
    setDonAlimentos(nuevos);
  };

  const resetFormulario = () => {
    setUserID('');
    setPointID('');
    setDonAlimentos([{ foodID: '', cantidad: '' }]);
  };

  const esFormularioValido = () => {
    if (!userID || !pointID) return false;

    const alimentosValidos = donAlimentos.filter(
      a => a.foodID && a.cantidad && !isNaN(parseFloat(a.cantidad))
    );
    if (alimentosValidos.length === 0) return false;

    const ids = alimentosValidos.map(a => a.foodID);
    const tieneDuplicados = new Set(ids).size !== ids.length;
    if (tieneDuplicados) return false;

    return true;
  };

  const handleSubmit = async () => {
    const alimentosValidos = donAlimentos.filter(
      a => a.foodID && a.cantidad && !isNaN(parseFloat(a.cantidad))
    );

    const datos = {
      userID: parseInt(userID),
      pointID: parseInt(pointID),
      alimentos: alimentosValidos.map(a => ({
        foodID: parseInt(a.foodID),
        cantidad: parseFloat(a.cantidad)
      }))
    };

    try {
      await axios.post('http://localhost:3001/api/donaciones', datos);
      alert('✅ Donación registrada con éxito');
      resetFormulario();
    } catch (error) {
      console.error('❌ Error al registrar donación:', error);
      alert('Error al registrar donación. Verifica los datos.');
    }
  };

 return (
  <div className="App">
    <h2>Registrar Donación</h2>

    <div className="usuarios-form">
      <label>Usuario:</label>
      <select value={userID} onChange={e => setUserID(e.target.value)}>
        <option value="">Selecciona usuario</option>
        {usuarios.map(u => (
          <option key={u.userID} value={u.userID}>
            {u.nombre} ({u.email})
          </option>
        ))}
      </select>

      <label>Punto de Recolección:</label>
      <select value={pointID} onChange={e => setPointID(e.target.value)}>
        <option value="">Selecciona punto</option>
        {puntos.map(p => (
          <option key={p.pointID} value={p.pointID}>
            {p.nombre} - {p.direccion}
          </option>
        ))}
      </select>
    </div>

    <h3>Alimentos Donados</h3>
    <div className="usuarios-lista">
      {donAlimentos.map((a, index) => (
        <div key={index} className="lista-item">
          <select
            value={a.foodID}
            onChange={e => handleChangeAlimento(index, 'foodID', e.target.value)}
          >
            <option value="">Selecciona alimento</option>
            {alimentos.map(al => (
              <option key={al.foodID} value={al.foodID}>
                {al.nombre}
              </option>
            ))}
          </select>
          <input
            type="number"
            step="0.1"
            placeholder="Cantidad (kg)"
            value={a.cantidad}
            onChange={e => handleChangeAlimento(index, 'cantidad', e.target.value)}
          />
          <div className="iconos">
            <button onClick={() => handleRemoveAlimento(index)}>❌</button>
          </div>
        </div>
      ))}
    </div>

    <button onClick={handleAddAlimento}>➕ Agregar Alimento</button>
    <br /><br />
    <button onClick={handleSubmit} disabled={!esFormularioValido()}>
      📦 Registrar Donación
    </button>
  </div>
);

}

export default Donaciones;
