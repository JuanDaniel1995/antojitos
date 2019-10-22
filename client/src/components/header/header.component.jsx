import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import "./header.scss";

const Header = () => (
  <div className="header">
    <div className="options">
      <Link className="option" to="/">
        Antojitos
      </Link>
      <div className="option" to="/shop">
        Shop
      </div>
      <div className="option" to="/shop">
        Sign in
      </div>
      <div className="option">
        <ShoppingIcon className="shopping-icon" />
      </div>
    </div>
  </div>
);

export default Header;
