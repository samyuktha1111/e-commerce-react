import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { ADD_CART, DELETE_CART, GET_PRODUCTS } from './Types';
import axios from 'axios';
export function* AddCartUser(action) {
	yield put({ type: 'ADD_CART_SUCCESS', id: action.payload });
}
export function* DeleteCartUser(action) {
	yield put({ type: 'DELETE_CART_SUCCESS', id: action.payload.id });
}
export function* getProductsSuccess() {
	try {
		console.log('state');
		const response = yield call(axios.get, 'https://fakestoreapi.com/products');
		console.log('state', response);
		yield put({ type: 'GET_PRODUCTS_SUCCESS', products: response.data });
	} catch (error) {
		yield put({ type: 'GET_PRODUCTS_FAILURE', message: error.message });
	}
}

export function* watchUser() {
	yield all(
		yield takeLatest(GET_PRODUCTS, getProductsSuccess),
		yield takeEvery(ADD_CART, AddCartUser),
		yield takeEvery(DELETE_CART, DeleteCartUser)
	);
}
