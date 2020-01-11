import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "../../redux/user/user.selectors";
import { signOutStart } from "../../redux/user/user.actions";

import "./header.scss";

const Header = ({ currentUser, signOutStart }) => (
  <div className="header">
    <div className="options">
      <Link className="option" to="/">
        Antojitos
      </Link>
      <Link className="option" to="/shop">
        Tienda
      </Link>
      {currentUser && (
        <Link className="option" to="/profile">
          Pérfil
        </Link>
      )}
      {currentUser ? (
        <div className="option" onClick={signOutStart}>
          Salir
        </div>
      ) : (
        <Link className="option" to="/auth">
          Ingresar
        </Link>
      )}
    </div>
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
