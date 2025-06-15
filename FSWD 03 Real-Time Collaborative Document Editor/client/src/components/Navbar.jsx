// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#f0f0f0' }}>
      <Link to="/">Home</Link>
      <Link to="/new" className="btn">
        ➕ New Document
      </Link>

    </nav>
  );
};

export default Navbar;
