// Path: src/Components/ProductCard.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Styles/ProductCard.css";

function ProductCard({ product, addToCart }) {
  const navigate = useNavigate();
  
  const handleAddToCart = () => {
    if (addToCart) {
      addToCart(product);
    }
  };
  
  const handleBuyNow = () => {
    navigate(`/buy/${product.id}`);
  };

  return (
    <div className="product-card">
      <div className="product-details">
        <h3>{product.name}</h3>
        <p className="price">${product.price.toFixed(2)}</p>
        {product.condition && <p className="condition">Condition: {product.condition}</p>}
        <p className="description">{product.description}</p>
        {product.seller && <p className="seller">Seller: {product.seller}</p>}
        <div className="button-group">
          <button className="cart-button" onClick={handleAddToCart}>Add to Cart</button>
          <button className="buy-button" onClick={handleBuyNow}>Buy Now</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;