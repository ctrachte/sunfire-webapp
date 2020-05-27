import React from 'react';
import items from './api/api';
import Product from './components/Product/product';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-header-text">Dreamcast Shop</h1>
      </header>
      <main className="App-shop">
        <div className="App-products">
          {items.map(item => (
            <Product key={item.title} title={item.title} price={item.price} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
