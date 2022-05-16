import React from 'react';
import { useNavigate } from 'react-router-dom';
import Ratings from './Ratings';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { DELETE_CART } from '../Types';

const mapStateToProps = (state) => {
	console.log('state1', state);
	return {
		items: state.items,
	};
};
const Cart = (props) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const orderHandler = () => {
		navigate('/order');
	};

	const removeHandler = (id) => {
		dispatch({ type: DELETE_CART, payload: { id } });
	};
	console.log('items', props.items);
	return (
		<>
			<h1 className="mt-10 mb-2 text-center capitalize text-4xl text-yellow-500 md:text-green-500 lg:text-pink-500 sm:text-blue-500">
				Cart
			</h1>

			<div className=" grid grid-cols-1 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-3 justify-items-center mt-20">
				{props.items.length > 0 ? (
					props.items.map((item) => (
						<div className="py-10">
							<div className="rounded overflow-hidden shadow-lg max-w-xs  border-neutral-400 border-2">
								<img
									src={item.image}
									alt="cream"
									className="max-w-xs pl-11 pt-5 transform transition ease-in-out duration-1000 hover:scale-125 h-64"
								/>
								<div className="px-6 py-4">
									<Ratings />
									<div className="font-bold text-xl mt-4 mb-2 line-clamp-1">
										{item.title}
									</div>
									<p className="text-gray-400 text-md mb-2 line-clamp-3">
										{item.description}
									</p>
								</div>
								<div className="grid grid-flow-col gap-5 pb-2 px-20">
									<span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-base mb-2">
										Rs {item.price}
									</span>
								</div>
								<div className="grid grid-flow-col gap-2">
									<button
										onClick={orderHandler}
										className="bg-pink-500 hover:bg-pink-700 text-white text-sm font-bold py-2 px-4  mt-2 mb-5 rounded hover:scale-125 transition ease-in-out duration-1000"
									>
										Place order
									</button>
									<button
										className="bg-pink-500 hover:bg-pink-700 text-white text-sm font-bold py-2 px-4  mt-2 mb-5 rounded hover:scale-125 transition ease-in-out duration-1000"
										onClick={() => removeHandler(item.id)}
									>
										Remove
									</button>
								</div>
							</div>
						</div>
					))
				) : (
					<h1 className="ml-96 w-max text-4xl animate-ping text-yellow-500 lg:text-blue-500 md:text-green-500 sm:text-blue-500">
						CART IS EMPTY
					</h1>
				)}
			</div>
		</>
	);
};

export default connect(mapStateToProps)(Cart);
