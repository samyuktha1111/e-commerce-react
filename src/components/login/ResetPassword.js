import { useState, useEffect } from 'react';
import { LOGIN } from '../Types';
import { useDispatch } from 'react-redux';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import { useNavigate } from 'react-router';

const ResetPassword = () => {
    console.log(JSON.parse(localStorage.getItem('users')))
	const navigate = useNavigate();
	const [display, setDisplay] = useState(false);
	const dispatch = useDispatch();
	const users = JSON.parse(localStorage.getItem('users'));
console.log(users)
	const initialValues = {email: '', password: '' };
	const [formValues, setFormValues] = useState(initialValues);
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);
	const [type, setType] = useState('password');

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};
	const registerHandler = () => {
		navigate('/login');
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
					item.email === formValues.email 
					
				) {
					item.password=formValues.password
                    
				}
			});
			if (credentials) {
				dispatch({ type: LOGIN, payload: { formValues } });
				navigate('/');
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
		<div className=" shadow-2xl bg-white lg:w-fit sm:w-fit w-fit mt-11  justify-center h-fit mx-auto">
			{display && (
				<div className="text-2xl font-bold text-pink-700">
					CREDENTIALS DO NOT MATCH!!!!
				</div>
			)}
			<form onSubmit={handleSubmit}>
				<div className="grid grid-flow-row gap-0 ">
					<h1 className="text-2xl text-pink-600 font-bold mt-6 text-center">
						LOGIN{' '}
					</h1>
					<div>
						<img
							src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQToInL47w88tsNFOBiRZLf1ydUfRQYtMXoMw&usqp=CAU"
							alt="shampoo"
							className="max-w-xs h-56 pl-28 "
						/>
						<p className="text-2xl text-black font-bold italic">THE BRAND</p>
					</div>
					<div className="text-justify ml-6 ">
						<label className="text-lg ">Email</label>
						<br />
						<input
							type="text"
							name="email"
							placeholder="name"
							value={formValues.email}
							className="w-96 h-12 pl-4 border border-gray-400"
							onChange={handleChange}
						/>
						<p className="text-red-700 text-sm">{formErrors.email}</p>
					</div>
					<div className="text-justify ml-6 mt-6">
						<label className="label1">Password</label>
						<br />
						<input
							type={type}
							name="password"
							placeholder="password"
							value={formValues.password}
							className="w-96 h-12 pl-4 border border-gray-400"
							onChange={handleChange}
						/>
						<span className="icon1" onClick={handleToggle}>
							<Icon icon={type === 'password' ? eyeOff : eye} />
						</span>
						<p className="text-red-700 text-sm">{formErrors.password}</p>
					</div>
					<br />
					<div className="text-gray-500 text-sm text-left ml-8 ">
						New member ?
						<span
							onClick={registerHandler}
							className="text-pink-700 cursor-pointer underline underline-offset-1"
						>
							Register
						</span>
					</div>

					<div>
						<button className="text-justify mt-8  h-14 bg-pink-600 hover:bg-pink-700 text-white text-sm font-bold py-2 px-48   mb-5 rounded">
							RESET
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};
export default ResetPassword;
