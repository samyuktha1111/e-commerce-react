import React from 'react';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch} from 'react-redux';
import { EMPTY_CART } from '../Types';
function CardPayment() {
	const dispatch=useDispatch()
	const navigate = useNavigate();
	const initialValues = { card_number: '', cvv: '', code: '' };
	const [forms, setForms] = useState(initialValues);
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);
	const subtotal = useSelector((state) => state.subtotal);
	const discountTotal = useSelector((state) => state.discountTotal);
	const items = useSelector((state) => state.items);
	const carts = JSON.parse(localStorage.getItem('carts')) || [];
	const payHandler = (e) => {
		e.preventDefault();

		setFormErrors(validate(forms));
		setIsSubmit(true);
	};
		const handleChange = (e) => {
			const { name, value } = e.target;
			setForms({ ...forms, [name]: value });
		};
		useEffect(() => {
			if (Object.keys(formErrors).length === 0 && isSubmit) {
			navigate('/order');
			carts.push(...items);
			console.log(carts);
			localStorage.setItem('carts', JSON.stringify(carts));
			dispatch({ type: EMPTY_CART });
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [formErrors]);
		const validate = (values) => {
			const errors = {};
			const cardvalidation = /^5[1-5][0-9]{14}$/;
			const cvvvalidation = /^[0-9]{3}$/;
			
			// eslint-disable-next-line no-useless-escape
			
			if (!values.card_number) {
				errors.card_number = '!card number is required';
			} else if (!cardvalidation.test(values.card_number)) {
				errors.card_number = '! must start from 51 through 55 and 16 digits';
			}
			if (!values.cvv) {
				errors.cvv = '!cvv is required';
			} else if (!cvvvalidation.test(values.cvv)) {
				errors.cvv = '!must contain 3 digits and no special char';
			}
		
			

			return errors;
		};
	return (
		<div className="lg:w-max sm:w-fit w-fit  text-justify mx-auto  shadow-lg h-fit mt-32 bg-purple-100">
			<h1 className="text-center  text-gray-500 font-semisolid text-2xl ">
				Card Details
			</h1>
			<form>
				<div className="text-justify  px-6 mt-6">
					<div className="text-gray-700 text-lg mb-2">Card number</div>
					<input
						type="text"
						size="20"
						autoComplete='off'
						name="card_number"
						placeholder="card number"
						value={forms.card_number}
						className="h-11 w-96 text-center"
						onChange={handleChange}
					/>
					<p className="text-red-700 text-sm">{formErrors.card_number}</p>
				</div>

				<div className=" text-center ">
					<div className="text-justify px-6 mt-7">
						<div className="text-gray-700 text-lg mb-2">Expiry date</div>

						<select
							name="exp_month"
							className="h-11 w-48 text-center"
							onChange={handleChange}
						>
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

						<select
							name="exp_YY"
							className="h-11 w-48 text-center"
							onChange={handleChange}
						>
							<option value="">Year</option>

							<option value="22">2022</option>
							<option value="23">2023</option>
							<option value="24">2024</option>
						</select>
					</div>
				</div>
			
					<div className="text-justify px-16 mt-6">
						<div className="text-gray-700 text-lg mb-2">CVV</div>
						<input
							type="text"
							name="cvv"
							placeholder="***"
							value={forms.cvv}
							className="h-11 w-72 text-center"
							onChange={handleChange}
						/>
						<p className="text-red-700 text-sm">{formErrors.cvv}</p>
					</div>
				
			

				<button
					onClick={payHandler}
					className=" text-justify mt-16 ml-4 h-14 bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold py-2 px-44   mb-5 rounded "
				>
					Pay {subtotal - discountTotal + 50}
				</button>
			</form>
		</div>
	);
}

export default CardPayment;
