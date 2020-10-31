import React, { useState } from 'react';
import Nav from './Nav';
import ItemPage from './ItemPage';
import CartPage from './CartPage';
import { items } from './static-data';
import './App.css';

const summarizeCart = cart => {
  const groupedItems = cart.reduce((summary, item) => {
    summary[item.id] = summary[item.id] || {
      ...item,
      count: 0
    };

    summary[item.id].count++;

    return summary;
  }, {});
console.log(Object.values(groupedItems));
  return Object.values(groupedItems);
};

const getTotalCart = cart => 
  cart.reduce(
    (total, item) => total + item.price
  , 0);

const App = () => {
  const [activeTab, setActiveTab] = useState('items');
  const [cart, setCart] = useState([]);

  const addToCart = item => {
    setCart(prevCart => [...prevCart, item]);
  };

  const removeItem = item => {
    let index = cart.findIndex(i => i.id === item.id);
    if (index >= 0) {
      setCart(cart => {
        const copy = [...cart];
        copy.splice(index, 1);
        return copy;
      });
    }
  };

  return (
    <div className="App">
      <Nav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        cartNumberItems={cart.length}
        cartTotal={getTotalCart(cart)}
      />
      <main className="App-content">
        <Content
          tab={activeTab}
          onAddToCart={addToCart}
          onRemoveItem={removeItem}
          cart={summarizeCart(cart)}
          cartTotal={getTotalCart(cart)}
        />
      </main>
    </div>
  );
};

const Content = ({ tab, onAddToCart, onRemoveItem, cart, cartTotal }) => {
  switch (tab) {
    default:
    case 'items':
      return (
        <ItemPage
          items={items}
          onAddToCart={onAddToCart}
        />
      );
    case 'cart':
      return (
        <CartPage
          items={cart}
          onAddOne={onAddToCart}
          onRemoveOne={onRemoveItem}
          cartTotal={cartTotal}
        />
      );
  }
};

export default App;
