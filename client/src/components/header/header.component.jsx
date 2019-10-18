import React from "react";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import "./header.scss";

const Header = () => (
  <div className="header">
    <div className="options">
      <div className="option" to="/shop">
        ANTOJITOS
      </div>
      <div className="option" to="/shop">
        SHOP
      </div>
      <div className="option" to="/shop">
        CONTACT
      </div>
      <div className="option" to="/shop">
        SIGN IN
      </div>
      <div className="option">
        <ShoppingIcon className="shopping-icon" />
      </div>
    </div>
  </div>
);

export default Header;
