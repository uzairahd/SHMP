import React from 'react';
import ProductCard from './ProductCard';
import "./Styles/ProductList.css";

function ProductList({ products, addToCart }) {
  if (products.length === 0) {
    return (
      <div className="empty-product-list">
        <p>No products found. Be the first to list something!</p>
      </div>
    );
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
}

export default ProductList;