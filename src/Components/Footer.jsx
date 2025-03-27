import React from 'react';
import "./Styles/Footer.css"

function Footer() {
  return (
    <footer className="app-footer">
      <p>&copy; {new Date().getFullYear()} My Ecommerce Site</p>
    </footer>
  );
}

export default Footer;