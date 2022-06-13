import { useState, useEffect } from 'react';

import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import { useNavigate } from 'react-router';

const Signup = () => {
	const navigate = useNavigate();
	const initialValues = {
		phonenumber: '',
		username: '',
		email: '',
		password: '',
	};
	const [formValues, setFormValues] = useState(initialValues);
	const [display, setDisplay] = useState(false);
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);
	const [type, setType] = useState('password');
	const users = JSON.parse(localStorage.getItem('users2')) || [];
	const user = JSON.parse(localStorage.getItem('login'));

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
			let alreadypresent = false;
			users.forEach((item, index) => {
				if (
					item.email === formValues.email ||
					item.phonenumber === formValues.phonenumber
				) {
					alreadypresent = true;
				}
			});
			if (!alreadypresent) {
				users.push(formValues);

				console.log(users);
				localStorage.setItem('users2', JSON.stringify(users));

				navigate('/user');
			} else {
				setDisplay(true);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formErrors]);
	const validate = (values) => {
		const errors = {};
		const usernamevalidation = /^[A-Za-z0-9]{4,16}$/i;
		const emailvalidation = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}/i;
		const phonevalidation = /[7-9]\d{9}/;
		// eslint-disable-next-line no-useless-escape
		const passwordvalidation =
			// eslint-disable-next-line no-useless-escape
			/^(?=.*[a-z])(?=.[A-Z])(?=.*[!@#\$%\^&\*])(?=.{8,})/i;
		if (!values.phonenumber) {
			errors.phonenumber = '!phone number is required';
		} else if (!phonevalidation.test(values.phonenumber)) {
			errors.phonenumber = '! invalid phone number';
		}
		if (!values.username) {
			errors.username = '!username is required';
		} else if (!usernamevalidation.test(values.username)) {
			errors.username = '!The username must have 4-16 char and no special char';
		}
		if (!values.email) {
			errors.email = '!email is required';
		} else if (!emailvalidation.test(values.email)) {
			errors.email = '!The email is not valid';
		}
		if (!values.password) {
			errors.password = '!password is required';
		} else if (!passwordvalidation.test(values.password)) {
			errors.password =
				//'!The password must have min 1 uppercase,1 lowercase,1 numeric char,1 special char,must be 8 char or longer';
				'!Not strong enough';
		}

		return errors;
	};

	return (
		<div className=" shadow-2xl bg-blue-200  lg:w-fit md:w-fit sm:w-fit w-fit mt-11 border border-blue-700 justify-center h-fit mx-auto">
			{display && (
				<div className="text-2xl font-bold text-red-700">
					USER ALREADY EXISTS!!!!
				</div>
			)}
			{user && (
				<div className="text-2xl font-bold text-red-700">
					U ARE ALREADY LOGGED IN!!!!
				</div>
			)}
			<form onSubmit={handleSubmit}>
				<div className="grid grid-flow-row gap-2">
					<h1 className="text-2xl text-gray-700 mt-6">SIGN UP </h1>
					<div className="text-justify ml-8 mt-6">
						<label className="text-lg  ">PhoneNumber</label>
						<br />
						<input
							type="text"
							name="phonenumber"
							placeholder="+91 | phone number"
							className="w-96 h-12 pl-4 border-double border-4 border-gray-400"
							value={formValues.phonenumber}
							onChange={handleChange}
						/>
						<p className="text-red-700 text-sm">{formErrors.phonenumber}</p>
					</div>
					<div className="text-justify ml-8 mt-6">
						<label className="text-lg  ">Username</label>
						<br />
						<input
							type="text"
							name="username"
							placeholder="username"
							className="w-96 h-12 pl-4 border-double border-4 border-gray-400"
							value={formValues.username}
							onChange={handleChange}
						/>
						<p className="text-red-700 text-sm">{formErrors.username}</p>
					</div>
					<div className="text-justify ml-8 mt-6">
						<label className="text-lg ">Email</label>
						<br />
						<input
							type="text"
							name="email"
							placeholder="email"
							value={formValues.email}
							className="w-96 h-12 pl-4 border-double border-4 border-gray-400"
							onChange={handleChange}
						/>
						<p className="text-red-700 text-sm">{formErrors.email}</p>
					</div>
					<div className="text-justify ml-8 mt-6">
						<label className="label1">Password</label>
						<br />
						<input
							type={type}
							name="password"
							placeholder="password"
							value={formValues.password}
							className="w-96 h-12 pl-4 border-double border-4 border-gray-400"
							onChange={handleChange}
						/>
						<span className="icon1" onClick={handleToggle}>
							<Icon icon={type === 'password' ? eyeOff : eye} />
						</span>
						<p className="text-red-700 text-sm">{formErrors.password}</p>
					</div>
					<br />
					{!user && (
						<div>
							<div className="text-gray-500 text-sm">
								By continuing, I agree to the
								<span className="text-pink-700">
									Terms of Use and Privacy Policy
								</span>
							</div>
							<div>
								<button className="text-justify mt-8  h-14 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2 px-48   mb-5 rounded">
									SIGN UP
								</button>
							</div>
						</div>
					)}
				</div>
			</form>
		</div>
	);
};
export default Signup;
