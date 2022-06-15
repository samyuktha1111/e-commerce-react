import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
const ProfileUpdate = () => {
	const navigate = useNavigate();
	const person = JSON.parse(localStorage.getItem('login'));
	const users1 = JSON.parse(localStorage.getItem('users2'));
	const initialValues = { email: '', username: '', phonenumber: '' };
	const [formValues, setFormValues] = useState(initialValues);
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);
	console.log('ppppp', users1);
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		setFormErrors(validate(formValues));
		setIsSubmit(true);
	};
const changeHandler=()=>
{
	navigate('/reset')
}
	useEffect(() => {
		if (Object.keys(formErrors).length === 0 && isSubmit) {
			let data = users1.map((value) => {
				if (person.username === value.username) {
					return {
						...value,
						email: formValues.email,
						username: formValues.username,
						phonenumber: formValues.phonenumber,
					};
				}

				return value;
			});
			localStorage.setItem('login2',JSON.stringify(formValues))
			localStorage.setItem('users2', JSON.stringify(data));
			navigate('/profile');
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formErrors]);
	const validate = (values) => {
		const errors = {};
		const usernamevalidation = /^[A-Za-z0-9]{4,16}$/i;
		const emailvalidation = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}/i;
		const phonevalidation = /[7-9]\d{9}/;
		// eslint-disable-next-line no-useless-escape

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

		return errors;
	};

	return (
		<div className=" shadow-2xl bg-white lg:w-fit sm:w-fit w-fit mt-11  justify-center h-fit mx-auto">
			<form onSubmit={handleSubmit}>
				<div className="grid grid-flow-row gap-4 ">
					<h1 className="text-2xl text-pink-600 font-bold mt-6 text-center">
						UPDATE
					</h1>

					<div className="text-justify ml-6 ">
						<label className="text-lg ">Update Email</label>
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
						<label className="label1">Update username</label>
						<br />
						<input
							type="text"
							name="username"
							placeholder="new username"
							value={formValues.username}
							className="w-96 h-12 pl-4 border border-gray-400"
							onChange={handleChange}
						/>

						<p className="text-red-700 text-sm">{formErrors.username}</p>
					</div>

					<div className="text-justify ml-6 mt-6">
						<label className="label1">Update phonenumber</label>
						<br />
						<input
							type="text"
							name="phonenumber"
							placeholder="new phonenumber"
							value={formValues.phonenumber}
							className="w-96 h-12 pl-4 border border-gray-400"
							onChange={handleChange}
						/>

						<p className="text-red-700 text-sm">{formErrors.phonenumber}</p>
					</div>
				

					<div>
						<button className="text-justify mt-2  h-14 bg-pink-600 hover:bg-pink-700 text-white text-sm font-bold py-2 px-48   mb-5 rounded">
							UPDATE
						</button>
					</div>
                    <div className='underline text-pink-700 mb-6 cursor-pointer' onClick={changeHandler}>Change password ?</div>
				</div>
			</form>
		</div>
	);
};
export default ProfileUpdate;
