import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pstyles/UserProfile.css';

function UserProfile({ user }) {
  const [orders, setOrders] = useState([]);
  const [accountDetails, setAccountDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    // Fetch user's orders and account details (simulated with localStorage)
    const savedOrders = localStorage.getItem('orders');
    const userOrders = savedOrders ? JSON.parse(savedOrders).filter(order => order.user === user) : [];
    setOrders(userOrders);

    const savedUsers = localStorage.getItem('users');
    const users = savedUsers ? JSON.parse(savedUsers) : [];
    const currentUser = users.find(u => u.username === user);
    setAccountDetails(currentUser);
  }, [user, navigate]);

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <div className="profile-section">
        <h3>Account Details</h3>
        {accountDetails ? (
          <div className="account-details">
            <p><strong>Username:</strong> {accountDetails.username}</p>
            <p><strong>Email:</strong> {accountDetails.email}</p>
            <p><strong>Joined:</strong> {new Date(accountDetails.joined).toLocaleDateString()}</p>
          </div>
        ) : (
          <p>No account details found.</p>
        )}
      </div>

      <div className="profile-section">
        <h3>Order History</h3>
        {orders.length > 0 ? (
          <div className="order-list">
            {orders.map((order, index) => (
              <div key={index} className="order-item">
                <p><strong>Order ID:</strong> {order.id}</p>
                <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
                <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <div className="order-products">
                  <h4>Products:</h4>
                  {order.products.map((product, idx) => (
                    <div key={idx} className="product-item">
                      <p>{product.name} - ${product.price.toFixed(2)} x {product.quantity}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
}

export default UserProfile;