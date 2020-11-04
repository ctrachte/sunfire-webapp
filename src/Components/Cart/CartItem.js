import React from 'react';
import './CartItem.css';

export default function CartItem({handleRemoveFromCartClick, title, cost, quantity, id }) {
  return (
    <div className="CartItem">
      <div>{title}</div>
      <div className="CartItem-details">
        <div className="CartItem-quantity">Qty: {quantity}</div>
        <div>${cost.toFixed(2)}</div>
      </div>
      {handleRemoveFromCartClick ? 
          <button className="close big-button Product-Remove-Button" onClick={()=>handleRemoveFromCartClick(id)}>Remove 1</button>
      : <div></div>}
    </div>
  );
}