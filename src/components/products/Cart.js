import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { SUBTOTAL, EMPTY_CART, DISCOUNT_TOTAL } from '../Types';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import CartDetails from './CartDetails';

const mapStateToProps = (state) => {
	console.log('state1', state);
	return {
		items: state.items,
		subtotal: state.subtotal,
		discountTotal: state.discountTotal,
		cartTotal: state.carttotal,
	};
};
const Cart = (props) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const checkOutHandler = () => {
		navigate('/price');
	};
	console.log('items', props.items);
	useEffect(() => {
		dispatch({ type: SUBTOTAL });
		dispatch({ type: DISCOUNT_TOTAL });
	});
	const cartHandler = () => {
		dispatch({ type: EMPTY_CART });
		
	};

	return (
		<>
			{props.items.length > 0 && (
				<>
					<div className="bg-gray-200 w-screen grid grid-cols-6 gap-4">
						<div className="col-start-2 col-span-4 ">
							<h1 className=" text-center capitalize text-4xl text-black py-6">
								CART
							</h1>
						</div>
						<div>
							<ShoppingCartIcon className="w-max  col-start-5 col-end-6 mt-8" />
							<span className="rounded-full py-1 px-2 bg-red-400">
								{props.cartTotal}
							</span>
						</div>
					</div>
					<div className="grid grid-cols-7 gap-2 mt-11">
						<div className="col-start-5 text-sm ">PRICE</div>
						<div className="col-start-6 text-sm ">QUANTITY</div>
						<div className="col-start-7 text-sm ">SUBTOTAL</div>
					</div>
					<hr />
				</>
			)}
			<div className=" grid grid-flow-row gap-2 max-w-sm h-1 ">
				<CartDetails />
				{props.items.length > 0 && (
					<>
						<div className="grid grid-rows-2 gap-3 mt-6">
							<div className="grid grid-cols-8">
								<div className="text-xl col-start-7 col-span-2">
									Cart Total: {props.subtotal}
								</div>
								<div className="text-md text-green-500 col-start-7 col-span-2">
									Discount: {props.discountTotal}
								</div>
							</div>
							<div className="grid grid-cols-8 gap-2">
								<div className=" col-start-7">
									<button
										onClick={cartHandler}
										className="bg-red-500 hover:bg-red-700 text-white text-sm font-bold px-6 py-2  mt-2 mb-5 rounded hover:scale-125 transition ease-in-out duration-1000 col-start-6"
									>
										EMPTY CART
									</button>
								</div>
								<div className="col-start-8">
									<button
										onClick={checkOutHandler}
										className="bg-black hover:bg-black text-white text-sm font-bold px-6 py-2 mt-2 mb-5 rounded hover:scale-125 transition ease-in-out duration-1000 col-start-7"
									>
										CHECKOUT
									</button>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default connect(mapStateToProps)(Cart);
