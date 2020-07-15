import React from 'react';
import './CartItem.css';

export default function CartItem({ handleRemoveFromCartClick, title, cost, quantity, id }) {
  return (
    <div className="CartItem">
      <div>{title}</div>
      <div className="CartItem-details">
        <div className="CartItem-quantity">Qty: {quantity}</div>
        <div>${cost.toFixed(2)}</div>
      </div>
      <button className="Product-remove-button" onClick={()=>handleRemoveFromCartClick(id)}>
        X
      </button>
    </div>
  );
}