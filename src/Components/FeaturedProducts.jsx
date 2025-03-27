import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import './Styles/FeaturedProducts.css';

// Default featured products if we don't have enough user listings
const defaultFeaturedProducts = [
  { id: 101, name: 'Smart Watch', price: 149, imageUrl: 'https://via.placeholder.com/250', description: 'Gently used smartwatch in excellent condition.', condition: 'Like New', seller: 'admin' },
  { id: 102, name: 'Wireless Headphones', price: 79, imageUrl: 'https://via.placeholder.com/250', description: 'Premium wireless headphones with noise cancellation.', condition: 'Good', seller: 'admin' },
  { id: 103, name: 'Portable Speaker', price: 49, imageUrl: 'https://via.placeholder.com/250', description: 'Bluetooth speaker with great sound quality.', condition: 'Very Good', seller: 'admin' },
];

function FeaturedProducts({ addToCart }) {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    // Get all marketplace items
    const savedItems = localStorage.getItem('marketplaceItems');
    let allItems = savedItems ? JSON.parse(savedItems) : [];
    
    let featured = [];
    
    // If we have enough user listings, pick 3 random ones
    if (allItems.length >= 3) {
      // Shuffle the array
      const shuffled = [...allItems].sort(() => 0.5 - Math.random());
      // Get the first 3 items
      featured = shuffled.slice(0, 3);
    } else {
      // Otherwise use default featured products
      featured = defaultFeaturedProducts;
    }
    
    setFeaturedProducts(featured);
  }, []);

  return (
    <div className="featured-products">
      {featuredProducts.map((product) => (
        <ProductCard key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
}

export default FeaturedProducts;