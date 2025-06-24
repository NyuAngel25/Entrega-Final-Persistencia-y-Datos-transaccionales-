import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';


function HistorialDonaciones() {
  const [donaciones, setDonaciones] = useState([]);

  const fetchDonaciones = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/donaciones');
      setDonaciones(res.data);
    } catch (error) {
      console.error('❌ Error al cargar donaciones:', error);
    }
  };

  const actualizarEstado = async (donID, nuevoEstado) => {
    try {
      await axios.put(`http://localhost:3001/api/donaciones/${donID}/estado`, {
        estado: nuevoEstado,
      });
      fetchDonaciones();
    } catch (error) {
      console.error('❌ Error al cambiar estado:', error);
    }
  };

  useEffect(() => {
    fetchDonaciones();
  }, []);

  return (
  <div className="App">
    <h2>Historial de Donaciones</h2>
    <div className="tabla-contenedor">
      <table className="tabla-donaciones">
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Punto</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {donaciones.map(d => (
            <tr key={d.donID}>
              <td>{d.donID}</td>
              <td>{d.usuario} ({d.email})</td>
              <td>{d.punto}</td>
              <td>{new Date(d.fechaCreacion).toLocaleString()}</td>
              <td>{d.estado}</td>
              <td>
                <select
                  value={d.estado}
                  onChange={e => actualizarEstado(d.donID, e.target.value)}
                >
                  <option value="pendiente">pendiente</option>
                  <option value="recogido">recogido</option>
                  <option value="cancelado">cancelado</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

}

export default HistorialDonaciones;
