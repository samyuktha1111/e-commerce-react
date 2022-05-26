import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import { useNavigate } from 'react-router';

import { LOGIN } from '../Types';



const Loginform = () => {
	const navigate = useNavigate();
	const initialValues = { phonenumber: '', email: '', password: '' };
	const [formValues, setFormValues] = useState(initialValues);
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);
	const [type, setType] = useState('password');

	const dispatch = useDispatch();
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
		console.log(formValues);
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
			dispatch({ type: LOGIN, payload: { formValues } });
			navigate('/user');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formErrors]);
	const validate = (values) => {
		const errors = {};
		const usernamevalidation = /^[A-Za-z0-9]{4,16}$/i;
		const emailvalidation = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}/i;

		// eslint-disable-next-line no-useless-escape
		const passwordvalidation =
			// eslint-disable-next-line no-useless-escape
			/^(?=.*[a-z])(?=.[A-Z])(?=.*[!@#\$%\^&\*])(?=.{8,})/i;
		if (!values.phonenumber) {
			errors.phonenumber = '!phone number is required';
		} else if (!usernamevalidation.test(values.phonenumber)) {
			errors.phonenumber =
				'!phone number must be from 4-16 char and special char are not allowed';
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
				'!The password must have min 1 uppercase,1 lowercase,1 numeric char,1 special char,must be 8 char or longer';
		}
		
		return errors;
	};

	return (
		<div className=" shadow-2xl bg-blue-200 w-1/3 mt-11 border border-blue-700 justify-center h-fit mx-auto">
			<form onSubmit={handleSubmit}>
				<div className="grid grid-flow-row gap-2">
					<h1 className="text-2xl text-gray-700 mt-6">SIGN UP </h1>
					<div className="text-justify ml-11 mt-6">
						<label className="text-lg  ">PhoneNumber</label>

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
					<div className="text-justify ml-11 mt-6">
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
					<div className="text-justify ml-11 mt-6">
						<label className="label1">Password</label>

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
					<br/>
<div className='text-gray-500 text-sm'>By continuing, I agree to the <span className='text-pink-700'>Terms of Use and Privacy Policy</span></div>
					<div>
						<button className="text-justify mt-8 ml-0 h-14 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2 px-52   mb-5 rounded">
							SIGN UP
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};
export default Loginform;
