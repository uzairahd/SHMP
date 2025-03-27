import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import Products from './Pages/Products';
import About from './Pages/About';
import Contact from './Pages/Contact';
import SellItem from './Pages/SellItem';
import BuyOptions from './Pages/BuyOptions';
import CheckoutOptions from './Pages/CheckoutOptions';
import UserProfile from './Pages/UserProfile'; // Import the new component
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Header user={user} />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home user={user} setUser={setUser} />} />
            <Route path="/products" element={<Products user={user} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/sell" element={<SellItem user={user} />} />
            <Route path="/buy/:productId" element={<BuyOptions />} />
            <Route path="/checkout" element={<CheckoutOptions />} />
            <Route path="/profile" element={<UserProfile user={user} />} /> {/* Add the new route */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;