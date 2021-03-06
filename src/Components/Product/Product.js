import React from 'react';
import './Product.css';

export default function Product({ onAddToCartClick, price, title, qty }) {
  return (
    <div className="Product">
      <h2 className="Product-title">{title}</h2>
      <div className="Product-price">${price}</div>
      <div className="Product-qty">{qty} bottle(s) in stock.</div>
      <button className="big-button Product-Buy-Button" onClick={onAddToCartClick}>
        Add to cart
      </button>
    </div>
  );
}
