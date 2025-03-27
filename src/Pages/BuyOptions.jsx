// Path: src/Pages/BuyOptions.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Pstyles/BuyOptions.css';

function BuyOptions() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [shippingMethod, setShippingMethod] = useState('standard');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch product details based on productId
    const savedItems = localStorage.getItem('marketplaceItems');
    if (savedItems) {
      const allItems = JSON.parse(savedItems);
      const foundProduct = allItems.find(item => item.id === parseInt(productId));
      
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        // If product not found, navigate back to products
        navigate('/products');
      }
    }
  }, [productId, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle the purchase logic
    // For demonstration, just show an alert
    alert(`Purchase successful! Your order for ${product.name} has been placed.`);
    navigate('/products');
  };

  if (!product) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="buy-options-page">
      <h2>Complete Your Purchase</h2>
      
      <div className="product-summary">
        <img 
          src={product.imageUrl || 'https://via.placeholder.com/250'} 
          alt={product.name} 
          className="product-image" 
        />
        <div className="product-info">
          <h3>{product.name}</h3>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <p className="product-condition">Condition: {product.condition}</p>
          <p className="product-seller">Seller: {product.seller}</p>
        </div>
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
            <span>Item:</span>
            <span>${product.price.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping:</span>
            <span>${shippingMethod === 'standard' ? '5.99' : '12.99'}</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>
              ${(product.price + (shippingMethod === 'standard' ? 5.99 : 12.99)).toFixed(2)}
            </span>
          </div>
        </div>
        
        <button type="submit" className="place-order-button">Place Order</button>
      </form>
    </div>
  );
}

export default BuyOptions;