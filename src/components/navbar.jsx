import React from 'react';
import { useNavigate } from 'react-router';
import { IoPerson } from "react-icons/io5";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    console.log("User logged out");
    navigate("/login");
  };

  return (
        <div className="navbar bg-accent-content shadow-sm">
        <div className="navbar-start flex flex-grow">
            <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-accent-content border-[1px] border-gray-300 rounded-box z-1 mt-3 w-52 p-2 shadow-lg">
                <li><a onClick={()=> navigate('/')}>Home</a></li>
                <li><a onClick={()=> navigate('/guide')}>File Manager</a></li>
            </ul>
            </div>
            <div>
                <img src='/assets/logo.png' className='w-12 h-12'></img>
            </div>
            <a className="btn btn-ghost text-xl px-0">MGHS</a>
        </div>
        <div className="navbar-end hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
            <li><a onClick={()=> navigate('/')}>Home</a></li>
            <li><a onClick={()=> navigate('/guide')}>File Manager</a></li>
            </ul>
        </div>
        <div className="dropdown dropdown-end">
          
                <div tabIndex={0} role="button" className="flex cursor-pointer w-10 rounded-full justify-center place-content-center align-items-center text-center text-accent">
                    <IoPerson />
                </div>
            
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-accent-content border-[1px] border-gray-300 rounded-box z-1 mt-3 w-52 p-2 shadow-lg"
            >
                <li>
                <a className="justify-between" onClick={()=> navigate('/profile')}>Profile</a>
                </li>
                <li>
                <button onClick={handleLogout}>Logout</button>
                </li>
            </ul>
        </div>
        </div>
  );
}

export default Navbar;
