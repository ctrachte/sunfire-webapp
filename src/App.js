import React, { useState, useEffect } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
// import items from './api/items.js';
import Product from './Components/Product/Product.js';
import Cart from './Components/Cart/Cart.js';
import CheckoutForm from './Components/CheckoutForm/CheckoutForm.js';
import logo from './sunfireBackground.jpg';
import './App.css';
import db from './firebase.js';

export default function App() {

  const [itemsInCart, setItemsInCart] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    db.collection("inventory")
    .get()
    .then(querySnapshot => {
      const data = querySnapshot.docs.map(doc => doc.data());
      setItems(data);
    })
   });

  const handleAddToCartClick = id => {
    setItemsInCart(itemsInCart => {
      const itemInCart = itemsInCart.find(item => item.id === id);

      // if item is already in cart, update the quantity
      if (itemInCart) {
        return itemsInCart.map(item => {
          if (item.id !== id) return item;
          return { ...itemInCart, quantity: item.quantity + 1 };
        });
      }

      // otherwise, add new item to cart
      const item = items.find(item => item.id === id);
      return [...itemsInCart, { ...item, quantity: 1 }];
    });
  };

  const handleRemoveFromCartClick = id => {
    setItemsInCart(itemsInCart => {
      const itemInCart = itemsInCart.find(item => item.id === id);

      // if item is already in cart, update the quantity
      if (itemInCart) {
        return itemsInCart.map(item => {
          if (item.id !== id) return item;
          if (item.quantity > 0) {
            return { ...itemInCart, quantity: item.quantity - 1 };
          }
          else {
            return { ...itemInCart, quantity: item.quantity };
          }
        });
      }
      // otherwise, remove item from cart
      return itemsInCart;
    });
  };

  const calculateShipping = qty => {
    if (qty < 4) {
      return qty * 8;
    } else if (qty >= 4) {
      return 32;
    }
  }

  const subTotal = itemsInCart.reduce(
    (acc, item) => (acc + item.price * item.quantity),
    0
  );

  const totalCost = itemsInCart.reduce(
    (acc, item) => (acc + item.price * item.quantity) + calculateShipping(itemsInCart.length),
    0
  );

  return (
    <div className="App">
      <header className="App-header">
      <div className="App-products">
          {items?.map(item => (
            <Product
              key={item.id}
              title={item.title}
              price={item.price}
              qty={item.qty}
              onAddToCartClick={() => handleAddToCartClick(item.id)}
            />
          ))}
        </div>
      </header>
      <img src={logo} className="App-logo" alt="logo" />
      <main className="App-shop">

        <Cart subTotal={subTotal} handleRemoveFromCartClick={handleRemoveFromCartClick} itemsInCart={itemsInCart} totalCost={totalCost} />
        {itemsInCart.length > 0 && (
          <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PK}>
            <Elements>
              <CheckoutForm totalCost={totalCost} />
            </Elements>
          </StripeProvider>
        )}
      </main>
    </div>
  );
}
