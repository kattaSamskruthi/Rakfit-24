
import React from 'react';
import '../components/CartComponent.css';

const Cart = () => {
  const items = [
    { brand: 'Brand Name', product: 'Product Name', quantity: 1, price: 3000 },
    { brand: 'Brand Name', product: 'Product Name', quantity: 2, price: 3000 },
    { brand: 'Brand Name', product: 'Product Name', quantity: 1, price: 3000 },
  ];

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart">
      <div className="cart-items">
        {items.map((item, index) => (
          <div className="cart-item" key={index}>
            
            <div className="item-image-placeholder"></div>
            <div className="item-details-wrapper">
            
              <div className="item-details">
                <div className="item-brand">{item.brand}</div>
                <div className="item-product">{item.product}</div>
                <div className="item-quantity-price">
                  <div className="item-quantity">Quantity: {item.quantity}</div>
                  <div className="item-price">Price: {item.price}</div>
                </div>
              </div>
              <button className="remove-item">x</button>
            </div>
          </div>
        ))}
      </div>
        <div className='billing'>
            <div className="cart-summary">
            <div className="address-section">
            <div className="address-label">Address:</div>
            <div className="address-value">Not Provided</div>
            <button className="change-address">Change Address</button>
            </div>
            <div className="price-section">
            <div className="price-label">Price:</div>
            <div className="price-value">9000</div>
            </div>
            <button className="place-order">Place Order</button>
            </div>
            <button className="leave-group item-space ">Leave Shopping Group</button> 
        </div>
      
    </div>
  );
};

export default Cart;
