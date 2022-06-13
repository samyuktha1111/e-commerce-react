import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Products from '@/products/Products';
import Order from '@/products/Order';
import Home from '@/main/Home';
import Cart from '@/products/Cart';
import PriceDetails from '@/payment/PriceDetails';
import store from '@/store';
import { Provider } from 'react-redux';
import PrivateRoute from './components/login/PrivateRoute';
import CardPayment from '@/payment/CardPayment';
import ResetPassword from '@/login/ResetPassword';
import Signup from '@/login/Signup';
import Login from '@/login/Login';
import Mainpage from '@/main/Mainpage';
import CartOrders from '@/login/CartOrders';
import Address from '@/address/Address';
import Profile from '@/address/Profile';
import ProfileUpdate from '@/address/ProfileUpdate';

const App = () => {
	return (
		<Provider store={store}>
			<div className="App">
				<Router>
					<Routes>
						<Route
							exact
							path="/home"
							element={
								<PrivateRoute>
									<Home />
								</PrivateRoute>
							}
						/>
						<Route
							exact
							path="/product"
							element={
								<PrivateRoute>
									<Products />
								</PrivateRoute>
							}
						>
							<Route path="/product/:id" />
						</Route>
						<Route
							exact
							path="/order"
							element={
								<PrivateRoute>
									<Order />
								</PrivateRoute>
							}
						/>
						<Route
							exact
							path="/cart"
							element={
								<PrivateRoute>
									<Cart />
								</PrivateRoute>
							}
						/>
						<Route
							exact
							path="/price"
							element={
								<PrivateRoute>
									<PriceDetails />
								</PrivateRoute>
							}
						/>
						<Route
							exact
							path="/pay"
							element={
								<PrivateRoute>
									<CardPayment />
								</PrivateRoute>
							}
						/>
						<Route exact path="/login" element={<Signup />} />
						<Route exact path="/user" element={<Login />} />
						<Route exact path="/" element={<Mainpage />} />
						<Route
							exact
							path="/reset"
							element={
								<PrivateRoute>
									<ResetPassword />
								</PrivateRoute>
							}
						/>
						<Route
							exact
							path="/carto"
							element={
								<PrivateRoute>
									<CartOrders />
								</PrivateRoute>
							}
						/>
						<Route
							exact
							path="/address"
							element={
								<PrivateRoute>
									<Address />
								</PrivateRoute>
							}
						/>
						<Route
							exact
							path="/profile"
							element={
								<PrivateRoute>
									<Profile />
								</PrivateRoute>
							}
						/>
						<Route
							exact
							path="/update"
							element={
								<PrivateRoute>
									<ProfileUpdate />
								</PrivateRoute>
							}
						/>
					</Routes>
				</Router>
			</div>
		</Provider>
	);
};

export default App;
