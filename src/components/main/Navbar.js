import React from 'react'
import { useSelector } from 'react-redux';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
const Navbar = () => {
   const user=useSelector((state)=>state.user)
   console.log(user)
  return (
		<div className="shadow-md w-full fixed top-0 ">
			<div className=" bg-gray-200 py-11 h-24 md:px-10 px-7 text-right">
				<span className='mr-8 text-pink-700 font-bold text-xl '>{user.username}</span>
				<span className='cursor-pointer'><AccountBoxIcon/></span>
			</div>
		</div>
	);
}

export default Navbar