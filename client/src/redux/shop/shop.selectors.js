import { createSelector } from "reselect";

const selectShop = state => state.shop;

export const selectDishes = createSelector(
  [selectShop],
  shop => shop.dishes
);

export const selectIsDishFetching = createSelector(
  [selectShop],
  shop => shop.isFetching
);
