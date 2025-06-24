import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Usuarios from './components/Usuarios';
import Alimentos from './components/Alimentos';
import Donaciones from './components/Donaciones';
import PuntosRecoleccion from './components/PuntosRecoleccion';
import HistorialDonaciones from './components/HistorialDonaciones';
import './App.css';
import logo from './assets/Logo Food.png';


function App() {
  return (
    <Router>
     <div className="navbar">
      <img src={logo} alt="Logo" className="logo" />
      <div className="nav-links">
        <Link to="/">Usuarios</Link>
        <Link to="/alimentos">Alimentos</Link>
        <Link to="/donaciones">Donaciones</Link>
        <Link to="/puntos">Puntos</Link>
        <Link to="/historial">Historial</Link>
  
</div>
    </div>
      <Routes>
        <Route path="/" element={<Usuarios />} />
        <Route path="/alimentos" element={<Alimentos />} />
        <Route path="/donaciones" element={<Donaciones />} />
        <Route path="/puntos" element={<PuntosRecoleccion />} />
        <Route path="/historial" element={<HistorialDonaciones />} />
      </Routes>
    </Router>
  );
}

export default App;

