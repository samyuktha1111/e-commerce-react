import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import LoginDetails from './LoginDetails';
const Login = () => {
	const navigate = useNavigate();
	const initialValues = { username: '', password: '' };
	const [display, setDisplay] = useState(false);
	const [formValues, setFormValues] = useState(initialValues);
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);
	const [type, setType] = useState('password');
	const user = JSON.parse(localStorage.getItem('login'));
	const users = JSON.parse(localStorage.getItem('users2'));
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};
	const registerHandler = () => {
		navigate('/login');
	};
	const resetHandler = () => {
		navigate('/reset');
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
			let credentials = false;
			users.forEach((item, index) => {
				if (
					item.username === formValues.username &&
					item.password === formValues.password
				) {
					credentials = true;
				}
			});
			if (credentials) {
				localStorage.setItem('login', JSON.stringify(formValues));
				navigate('/');
			} else {
				setDisplay(true);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formErrors]);
	const validate = (values) => {
		const errors = {};
		const usernamevalidation = /^[A-Za-z0-9]{4,16}$/i;
		// eslint-disable-next-line no-useless-escape
		const passwordvalidation =
			// eslint-disable-next-line no-useless-escape
			/^(?=.*[a-z])(?=.[A-Z])(?=.*[!@#\$%\^&\*])(?=.{8,})/i;
		if (!values.username) {
			errors.username = '!username is required';
		} else if (!usernamevalidation.test(values.username)) {
			errors.username = '!The username must have 4-16 char and no special char';
		}
		if (!values.password) {
			errors.password = '!password is required';
		} else if (!passwordvalidation.test(values.password)) {
			errors.password = '!Not strong enough';
		}
		return errors;
	};

	return (
		<div className=" shadow-2xl bg-white lg:w-fit sm:w-fit w-fit mt-11  justify-center h-fit mx-auto">
			{display && (
				<div className="text-2xl font-bold text-pink-700">
					CREDENTIALS DO NOT MATCH!!!!
				</div>
			)}
			{user && !display && (
				<div className="text-2xl font-bold text-pink-700">
					U ARE ALREADY LOGGED IN!!!!
				</div>
			)}
			<LoginDetails
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				registerHandler={registerHandler}
				resetHandler={resetHandler}
				handleToggle={handleToggle}
				formValues={formValues}
				formErrors={formErrors}
				type={type}
			/>
		</div>
	);
};
export default Login;
