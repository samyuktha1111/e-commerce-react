import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home(props) {
	const navigate = useNavigate();

	const shopHandler = (item) => {
		props.category(item);
		navigate('/product');
	};
	return (
		<div className=" grid grid-flow-row gap-7 pt-36 lg:w-fit sm:w-fit mx-auto">
			<h1 className="text-4xl  font-bold text-yellow-500 md:text-green-500 lg:text-pink-500 sm:text-blue-500">
				OUR BRANDS
			</h1>
			<p className=" px-72 text-gray-400">
				Our Brands Superstore currently provides 500 products across categories
				like fresh fruits, fresh vegetables, groceries, home care and packaged
				food among others.
			</p>
			<div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 ml-52 pt-20">
				<button
					onClick={() => shopHandler("men's clothing")}
					className="animate-bounce bg-green-500 sm:bg-yellow-500 md:bg-blue-500 lg:bg-pink-500 hover:bg-pink-700 text-white text-md font-bold py-4 px-6 mt-5 w-48 rounded-full hover:scale-125 transition ease-in-out duration-1000"
				>
					men's clothing
				</button>
				<button
					onClick={() => shopHandler("women's clothing")}
					className="animate-bounce bg-green-500 sm:bg-yellow-500 md:bg-blue-500 lg:bg-pink-500 hover:bg-pink-700 text-white text-md font-bold py-4 px-6 mt-5 w-48 rounded-full hover:scale-125 transition ease-in-out duration-1000"
				>
					women's clothing
				</button>
				<button
					onClick={() => shopHandler('jewelery')}
					className="animate-bounce bg-green-500 sm:bg-yellow-500 md:bg-blue-500 lg:bg-pink-500 hover:bg-pink-700 text-white text-md font-bold py-4 px-6 mt-5 w-48 rounded-full hover:scale-125 transition ease-in-out duration-1000"
				>
					jewelery
				</button>
				<button
					onClick={() => shopHandler('electronics')}
					className="animate-bounce bg-green-500 sm:bg-yellow-500 md:bg-blue-500 lg:bg-pink-500 hover:bg-pink-700 text-white text-md font-bold py-4 px-6 mt-5 w-48 rounded-full hover:scale-125 transition ease-in-out duration-1000"
				>
					electronics
				</button>
			</div>
		</div>
	);
}

export default Home;
