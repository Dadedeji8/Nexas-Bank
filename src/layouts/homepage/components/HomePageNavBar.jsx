import { Button } from '@mui/material';
import React, { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa';

const HomePageNavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <nav className=" shadow-md px-6 py-4 flex justify-between items-center w-full fixed bg-white z-20 mb-20">
            <div className="text-2xl font-bold text-lime-600">Nexas Bank</div>

            <div className="hidden md:flex space-x-6">
                <Button variant="border border-solid border-lime-600">Login</Button>
                <Button className="bg-lime-600 text-white">Sign Up</Button>
            </div>

            <div className="md:hidden">
                <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {isOpen && (
                <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 py-4 md:hidden">
                    <Button variant="border border-solid  border-lime-500" className="w-10/12">Login</Button>
                    <Button className="bg-lime-600 text-white w-10/12">Sign Up</Button>
                </div>
            )}
        </nav>
    )
}

export default HomePageNavBar
