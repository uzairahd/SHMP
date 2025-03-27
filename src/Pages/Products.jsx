import React, { useState, useEffect } from 'react';
import ProductList from '../Components/ProductList';
import './Pstyles/Products.css';

// Default products if no user listings exist
const defaultProducts = [
  { id: 1, name: 'Laptop', price: 999, imageUrl: 'https://via.placeholder.com/250', description: 'Powerful laptop for work and play.', condition: 'Like New', seller: 'admin' },
  { id: 2, name: 'Smartphone', price: 699, imageUrl: 'https://via.placeholder.com/250', description: 'Latest smartphone with amazing features.', condition: 'Good', seller: 'admin' },
  { id: 3, name: 'Headphones', price: 149, imageUrl: 'https://via.placeholder.com/250', description: 'Noise-cancelling headphones for immersive audio.', condition: 'New', seller: 'admin' },
  { id: 4, name: 'Tablet', price: 349, imageUrl: 'https://via.placeholder.com/250', description: 'Lightweight tablet for entertainment and productivity.', condition: 'Fair', seller: 'admin' },
  { id: 5, name: 'Camera', price: 799, imageUrl: 'https://via.placeholder.com/250', description: 'High-resolution camera for capturing memories.', condition: 'Good', seller: 'admin' },
  { id: 6, name: 'Smart Speaker', price: 99, imageUrl: 'https://via.placeholder.com/250', description: 'Voice-controlled smart speaker for your home.', condition: 'Like New', seller: 'admin' },
];

function Products({ user }) {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Load marketplace items
    const savedItems = localStorage.getItem('marketplaceItems');
    let marketplaceItems = savedItems ? JSON.parse(savedItems) : [];
    
    // Combine with default products if needed
    if (marketplaceItems.length === 0) {
      marketplaceItems = defaultProducts;
      localStorage.setItem('marketplaceItems', JSON.stringify(defaultProducts));
    }
    
    setProducts(marketplaceItems);
    
    // Load cart items
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Get unique categories from products
  const categories = ['All', ...new Set(products.map(product => product.category || 'Other'))];

  // Filter products by category
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  // Add to cart function
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
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <div className="products-page">
      <section className="products-header">
        <h1>Second-Hand Marketplace</h1>
        <p>Browse quality pre-owned items at great prices</p>
      </section>

      <section className="filter-section">
        <div className="category-filter">
          <label htmlFor="category-select">Filter by Category:</label>
          <select 
            id="category-select" 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </section>
      
      <section className="product-list-section">
        <ProductList products={filteredProducts} addToCart={addToCart} />
      </section>
    </div>
  );
}

export default Products;