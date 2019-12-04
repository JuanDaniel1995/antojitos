import ShopActionTypes from "./shop.types";

const INITIAL_STATE = {
  dishes: null,
  isFetching: false,
  errorMessage: ""
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopActionTypes.FETCH_DISHES_START:
      return {
        ...state,
        isFetching: true
      };
    case ShopActionTypes.FETCH_DISHES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        dishes: action.payload
      };
    case ShopActionTypes.FETCH_DISHES_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload
      };
    default:
      return state;
  }
};

export default shopReducer;
