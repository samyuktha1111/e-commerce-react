import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
function CardPayment() {
	const navigate = useNavigate();
	const initialValues = { card_number: '', cvc: '', code: '' };
	const [forms, setForms] = useState(initialValues);
	const subtotal = useSelector((state) => state.subtotal);
	const discountTotal = useSelector((state) => state.discountTotal);
	const payHandler = () => {
		navigate('/order');
	};
	return (
		<div className="lg:w-fit sm:w-fit w-fit  text-justify mx-auto  shadow-lg h-fit mt-32 bg-purple-100">
			<h1 className="text-center  text-gray-500 font-semisolid text-2xl ">
				Card Details
			</h1>
			<form>
				<div className="text-justify ml-6 mt-6">
					<div className="text-gray-700 text-lg mb-2">Card number</div>
					<input
						type="text"
						name="card_number"
						placeholder="card number"
						value={forms.card_number}
						className="h-11 w-96 text-center"
					/>
				</div>

				<div className=" text-center ">
					<div className="text-justify ml-6 mt-7">
						<div className="text-gray-700 text-lg mb-2">Expiry date</div>

						<select name="exp_month" className="h-11 w-48 text-center">
							<option value="">Month</option>
							<option value="01">01</option>
							<option value="01">02</option>
							<option value="01">03</option>
							<option value="01">04</option>
							<option value="01">05</option>
							<option value="01">06</option>
							<option value="01">07</option>
							<option value="01">08</option>
							<option value="01">09</option>
							<option value="01">10</option>
							<option value="01">11</option>
							<option value="12">12</option>
						</select>

						<select name="exp_YY" className="h-11 w-48 text-center">
							<option value="">Year</option>

							<option value="22">2022</option>
							<option value="23">2023</option>
							<option value="24">2024</option>
						</select>
					</div>
				</div>
				<div className="grid grid-flow-col gap-1 text-center">
					<div className="text-justify ml-6 mt-6">
						<div className="text-gray-700 text-lg mb-2">CVC</div>
						<input
							type="text"
							name="cvc"
							placeholder="***"
							value={forms.card_number}
							className="h-11 w-40 text-center"
						/>
					</div>
					<div className="text-justify ml-2 mt-6">
						<div className="text-gray-700 text-lg mb-2">ZIP code</div>
						<input
							type="text"
							name="code"
							placeholder="zip"
							value={forms.card_number}
							className="h-11 w-40 text-center"
						/>
					</div>
				</div>

				<button
					onClick={payHandler}
					className=" text-justify mt-16 ml-0 h-14 bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold py-2 px-44   mb-5 rounded "
				>
					Pay {subtotal-discountTotal+50}
				</button>
			</form>
		</div>
	);
}

export default CardPayment;
