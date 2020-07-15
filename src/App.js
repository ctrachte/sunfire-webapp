import React, { useState } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import items from './api/items.js';
import Product from './Components/Product/Product.js';
import Cart from './Components/Cart/Cart.js';
import CheckoutForm from './Components/CheckoutForm/CheckoutForm.js';
import logo from './sunfireBackground.jpg';
import './App.css';
import db from './firebase.js';

export default function App() {
  // testing our db
  db.collection("inventory")
  .get()
  .then(querySnapshot => {
    const data = querySnapshot.docs.map(doc => doc.data());
    console.log(data); // array of cities objects
  });
  const [itemsInCart, setItemsInCart] = useState([]);

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

  const totalCost = itemsInCart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="App">
      <header className="App-header">
      <div className="App-products">
          {items.map(item => (
            <Product
              key={item.title}
              title={item.title}
              price={item.price}
              onAddToCartClick={() => handleAddToCartClick(item.id)}
            />
          ))}
        </div>
      </header>
      <img src={logo} className="App-logo" alt="logo" />
      <main className="App-shop">

        <Cart itemsInCart={itemsInCart} totalCost={totalCost} />
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
