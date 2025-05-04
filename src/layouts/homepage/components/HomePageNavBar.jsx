import { Button } from '@mui/material';
import React, { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HomePageNavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <nav className=" shadow-md px-6 py-4 flex justify-between items-center w-full fixed bg-white z-20 mb-20">
            <div className="text-2xl font-bold text-lime-600">Nexeas Bank</div>

            <div className="hidden md:flex space-x-6">
                <Button variant="border border-solid border-lime-600"><Link to={'/authentication/sign-in'}>Sign In</Link></Button>
                <Button className="bg-lime-600 hover:bg-lime-900 transition-all duration-300 ease-in-out text-white"><Link to={'/authentication/sign-up'}>Sign up</Link></Button>
            </div>

            <div className="md:hidden">
                <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {isOpen && (
                <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 py-4 md:hidden">
                    <Button variant="border border-solid  border-lime-500" className="w-10/12"><Link to={'/authentication/sign-in'}>Sign In</Link></Button>
                    <Button className="bg-lime-600 text-white w-10/12"><Link to={'/authentication/sign-up'}>Sign Up</Link></Button>
                </div>
            )}
        </nav>
    )
}

export default HomePageNavBar
