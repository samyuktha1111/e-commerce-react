import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import ResetDetails from './ResetDetails';
const ResetPassword = () => {
	const navigate = useNavigate();
	const initialValues = { email: '', password: '', password1: '' };
	const [formValues, setFormValues] = useState(initialValues);
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);
	const [type, setType] = useState('password');
	const [display, setDisplay] = useState(false);
	const users1 = JSON.parse(localStorage.getItem('users2'));
	console.log(JSON.parse(localStorage.getItem('users2')));
	console.log('ppppp', users1);
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};
	const handleToggle = () => {
		type === 'password' ? setType('text') : setType('password');
	};
	const handleSubmit = (e) => {
		e.preventDefault();

		setFormErrors(validate(formValues));
		setIsSubmit(true);
	};

	useEffect(() => {
		if (Object.keys(formErrors).length === 0 && isSubmit) {
			if (formValues.password === formValues.password1) {
				let data = users1.map((value) => {
					if (value.email === formValues.email) {
						return {
							...value,

							password: formValues.password,
						};
					}

					return value;
				});

				localStorage.setItem('users2', JSON.stringify(data));
				navigate('/user');
			} else {
				setDisplay(true);
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formErrors]);
	const validate = (values) => {
		const errors = {};

		const emailvalidation = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}/i;

		// eslint-disable-next-line no-useless-escape
		const passwordvalidation =
			// eslint-disable-next-line no-useless-escape
			/^(?=.*[a-z])(?=.[A-Z])(?=.*[!@#\$%\^&\*])(?=.{8,})/i;
		const passwordvalidation1 =
			// eslint-disable-next-line no-useless-escape
			/^(?=.*[a-z])(?=.[A-Z])(?=.*[!@#\$%\^&\*])(?=.{8,})/i;
		if (!values.email) {
			errors.email = '!email is required';
		} else if (!emailvalidation.test(values.email)) {
			errors.email = '!The email is not valid';
		}
		if (!values.password) {
			errors.password = '!password is required';
		} else if (!passwordvalidation.test(values.password)) {
			errors.password = '!Not strong enough';
		}
		if (!values.password1) {
			errors.password1 = '!password is required';
		} else if (!passwordvalidation1.test(values.password1)) {
			errors.password1 = '!Not strong enough';
		}
		return errors;
	};

	return (
		<div className=" shadow-2xl bg-white lg:w-fit sm:w-fit w-fit mt-11  justify-center h-fit mx-auto">
			{display && (
				<div className="text-2xl font-bold text-pink-700">
					PASSWORDS DO NOT MATCH!!!!
				</div>
			)}
			<ResetDetails
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				handleToggle={handleToggle}
				type={type}
				formValues={formValues}
				formErrors={formErrors}
			/>
		</div>
	);
};
export default ResetPassword;
