import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pstyles/SellItem.css';

function SellItem({ user }) {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState('Good');
  const [category, setCategory] = useState('Electronics');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a new item object
    const newItem = {
      id: Date.now(), // Simple ID generation
      name: itemName,
      description,
      price: parseFloat(price),
      condition,
      category,
      imageUrl: imageUrl || 'https://via.placeholder.com/250',
      seller: user,
      listingDate: new Date().toISOString()
    };
    
    // Get existing items from localStorage
    const existingItems = JSON.parse(localStorage.getItem('marketplaceItems') || '[]');
    
    // Add the new item
    const updatedItems = [...existingItems, newItem];
    
    // Save back to localStorage
    localStorage.setItem('marketplaceItems', JSON.stringify(updatedItems));
    
    // Redirect to products page
    navigate('/products');
  };

  // If user is not logged in, redirect to login
  if (!user) {
    return (
      <div className="sell-item-page">
        <h2>Please log in to sell items</h2>
        <button onClick={() => navigate('/')}>Go to Login</button>
      </div>
    );
  }

  return (
    <div className="sell-item-page">
      <h2>Sell Your Item</h2>
      
      <form onSubmit={handleSubmit} className="sell-item-form">
        <div className="form-group">
          <label htmlFor="itemName">Item Name</label>
          <input 
            type="text" 
            id="itemName" 
            value={itemName} 
            onChange={(e) => setItemName(e.target.value)} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea 
            id="description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="price">Price ($)</label>
          <input 
            type="number" 
            id="price" 
            min="0.01" 
            step="0.01" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="condition">Condition</label>
          <select 
            id="condition" 
            value={condition} 
            onChange={(e) => setCondition(e.target.value)}
          >
            <option value="New">New</option>
            <option value="Like New">Like New</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Poor">Poor</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select 
            id="category" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Books">Books</option>
            <option value="Home & Garden">Home & Garden</option>
            <option value="Sports">Sports</option>
            <option value="Toys & Games">Toys & Games</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL (optional)</label>
          <input 
            type="url" 
            id="imageUrl" 
            value={imageUrl} 
            onChange={(e) => setImageUrl(e.target.value)} 
            placeholder="https://example.com/image.jpg"
          />
        </div>
        
        <button type="submit" className="submit-button">List Item for Sale</button>
      </form>
    </div>
  );
}

export default SellItem;