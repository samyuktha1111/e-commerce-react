import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { ADD_CART, GET_PRODUCTS } from '../Types';

import Ratings from './Ratings';
import Alert from './Alert';

const Tailwind = ({ item }) => {
	const dispatch = useDispatch();
	const products = useSelector((state) => state?.products);

	const [display, setDisplay] = useState(false);

	const navigate = useNavigate();
	const orderHandler = (item) => {
		console.log(item);
		dispatch({ type: ADD_CART, payload: item });
		setDisplay(true);
	};
	const addToCartHandler = () => {
		navigate('/cart');
	};
	useEffect(() => {
		dispatch({ type: GET_PRODUCTS });
	}, []);
	console.log('pppppp', item);
	return (
		<>
			{display && <Alert />}
			<h1 className="mt-10 mb-2 text-center capitalize text-4xl text-yellow-500 md:text-green-500 lg:text-pink-500 sm:text-blue-500 ">
				Our products
			</h1>

			<button
				className="justify-items-end bg-pink-400 text-white mt-6  px-4 py-2"
				onClick={addToCartHandler}
			>
				Go to cart
			</button>

			<div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-3 justify-items-center mt-20">
				{products &&
					products.map(
						(product) =>
							product.category === item && (
								<div className="py-10" key={product.id}>
									<div className="rounded overflow-hidden shadow-lg max-w-xs  ">
										<div className="px-6 py-4 ">
											<img
												src={product.image}
												alt="shampoo"
												className="max-w-xs h-64 pl-10 mb-6 transform transition ease-in-out duration-1000 hover:scale-125"
											/>
											<Ratings />
											<div className="font-bold text-xl mt-4 mb-2 line-clamp-1">
												{product.title}
											</div>
											<p className="text-gray-400 text-md mb-2 line-clamp-3">
												{product.description}
											</p>
										</div>
										<div className="grid grid-flow-col gap-5 pb-2 px-3">
											<span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-base mb-2">
												Rs {product.price}
											</span>
											<span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-base mb-2">
												Flat 50%
											</span>
											<span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-base mb-2">
												Hurry
											</span>
										</div>
										<button
											onClick={() => orderHandler(product)}
											class="bg-cyan-500 hover:bg-cyan-700 text-white text-sm font-bold py-2 px-4  mt-2 mb-5 rounded hover:scale-125 transition ease-in-out duration-1000"
										>
											Add to cart
										</button>
									</div>
								</div>
							)
					)}
			</div>
		</>
	);
};

export default Tailwind;
