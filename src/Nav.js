import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Nav = ({ activeTab, onTabChange, cartNumberItems, cartTotal }) => {
  const itemClass = tabName =>
    `App-nav-item ${
      activeTab === tabName ? 'selected' : ''
    }`;
  
  return (
    <nav className="App-nav">
      <ul>
        <li className={itemClass('items')}>
          <button onClick={() => onTabChange('items')}>
            Items
          </button>
        </li>
        <li className={itemClass('cart')}>
          <button onClick={() => onTabChange('cart')}>
            Cart
          </button>
        </li>
      </ul>
      <div
        className="App-nav-cart"
        onClick={() => onTabChange('cart')}
      >
        <span><FontAwesomeIcon icon={faShoppingCart} /></span>
        <span>{`${cartNumberItems} items ($${cartTotal.toFixed(2)})`}</span>
      </div>
    </nav>
  );
};

export default Nav;