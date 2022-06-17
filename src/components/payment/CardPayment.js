import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { EMPTY_CART } from '../Types';
import CardDetails from './CardDetails';
const CardPayment = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const items = useSelector((state) => state.items);
	const initialValues = { card_number: '', cvv: '', code: '' };
	const [forms, setForms] = useState(initialValues);
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);
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
			<CardDetails
				handleChange={handleChange}
				forms={forms}
				formErrors={formErrors}
				payHandler={payHandler}
			/>
		</div>
	);
};
export default CardPayment;
