import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ProductDetail from './ProductDetail';
import { useDispatch, useSelector } from 'react-redux';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CART_TOTAL, GET_PRODUCTS } from '../Types';
import Dialog from '@material-ui/core/Dialog';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Ratings from './Ratings';

const Products = ({ item }) => {
	const dispatch = useDispatch();
	const products = useSelector((state) => state?.products);

	const cartTotal = useSelector((state) => state?.carttotal);
	const [dis, setDis] = useState(false);

	const [open, setOpen] = useState(false);

	const navigate = useNavigate();

	const viewHandler = (item) => {
		localStorage.setItem('item', JSON.stringify({ ...item, discount: 100 }));
		setDis(true);
		setOpen(true);
	};
	const addToCartHandler = () => {
		navigate('/cart');
	};
	const handleToClose = () => {
		setOpen(false);
	};
	useEffect(() => {
		dispatch({ type: GET_PRODUCTS });
	}, []);
	useEffect(() => {
		dispatch({ type: CART_TOTAL });
	});
	console.log('pppppp', item);
	return (
		<>
			<div className="bg-gray-200 w-screen grid grid-cols-6 gap-4">
				<div className="col-start-2 col-span-4 ">
					<h1 className=" text-center capitalize text-4xl text-black py-6">
						Our products
					</h1>
				</div>
				<div>
					<ShoppingCartIcon
						onClick={addToCartHandler}
						className="w-max  col-start-5 col-end-6 mt-8"
					/>
					<span className="rounded-full py-1 px-2 bg-red-400">{cartTotal}</span>
				</div>
			</div>

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
												Rs {product.price*100}
											</span>
											<span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-base mb-2">
												Flat 50%
											</span>
											<span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-base mb-2">
												Hurry
											</span>
										</div>

										<button
											onClick={() => viewHandler(product)}
											className="bg-cyan-500 hover:bg-cyan-700 text-white text-sm font-bold py-2 px-4  mt-2 mb-5 rounded hover:scale-125 transition ease-in-out duration-1000"
										>
											view
										</button>
									</div>
								</div>
							)
					)}
			</div>
			{dis && (
				<Dialog open={open}>
					<DialogContent>
						<ProductDetail setOpen={setOpen} />
					</DialogContent>
					<DialogActions>
						<Button onClick={handleToClose} color="danger" autoFocus>
							Close
						</Button>
					</DialogActions>
				</Dialog>
			)}
		</>
	);
};

export default Products;
