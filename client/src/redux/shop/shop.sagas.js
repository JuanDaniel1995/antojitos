import { takeLatest, put, all, call } from "redux-saga/effects";

import { firestore } from "../../firebase/firebase.utils";

import ShopActionTypes from "./shop.types";

import { fetchDishesSuccess, fetchDishesFailure } from "./shop.actions";

export function* fetchDishes() {
  try {
    const dishRef = firestore.collection("dishes");
    const dishesSnapshot = yield dishRef.get();
    const dishes = dishesSnapshot.docs.map(docSnapshot => {
      const { displayName, price } = docSnapshot.data();
      return {
        id: docSnapshot.id,
        displayName,
        price
      };
    });
    yield put(fetchDishesSuccess(dishes));
  } catch (error) {
    yield put(fetchDishesFailure(error.message));
  }
}

export function* onFetchDishesStart() {
  yield takeLatest(ShopActionTypes.FETCH_DISHES_START, fetchDishes);
}

export function* shopSagas() {
  yield all([call(onFetchDishesStart)]);
}
