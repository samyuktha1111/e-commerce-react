import { createStore, applyMiddleware } from 'redux';
import { CartReducer } from './CartReducer';
import createSagaMiddleware from '@redux-saga/core';
import { watchUser } from './Cart_saga';
const sagaMiddleware = createSagaMiddleware();
const store = createStore(CartReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watchUser);
export default store;
