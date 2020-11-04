import React from 'react';
import CartItem from './CartItem';
import './Cart.css';

export default function Cart({ subTotal, handleRemoveFromCartClick, itemsInCart }) {

  function calculateShipping (subTotal) {
    let qty = subTotal/10
    return (qty < 4 ? qty * 8 : 32);
  }

  return (
    <div className="Cart">
      <h2 className="Cart-title">Your shopping cart</h2>
      {itemsInCart.length > 0 ? (
        <div>
          {itemsInCart.map(item => (
            <CartItem
              key={item.id}
              title={item.title}
              cost={item.price * item.quantity}
              quantity={item.quantity}
              handleRemoveFromCartClick={handleRemoveFromCartClick}
              id={item.id}
            />
          ))}
            <CartItem
              key={0}
              title={"Shipping"}
              cost={calculateShipping(subTotal)}
              quantity={subTotal/10 + " bottle(s)"}
              id={0}
            />
          <div className="Cart-total-cost">
            Total cost: ${(calculateShipping(subTotal) + subTotal).toFixed(2)}
          </div>
        </div>
      ) : (
        <div>Your cart is empty</div>
      )}
    </div>
  );
}