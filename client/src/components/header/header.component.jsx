import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "../../redux/user/user.selectors";
import { signOutStart } from "../../redux/user/user.actions";

import "./header.scss";

const Header = ({ currentUser, signOutStart }) => (
  <div className="top-bar">
    <ul className="menu top-bar-left">
      <li>
        <h1>
          <Link to="/">Antojitos</Link>
        </h1>
      </li>
    </ul>
    <ul className="menu top-bar-right">
      <li>
        <Link to="/shop">Tienda</Link>
      </li>
      {currentUser && (
        <li>
          <Link to="/profile">Pérfil</Link>
        </li>
      )}
      {currentUser ? (
        <li>
          <Link to="#" onClick={signOutStart}>
            Salir
          </Link>
        </li>
      ) : (
        <li>
          <Link to="/auth">Ingresar</Link>
        </li>
      )}
    </ul>
  </div>
);
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
