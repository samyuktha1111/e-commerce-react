import React from 'react'

import AccountBoxIcon from '@mui/icons-material/AccountBox';

const Navbar = () => {
	
   const user = JSON.parse(localStorage.getItem('login')) 
  
 console.log(user)
   
  return (
		<div className="shadow-md w-full fixed top-0 ">
			<div className=" bg-gray-200 py-11 h-24 md:px-10 px-7 text-right">
				{user ? (
					<span className="mr-8 text-pink-700 font-bold text-xl ">
						{user.username}
					</span>
				) : (
					<span className="mr-8 text-pink-700 font-bold text-xl ">
						Logged Out
					</span>
				)}
				<span className="cursor-pointer">
					<AccountBoxIcon />
				</span>
			</div>
		</div>
	);
}

export default Navbar