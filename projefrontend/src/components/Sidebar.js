import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <nav className="sidebar">
      <ul>
        <li><NavLink to="/" end>Öğrenciler</NavLink></li>
        <li><NavLink to="/students/new">Öğrenci Ekle</NavLink></li>
        <li><NavLink to="/departments">Departmanlar</NavLink></li>
        <li><NavLink to="/departments/new">Departman Ekle</NavLink></li>
      </ul>
    </nav>
  );
}

export default Sidebar;