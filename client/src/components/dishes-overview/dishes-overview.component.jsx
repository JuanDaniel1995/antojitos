import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  selectDishes,
  selectIsDishFetching
} from "../../redux/shop/shop.selectors";

import Spinner from "../spinner/spinner.component";

import "./dishes-overview.scss";

const DishesOverview = ({ dishes, isLoading }) => {
  return isLoading ? (
    <Spinner />
  ) : (
    <>
      {dishes.map(({ id, displayName, price }) => (
        <div key={id} className="callout large">
          <h4>{displayName}</h4>
          <p key={id}>Precio: {price} colones</p>
          <a href="#">Ordenar</a>
        </div>
      ))}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  dishes: selectDishes,
  isLoading: selectIsDishFetching
});

export default connect(mapStateToProps)(DishesOverview);
