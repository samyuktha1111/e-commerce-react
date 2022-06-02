import { useState, useEffect } from 'react';

import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import { useNavigate } from 'react-router';

const ResetPassword = () => {
    console.log(JSON.parse(localStorage.getItem('users')))
	const navigate = useNavigate();
const[display,setDisplay]=useState(false)
	const initialValues = {email: '', password: '' ,password1:''};
	const [formValues, setFormValues] = useState(initialValues);
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);
	const [type, setType] = useState('password');


const users1 = JSON.parse(localStorage.getItem('users2'));
console.log("ppppp",users1)
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
		if (Object.keys(formErrors).length === 0 && isSubmit ) {
			
			
if( formValues.password===formValues.password1)
{
   let data = users1.map((value) => {
       
         if (value.email === formValues.email ) {
             
              return {
                   ...value,
                  
                   password: formValues.password
              }
         }
         
         return value;
    })
	
    localStorage.setItem('users2', JSON.stringify(data));
	navigate('/user')
}
else{
	setDisplay(true)
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
			errors.password =
				'!Not strong enough';
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
			<form onSubmit={handleSubmit}>
				<div className="grid grid-flow-row gap-4 ">
					<h1 className="text-2xl text-pink-600 font-bold mt-6 text-center">
						CHANGE YOUR PASSWORD
					</h1>

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
						<label className="label1">New Password</label>
						<br />
						<input
							type={type}
							name="password"
							placeholder="new password"
							value={formValues.password}
							className="w-96 h-12 pl-4 border border-gray-400"
							onChange={handleChange}
						/>
						<span className="icon1" onClick={handleToggle}>
							<Icon icon={type === 'password' ? eyeOff : eye} />
						</span>
						<p className="text-red-700 text-sm">{formErrors.password}</p>
					</div>

					<div className="text-justify ml-6 mt-6">
						<label className="label1">Confirm Password</label>
						<br />
						<input
							type={type}
							name="password1"
							placeholder="confirm password"
							value={formValues.password1}
							className="w-96 h-12 pl-4 border border-gray-400"
							onChange={handleChange}
						/>
						<span className="icon1" onClick={handleToggle}>
							<Icon icon={type === 'password' ? eyeOff : eye} />
						</span>
						<p className="text-red-700 text-sm">{formErrors.password1}</p>
					</div>
					<br />

					<div>
						<button className="text-justify mt-2  h-14 bg-pink-600 hover:bg-pink-700 text-white text-sm font-bold py-2 px-48   mb-5 rounded">
							RESET
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};
export default ResetPassword;
