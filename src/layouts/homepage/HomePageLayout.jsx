
import { Button, Container, Stack, Card, CardHeader, CardContent } from '@mui/material'
import React from 'react'
import { motion } from "framer-motion";
import HeroImg from '../../assets/images/heroIMG.png'
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { FaBars, FaCreditCard, FaExchangeAlt, FaPiggyBank, FaTimes } from "react-icons/fa";
import { TransferWithinAStation } from '@mui/icons-material';


const HomePageLayout = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <section className='w-full overflow-x-hidden'>
            <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center w-full">
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
            <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20 w-full pt-24 bg-[#198754]  ">
                <div className="text-center md:text-left max-w-2xl flex-1 space-y-6">
                    <motion.h1
                        className="text-5xl md:text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Revolutionize Your Banking Experience
                    </motion.h1>
                    <motion.p
                        className="text-lg md:text-xl text-gray-200"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        Transform your ideas into stunning digital experiences with modern, responsive web solutions.
                    </motion.p>
                    <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center md:justify-start">
                        <Button className="bg-lime-400 hover:bg-lime-700 text-white px-8 py-3 rounded-xl text-lg flex items-center gap-2 shadow-md">
                            Get Started <ArrowRight size={20} />
                        </Button>
                        <Button className=" border-solid border-2 border-lime-500 hover:bg-gray-400 text-lime-200 px-8 py-3 rounded-xl text-lg ">
                            Know About Us
                        </Button>
                    </div>
                </div>
                <motion.div
                    className="w-full   md:w-1/2 flex justify-center items-end h-full flex-1 mt-12 md:mt-0"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                >
                    <img
                        src={HeroImg}
                        alt="Hero"
                        className="rounded-3xl  w-[500px] md:w-[1200px]  relative z-10"
                    />
                </motion.div>
            </section>
            <section className='py-20 flex items-center justify-center bg-green-200'>
                <div className="container px-3 mx-auto py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="p-6 shadow-lg text-center">
                        <div className="text-lime-600 text-4xl mb-4"><FaExchangeAlt className='text-9xl m-auto' /></div>
                        <CardHeader className="text-xl font-semibold">Money Transfer</CardHeader>
                        <CardContent>Seamless and secure money transfers with Nexas Bank.</CardContent>
                    </Card>

                    <Card className="p-6  shadow-lg text-center">
                        <div className="text-lime-600 text-4xl mb-4"><FaPiggyBank className='text-9xl m-auto' /></div>
                        <CardHeader className="text-xl font-semibold">Savings</CardHeader>
                        <CardContent>Grow your savings effortlessly with our high-interest accounts.</CardContent>
                    </Card>

                    <Card className="p-6 shadow-lg text-center">
                        <div className="text-lime-600 text-4xl mb-4"><FaCreditCard className='text-9xl m-auto' /></div>
                        <CardHeader className="text-xl font-semibold">Credit Services</CardHeader>
                        <CardContent>Enjoy flexible credit options tailored to your needs.</CardContent>
                    </Card>
                </div>

            </section>
        </section>
    )
}

export default HomePageLayout
