import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UPIPayment from './UPIPayment';
import { useSelector, useDispatch } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { EMPTY_CART } from '../Types';
import PaymentImages from './PaymentImages';
const PaymentOptions = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [open, setOpen] = useState(true);
	const carts = JSON.parse(localStorage.getItem('carts')) || [];
	const [scan, setScan] = useState(false);
	const items = useSelector((state) => state.items);
	const card = () => {
		navigate('/pay');
	};
	const payment = () => {
		navigate('/order');
		carts.push(...items);
		console.log(carts);
		localStorage.setItem('carts', JSON.stringify(carts));
		dispatch({ type: EMPTY_CART });
	};
	const upiHandler = () => {
		setScan(true);
	};
	return (
		<>
			{scan && (
				<Dialog open={open}>
					<DialogContent>
						<UPIPayment setOpen={setOpen} />
					</DialogContent>
				</Dialog>
			)}
			<div>
				<div className=" text-xl font-semibold mt-14 text-justify ml-11  ">
					Payment Options
				</div>

				<div className="w-full h-11">
					<div className="text-justify ml-11 mt-8 flex ">
						<div>
							<input
								type="radio"
								name="pay"
								onClick={upiHandler}
								className="flex-none w-14"
							/>
						</div>

						<lablel className="ml-11 flex-initial w-64">UPI</lablel>
						<PaymentImages />
					</div>
				</div>
				<div className="text-justify ml-16">
					<input type="radio" name="pay" />
					<label className="ml-16">Wallets</label>
				</div>
				<div className="text-justify ml-16 mt-5 flex">
					<input type="radio" name="pay" onClick={card} />
					<label className="ml-16">Credit/Debit/ATMCard</label>

					<img
						src="https://freepngimg.com/save/25744-credit-card-visa-and-master-card-clipart/1066x220"
						alt="shampoo"
						className="max-w-xs h-8 ml-56 "
					/>
				</div>
				<div className="text-justify ml-16 mt-2">
					<input type="radio" name="pay" />
					<label className="ml-16">Cash on Delivery</label>
				</div>
				<div className="text-right mr-24 mt-36">
					<button
						onClick={payment}
						className="bg-red-600 hover:bg-red-700 text-white text-sm font-bold py-2 px-4  rounded hover:scale-125 transition ease-in-out duration-1000"
					>
						Place Order
					</button>
				</div>
			</div>
		</>
	);
};
export default PaymentOptions;
