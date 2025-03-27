import React from 'react';
import { Link } from 'react-router-dom';
import "./Styles/Header.css";

function Header({ user }) {
  return (
    <header className="app-header">
      <div className="logo">
        <Link to="/">SecondHandMarketplace</Link>
      </div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        {user && <Link to="/sell" className="sell-link">Sell an Item</Link>}
      </nav>
    </header>
  );
}

export default Header;