import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const linkStyle = { marginRight: 12 };
  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
      <NavLink to="/" style={linkStyle}>Home</NavLink>
      <NavLink to="/dashboard" style={linkStyle}>Dashboard</NavLink>
      <NavLink to="/create" style={linkStyle}>Create</NavLink>
      <div style={{ float: 'right' }}>
        <NavLink to="/signup" style={linkStyle}>Sign up</NavLink>
        <NavLink to="/login" style={linkStyle}>Login</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
