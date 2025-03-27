import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import './Pstyles/Home.css';
import FeaturedProducts from '../Components/FeaturedProducts';
import Login from '../Components/Login';
import Signup from '../Components/Signup';
import Cart from '../Components/Cart';

function Home({ user, setUser }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const navigate = useNavigate();

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCartItems(parsedCart);
      // Calculate total quantity of items
      const itemCount = parsedCart.reduce((total, item) => total + item.quantity, 0);
      setCartItemCount(itemCount);
    }
  }, []);

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowSignup(false);
    setShowCart(false);
  };

  const handleSignupClick = () => {
    setShowSignup(true);
    setShowLogin(false);
    setShowCart(false);
  };

  const handleCartClick = () => {
    setShowCart(true);
    setShowLogin(false);
    setShowSignup(false);
  };

  const handleCloseModal = () => {
    setShowLogin(false);
    setShowSignup(false);
    setShowCart(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleSellClick = () => {
    if (user) {
      navigate('/sell');
    } else {
      setShowLogin(true);
    }
  };

  const handleShopNow = () => {
    navigate('/products');
  };

  // Function to add item to cart
  const addToCart = (product) => {
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    
    let updatedCart;
    if (existingItemIndex >= 0) {
      // If item already exists, update quantity
      updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += 1;
    } else {
      // Add new item to cart
      const newItem = { ...product, quantity: 1 };
      updatedCart = [...cartItems, newItem];
    }
    
    setCartItems(updatedCart);
    updateCartCount(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Update cart item count
  const updateCartCount = (items) => {
    const count = items.reduce((total, item) => total + item.quantity, 0);
    setCartItemCount(count);
  };

  return (
    <div className="home-page">
      {/* Profile Link in the Top-Left Corner */}
      {user && (
        <div className="profile-link-container">
          <Link to="/profile" className="profile-link">
            Profile
          </Link>
        </div>
      )}

      <section className="hero">
        <div className="hero-content">
          <h1>Second-Hand Marketplace</h1>
          <p>Buy, sell, and discover pre-owned treasures at amazing prices.</p>
          <div className="hero-buttons">
            <button className="shop-now-button" onClick={handleShopNow}>Shop Now</button>
            <button className="sell-button" onClick={handleSellClick}>Sell an Item</button>
          </div>
          
          <div className="auth-cart-container">
            {/* Cart Button with item count */}
            <button onClick={handleCartClick} className="cart-button">
              Cart ({cartItemCount})
            </button>
            
            {user ? (
              <div className="user-info">
                <span>Welcome {user.name}!</span>
                <button onClick={handleLogout} className="logout-button">Logout</button>
              </div>
            ) : (
              <>
                <button onClick={handleLoginClick} className="auth-button">Login</button>
                <button onClick={handleSignupClick} className="auth-button">Signup</button>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="featured-section">
        <h2>Featured Items</h2> 
        <FeaturedProducts addToCart={addToCart} />
      </section>

      <section className="about-section">
        <div className="about-content">
          <h2>About Our Marketplace</h2>
          <p>Our second-hand marketplace connects buyers and sellers, giving items a second life while helping you save money and reduce waste.</p>
          <p>Whether you're looking to declutter your home or find unique pre-owned treasures, our platform makes it easy to buy and sell with confidence.</p>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Sign Up</h3>
            <p>Create your free account to start buying and selling</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>List Items</h3>
            <p>Take a photo, set a price, and list your item in minutes</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Buy & Sell</h3>
            <p>Connect with buyers and sellers in your community</p>
          </div>
        </div>
      </section> 

      {/* Modal components */}
      {showLogin && <Login setUser={setUser} onClose={handleCloseModal} />}
      {showSignup && <Signup setUser={setUser} onClose={handleCloseModal} />}
      {showCart && (
        <Cart 
          cartItems={cartItems} 
          setCartItems={setCartItems} 
          updateCartCount={updateCartCount} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
}

export default Home;