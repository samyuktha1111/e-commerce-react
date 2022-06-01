import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Products from './components/products/Products';
import Order from './components/products/Order';
import Home from './components/main/Home';
import Cart from './components/products/Cart';
import PriceDetails from './components/payment/PriceDetails';
import store from './components/store';
import {Provider} from 'react-redux'
import {useState} from 'react'
import CardPayment from './components/payment/CardPayment';
import ResetPassword from './components/login/ResetPassword';
import Signup from './components/login/Signup';
import Login from './components/login/Login';
import Mainpage from './components/main/Mainpage';
import CartOrders from './components/login/CartOrders';
import Address from './components/address/Address';
function App() {
	const[item,setItem]=useState('')
	const category=item1=>
	{
		setItem(item1)
	}
	return (
		<Provider store={store}>
			<div className="App">
				<Router>
					<Routes>
						<Route exact path="/home" element={<Home category={category} />} />
						<Route exact path="/product" element={<Products item={item} />} />
						<Route exact path="/order" element={<Order />} />
						<Route exact path="/cart" element={<Cart />} />
						<Route exact path="/price" element={<PriceDetails />} />
						<Route exact path="/pay" element={<CardPayment />} />
						<Route exact path="/login" element={<Signup />} />
						<Route exact path="/user" element={<Login />} />
						<Route exact path="/" element={<Mainpage />} />
						<Route exact path="/reset" element={<ResetPassword />} />
						<Route exact path="/carto" element={<CartOrders />} />
						<Route exact path="/address" element={<Address />} />
					</Routes>
				</Router>
			</div>
		</Provider>
	);
}

export default App;
