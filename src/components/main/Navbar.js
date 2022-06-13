import React from 'react';
import { useNavigate } from 'react-router-dom';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const Navbar = () => {
	const user = JSON.parse(localStorage.getItem('login'));
	const person = JSON.parse(localStorage.getItem('login2'));
	const navigate = useNavigate();
	const profileHandler = () => {
		navigate('/profile');
	};

	return (
		<div className="shadow-md w-full fixed top-0 ">
			<div className=" bg-gray-200 py-11 h-24 md:px-10 px-7 text-right">
				{user && !person && (
					<span className="mr-8 text-pink-700 font-bold text-xl ">
						{user.username}
					</span>
				)}
				{!user && (
					<span className="mr-8 text-pink-700 font-bold text-xl ">
						Logged Out
					</span>
				)}
				{person && (
					<span className="mr-8 text-pink-700 font-bold text-xl ">
						{person.username}
					</span>
				)}
				<span className="cursor-pointer">
					<AccountBoxIcon onClick={profileHandler} />
				</span>
			</div>
		</div>
	);
};

export default Navbar;
