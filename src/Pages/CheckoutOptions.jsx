// Path: src/Pages/CheckoutOptions.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pstyles/CheckoutOptions.css';

function CheckoutOptions() {
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [shippingMethod, setShippingMethod] = useState('standard');
  const navigate = useNavigate();

  useEffect(() => {
    // Load cart items
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    } else {
      // If no items in cart, redirect to products
      navigate('/products');
    }
  }, [navigate]);

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateShippingCost = () => {
    return shippingMethod === 'standard' ? 5.99 : 12.99;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShippingCost();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle the purchase logic
    // For demonstration, just show an alert
    alert(`Purchase successful! Your order has been placed.`);
    
    // Clear cart
    localStorage.removeItem('cart');
    
    // Redirect to products page
    navigate('/products');
  };

  const handleProductClick = (productId) => {
    // Navigate to individual buy options for a specific product
    navigate(`/buy/${productId}`);
  };

  if (cartItems.length === 0) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="checkout-options-page">
      <h2>Complete Your Purchase</h2>
      
      <div className="checkout-container">
        <div className="items-summary">
          <h3>Items in Your Cart</h3>
          {cartItems.map(item => (
            <div key={item.id} className="checkout-item" onClick={() => handleProductClick(item.id)}>
              <img 
                src={item.imageUrl || 'https://via.placeholder.com/100'} 
                alt={item.name} 
                className="checkout-item-image" 
              />
              <div className="checkout-item-details">
                <h4>{item.name}</h4>
                <p>Price: ${item.price.toFixed(2)}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                <button 
                  className="view-details-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProductClick(item.id);
                  }}
                >
                  View Item Details
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="form-section">
            <h3>Shipping Information</h3>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input type="text" id="fullName" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input type="text" id="address" required />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input type="text" id="city" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="zipCode">ZIP Code</label>
                <input type="text" id="zipCode" required />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <select id="country">
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
                <option value="AU">Australia</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Shipping Method</label>
              <div className="radio-group">
                <label>
                  <input 
                    type="radio" 
                    name="shippingMethod" 
                    value="standard" 
                    checked={shippingMethod === 'standard'} 
                    onChange={() => setShippingMethod('standard')} 
                  />
                  Standard Shipping (3-5 business days) - $5.99
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="shippingMethod" 
                    value="express" 
                    checked={shippingMethod === 'express'} 
                    onChange={() => setShippingMethod('express')} 
                  />
                  Express Shipping (1-2 business days) - $12.99
                </label>
              </div>
            </div>
          </div>
          
          <div className="form-section">
            <h3>Payment Method</h3>
            <div className="radio-group payment-options">
              <label>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="creditCard" 
                  checked={paymentMethod === 'creditCard'} 
                  onChange={() => setPaymentMethod('creditCard')} 
                />
                Credit/Debit Card
              </label>
              <label>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="paypal" 
                  checked={paymentMethod === 'paypal'} 
                  onChange={() => setPaymentMethod('paypal')} 
                />
                PayPal
              </label>
            </div>
            
            {paymentMethod === 'creditCard' && (
              <div className="credit-card-details">
                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" required />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="expDate">Expiration Date</label>
                    <input type="text" id="expDate" placeholder="MM/YY" required />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="cvv">CVV</label>
                    <input type="text" id="cvv" placeholder="123" required />
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${calculateSubtotal().toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>${calculateShippingCost().toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
          </div>
          
          <button type="submit" className="place-order-button">Place Order</button>
        </form>
      </div>
    </div>
  );
}

export default CheckoutOptions;