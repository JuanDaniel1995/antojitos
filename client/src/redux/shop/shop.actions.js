import ShopActionTypes from "./shop.types";

export const fetchDishesStart = () => ({
  type: ShopActionTypes.FETCH_DISHES_START
});

export const fetchDishesSuccess = dishes => ({
  type: ShopActionTypes.FETCH_DISHES_SUCCESS,
  payload: dishes
});

export const fetchDishesFailure = errorMessage => ({
  type: ShopActionTypes.FETCH_DISHES_FAILURE,
  payload: errorMessage
});
