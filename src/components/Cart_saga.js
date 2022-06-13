import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
	ADD_CART,
	CART_TOTAL,
	DECREMENT,
	EMPTY_CART,
	DELETE_CART,
	GET_PRODUCTS,
	INCREMENT,
	SUBTOTAL,
	DISCOUNT_TOTAL,
	ADD_ADDRESS,
} from './Types';
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
		
		yield put({
			type: 'GET_PRODUCTS_SUCCESS',
			products: response.data,
			qty: 0,
		});
		
	} catch (error) {
		yield put({ type: 'GET_PRODUCTS_FAILURE', message: error.message });
	}
}
export function* incQuantitity(action) {
	yield put({ type: 'INCREMENT_SUCCESS', quantity: action.payload.id });
}
export function* decQuantity(action) {
	yield put({ type: 'DECREMENT_SUCCESS', quantity: action.payload.id });
}
export function* total() {
	yield put({ type: 'SUBTOTAL_SUCCESS' });
}
export function* discount() {
	yield put({ type: 'DISCOUNT_TOTAL_SUCCESS' });
}
export function* cartTotal() {
	yield put({ type: 'CART_TOTAL_SUCCESS' });
}
export function* emptycart() {
	yield put({ type: 'EMPTY_CART_SUCCESS' });
}

export function* addressSuccess(action) {
	yield put({ type: 'ADD_ADDRESS_SUCCESS', payload: action.payload.address });
}
export function* watchUser() {
	yield all(
		yield takeLatest(GET_PRODUCTS, getProductsSuccess),
		yield takeEvery(ADD_CART, AddCartUser),
		yield takeEvery(DELETE_CART, DeleteCartUser),
		yield takeEvery(INCREMENT, incQuantitity),
		yield takeEvery(DECREMENT, decQuantity),
		yield takeEvery(SUBTOTAL, total),
		yield takeEvery(DISCOUNT_TOTAL, discount),
		yield takeEvery(CART_TOTAL, cartTotal),
		yield takeEvery(EMPTY_CART, emptycart),
		yield takeEvery(ADD_ADDRESS, addressSuccess)
	);
}
