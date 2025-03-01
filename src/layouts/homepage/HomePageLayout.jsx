
import { Button, Container, Stack, Card, CardHeader, CardContent, Box } from '@mui/material'
import React from 'react'
import { motion } from "framer-motion";
import HeroImg from '../../assets/images/heroIMG.png'
import HeroBanner from '../../assets/images/state.png'
import cat from '../../assets/images/cat.jpg'
import cat2 from '../../assets/images/cat2.jpg'
import cat3 from '../../assets/images/cat3.jpg'
import cat4 from '../../assets/images/cat4.jpg'
import city from '../../assets/images/city.jpg'
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { FaBars, FaCreditCard, FaExchangeAlt, FaPiggyBank, FaTimes } from "react-icons/fa";
import { TransferWithinAStation } from '@mui/icons-material';
import AOS from 'aos';
import 'aos/dist/aos.css';

const HomePageLayout = () => {
    AOS.init();
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
                <div className="text-center md:text-left max-w-2xl  space-y-6" >
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
                        Your Trusted Digital Banking Partner
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
                        src={HeroBanner}
                        alt="Hero"
                        className="rounded-3xl w-[50px] md:w-[100px] md:h-[100px] bottom-64 md:top-40 right-20  md:right-[10rem]  z-20  absolute animate-spin  duration-1000 "
                    />
                    <img
                        src={HeroImg}
                        alt="Hero"
                        className="rounded-3xl  w-[500px] md:w-[1200px]  relative z-10"
                    />
                </motion.div>
            </section>
            <section className='py-16 flex flex-col items-center justify-center bg-green-50'>
                <div>
                    <h1 className="text-4xl text-lime-900 font-extrabold">
                        About Us
                    </h1>
                </div>
                <div className="container px-3 mx-auto py-12 tracking-wider text-center" data-aos="flip-down">
                    Nexas Bank is a forward-thinking financial institution dedicated to redefining banking through innovation, security, and customer-centric services. With a strong commitment to excellence, we provide individuals and businesses with cutting-edge financial solutions tailored to their needs.

                    At Nexas Bank, we prioritize convenience, security, and accessibility, ensuring that every transaction is seamless and stress-free. Whether you are managing personal finances, making international transfers, or handling business transactions, our robust digital banking platform offers a fast, secure, and efficient experience.
                </div>
                <div>
                    <h1 className="text-4xl text-lime-900 font-extrabold">
                        Why Choose Nexas Bank?
                    </h1>
                </div>
                <div className="container px-3 mx-auto py-12 grid grid-cols-1 md:grid-cols-3 gap-6" data-aos="flip-down">
                    <Card className="p-6 shadow-lg text-center hover:border-solid hover:border-2 hover:border-green-500 transition-all ease-in-out duration-300 ">

                        <div className="text-lime-600 text-4xl mb-4"><FaExchangeAlt className='text-9xl m-auto' /></div>
                        <CardHeader className="text-xl font-semibold">Money Transfer</CardHeader>
                        <CardContent><p className='font-bold text-green-800'>Seamless and secure money transfers with Nexas Bank.</p>
                            <ul className='font-light text-sm text-left list-none flex flex-col gap-2 mt-2'>
                                <li>Instantly send and receive money worldwide with zero hidden fees.</li>
                                <li>Enjoy real-time transaction tracking and instant notifications.</li>
                                <li>Multi-currency support for seamless international transactions.</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="p-6  shadow-lg text-center hover:border-solid hover:border-2 hover:border-green-500 transition-all ease-in-out duration-300">
                        <div className="text-lime-600 text-4xl mb-4"><FaPiggyBank className='text-9xl m-auto' /></div>
                        <CardHeader className="text-xl font-semibold">Savings</CardHeader>
                        <CardContent><p className='font-bold text-green-800'> Savings & Investments</p>
                            <ul className='font-light text-sm text-left list-none flex flex-col gap-2 mt-2'>
                                <li>Earn competitive interest rates on your savings accounts.

                                </li>
                                <li>Access tailored investment plans to grow your wealth securely.</li>
                                <li>Automate your savings with smart budgeting tools</li>
                            </ul>

                        </CardContent>
                    </Card>

                    <Card className="p-6 shadow-lg text-center hover:border-solid hover:border-2 hover:border-green-500 transition-all ease-in-out duration-300">
                        <div className="text-lime-600 text-4xl mb-4"><FaCreditCard className='text-9xl m-auto' /></div>
                        <CardHeader className="text-xl font-semibold"><p className='font-bold text-green-800'>Credit & Loan Services</p></CardHeader>
                        <CardContent>

                            <ul className='font-light text-sm text-left list-none flex flex-col gap-2 mt-2'>
                                <li>Get instant access to credit with our hassle-free application process.


                                </li>
                                <li>Choose from a range of credit cards with cashback and rewards.</li>
                                <li>
                                    Flexible loan options with low-interest rates and customized repayment plans.</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                <div data-aos="flip-down">
                    <div className='text-center'>
                        <h1 className="text-4xl m-auto text-lime-900 font-extrabold">
                            Our Core Services
                        </h1>
                    </div>
                    <Container>
                        <div className="container px-3 mx-auto py-12 grid grid-cols-1 md:grid-cols-3 gap-6" data-aos="fade-up">
                            <Card className="p-6 shadow-lg text-center hover:shadow-2xl transition-all ease-in-out duration-300">
                                <img src={cat} alt="Service 1" className="w-full h-48 object-cover mb-4 rounded-lg" />
                                <CardHeader className="text-2xl font-bold mb-2">Investment Plans</CardHeader>
                                <CardContent>Explore our diverse investment plans to grow your wealth.</CardContent>
                                <Button variant='contained' className='bg-green-700 text-white'>Learn More</Button>
                            </Card>

                            <Card className="p-6 shadow-lg text-center hover:shadow-2xl transition-all ease-in-out duration-300">
                                <img src={cat2} alt="Service 2" className="w-full h-48 object-cover mb-4 rounded-lg" />
                                <CardHeader className="text-2xl font-bold mb-2">Retirement Accounts</CardHeader>
                                <CardContent>Secure your future with our retirement savings options.</CardContent>
                                <Button variant='contained' className='bg-green-700 text-white'>Learn More</Button>
                            </Card>

                            <Card className="p-6 shadow-lg text-center hover:shadow-2xl transition-all ease-in-out duration-300">
                                <img src={cat3} alt="Service 3" className="w-full h-48 object-cover mb-4 rounded-lg" />
                                <CardHeader className="text-2xl font-bold mb-2">Insurance Services</CardHeader>
                                <CardContent>Protect yourself and your loved ones with our insurance plans.</CardContent>
                                <Button variant='contained' className='bg-green-700 text-white'>Learn More</Button>
                            </Card>
                        </div>
                    </Container>
                </div>
                <div
                    className="bg-no-repeat bg-center bg-cover h-[200px] flex flex-col justify-center items-center text-center p-4"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${city})`,
                    }}
                    data-aos="fade-up"
                >
                    <h1 className="font-black text-5xl text-white "> Get Started Today!</h1>
                    <p className="text-white">
                        Join the thousands of satisfied customers who trust Nexas Bank for their banking needs. Sign up now and experience the future of digital banking.
                    </p>
                    <Button variant='contained' size="large" className='text-white'>
                        SIGN UP NOW
                    </Button>
                </div>

            </section >
        </section >
    )
}

export default HomePageLayout
