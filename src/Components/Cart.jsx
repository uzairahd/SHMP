// In Cart.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Styles/Cart.css";

function Cart({ cartItems, setCartItems, updateCartCount, onClose }) {
  const navigate = useNavigate();
  
  // Calculate the total price
  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };
  
  // Update item quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cartItems.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedCart);
    updateCartCount(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
  
  // Remove item from cart
  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCart);
    updateCartCount(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
  
  // Handle checkout - navigate to buying options
  const handleCheckout = () => {
    onClose(); // Close the cart modal
    navigate('/products'); // Navigate to products page where we'll show buying options
  };
  
  return (
    <div className="cart-modal">
      <div className="cart-content">
        <div className="cart-header">
          <h2>Your Shopping Cart</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <button className="continue-shopping" onClick={onClose}>Continue Shopping</button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-image-container">
                    <img 
                      src={item.imageUrl || '/placeholder-image.jpg'} 
                      alt={item.name} 
                      className="item-image" 
                    />
                  </div>
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-price">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <div className="item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <button 
                    className="remove-button"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            
            <div className="cart-summary">
              <div className="total">
                <span>Total:</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              <div className="cart-actions">
                <button className="continue-shopping" onClick={onClose}>Continue Shopping</button>
                <button className="checkout-button" onClick={handleCheckout}>Proceed to Checkout</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;