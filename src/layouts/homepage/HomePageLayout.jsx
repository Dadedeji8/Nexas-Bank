
import { Button, Container, Stack, Card, p, CardContent, Box, Input, Typography, TextField, AccordionSummary, AccordionDetails, Accordion, Grid } from '@mui/material'
import React from 'react'
import { color, motion } from "framer-motion";
import HeroImg from '../../assets/images/heroIMG.png'
import HeroBanner from '../../assets/images/state.png'
import cat from '../../assets/images/cat.jpg'
import cat2 from '../../assets/images/cat2.jpg'
import cat3 from '../../assets/images/cat3.jpg'
import cat4 from '../../assets/images/cat4.jpg'
import man from '../../assets/images/man.jpg'
import woman from '../../assets/images/woman.jpg'
import city from '../../assets/images/city.jpg'
import { ArrowRight, } from "lucide-react";
import { useState } from "react";
import { FaBars, FaCreditCard, FaExchangeAlt, FaFacebook, FaInstagram, FaLinkedin, FaPiggyBank, FaTimes, FaTwitter } from "react-icons/fa";
import { ExpandMore, TransferWithinAStation } from '@mui/icons-material';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Carousel from 'react-material-ui-carousel';
import { Avatar } from '@mui/material';
import MDInput from 'components/MDInput';
import HomePageNavBar from './components/HomePageNavBar';


const HomePageLayout = () => {
    const [readmore, setReadmore] = useState(false)
    const testimonials = [
        {
            name: 'John Doe',
            image: 'https://randomuser.me/api/portraits/men/32.jpg',
            review: ' Nexas Bank has completely transformed my banking experience. Fast, secure, and easy to use!'
        },
        {
            name: 'Jane Smith',
            image: 'https://randomuser.me/api/portraits/women/44.jpg',
            review: 'Amazing customer support and seamless transactions. Highly recommended!'
        },
        {
            name: 'Michael Johnson',
            image: 'https://randomuser.me/api/portraits/men/50.jpg',
            review: 'The best digital banking experience I have ever had. Efficient and trustworthy!'
        }
    ];

    const faqs = [
        {
            question: 'How secure is Nexas Bank?',
            answer: 'We use top-tier encryption and security protocols to ensure your transactions and data remain safe.'
        },
        {
            question: 'What services does Nexas Bank offer?',
            answer: 'We provide online banking, quick transfers, savings accounts, loan options, and more.'
        },
        {
            question: 'How can I contact customer support?',
            answer: 'You can reach out via our 24/7 support chat or email us at support@nexasbank.com.'
        },
        {
            question: 'How do I open an account?',
            answer: 'You can open an account online by visiting our website and following the step-by-step registration process.'
        },
        {
            question: 'Are there any hidden fees?',
            answer: 'No, we pride ourselves on transparency. All our fees are clearly outlined on our pricing page.'
        },
        {
            question: 'Can I apply for a loan through Nexas Bank?',
            answer: 'Yes, we offer various loan options. Check our loans section for eligibility and application details.'
        },
        {
            question: 'Does Nexas Bank offer business accounts?',
            answer: 'Yes, we offer business accounts with tailored features to help you manage your finances effectively.'
        },
        {
            question: 'What happens if I forget my password?',
            answer: 'You can reset your password by clicking on the “Forgot Password” link on the login page.'
        },
        {
            question: 'How long does it take for a transaction to process?',
            answer: 'Most transactions are processed instantly, but some may take up to 24 hours depending on bank policies.'
        },
        {
            question: 'Can I access Nexas Bank internationally?',
            answer: 'Yes, you can access your Nexas Bank account from anywhere in the world as long as you have an internet connection.'
        }
    ];


    AOS.init();

    return (
        <section className='w-full overflow-x-hidden'>
            <HomePageNavBar />
            <section className="md:h-[80dvh] hero-section overflow-y-hidden w-full">
                <section className='flex flex-col md:flex-row items-center   justify-between px-8 md:px-20 w-full pt-24  max-w-[1200px] m-auto '>
                    <div className="text-center md:text-left max-w-2xl  space-y-6" >
                        <motion.h1
                            className="text-5xl md:text-5xl lg:text-7xl font-extrabold text-gray-200 leading-tight"
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
                        className="w-full   md:w-1/2 flex justify-center items-end h-full  flex-1 mt-12 md:mt-0"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <img
                            src={HeroBanner}
                            alt="Hero"
                            className="rounded-3xl w-[50px] md:w-[100px] md:h-[100px] bottom-64 md:top-40 right-20  md:right-[10rem]  z-20  relative animate-spin  duration-1000 "
                        />
                        <img
                            src={HeroImg}
                            alt="Hero"
                            className="rounded-3xl  w-[500px] md:w-[1200px]  relative z-10"
                        />
                    </motion.div>
                </section>
            </section>
            <section className='py-16 flex flex-col items-center justify-center bg-green-50'>
                <div>
                    <h1 className="text-4xl text-lime-900 font-extrabold">
                        About Us
                    </h1>
                </div>
                <div className="container px-3 mx-auto py-12 tracking-wider text-center" data-aos="flip-down">
                    Nexas Bank is a forward-thinking financial institution dedicated to redefining banking through innovation, security, and customer-centric services. With a strong commitment to excellence, we provide individuals and businesses with cutting-edge financial solutions tailored to their needs.
                    {
                        readmore ? 'At Nexas Bank, we prioritize convenience, security, and accessibility, ensuring that every transaction is seamless and stress-free. Whether you are managing personal finances, making international transfers, or handling business transactions, our robust digital banking platform offers a fast, secure, and efficient experience.' : ''}  <button className='underline text-green-500 cursor-pointer' onClick={() => setReadmore(!readmore)}>
                        {readmore ? 'Read Less' : 'Read More'}</button>

                </div>
                <div className='text-center'>
                    <h1 className="text-4xl m-auto text-lime-900 font-extrabold">
                        Our Core Services
                    </h1>
                </div>
                <div className="container max-w-[1000px] text-center m-auto px-3 mx-auto py-12 grid grid-cols-1 md:grid-cols-3 gap-6 items-center justify-center " data-aos="flip-down">
                    <Card className="p-3 m-auto shadow-lg text-center hover:border-solid hover:border-2 hover:border-green-500 transition-all ease-in-out duration-300  w-[300px] h-[350px]">

                        <div className="text-lime-600 text-3xl mb-4"><FaExchangeAlt className='text-9xl m-auto' /></div>

                        <CardContent><p className='font-bold text-green-800'>Secure money transfers </p>
                            <ul className='font-light text-md  list-none flex flex-col gap-2 mt-2 text-center text-sm'>
                                <li>Instantly send and receive money worldwide with zero hidden fees.</li>
                                <li>Enjoy real-time transaction tracking and instant notifications.</li>

                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="p-3 m-auto shadow-lg text-center hover:border-solid hover:border-2 hover:border-green-500 transition-all ease-in-out duration-300 w-[300px] h-[350px]">
                        <div className="text-lime-600 text-4xl mb-4"><FaPiggyBank className='text-9xl m-auto' /></div>

                        <CardContent><p className='font-bold text-green-800'> Savings & Investments</p>
                            <ul className='font-light text-md  text-sm list-none flex flex-col gap-2 mt-2 text-center'>
                                <li>Earn competitive interest rates on your savings accounts.
                                </li>
                                <li>Access tailored investment plans to grow your wealth securely.</li>

                            </ul>

                        </CardContent>
                    </Card>

                    <Card className="p-3 m-auto shadow-lg text-center hover:border-solid hover:border-2 hover:border-green-500 transition-all ease-in-out duration-300 w-[300px] h-[350px]">
                        <div className="text-lime-600 text-3xl mb-4"><FaCreditCard className='text-9xl m-auto' /></div>

                        <CardContent>
                            <p className='font-bold text-green-800'>Credit & Loan Services</p>
                            <ul className='font-light text-md  list-none flex flex-col gap-2 mt-2 text-center text-sm'>
                                <li>
                                    Get instant access to credit with our hassle-free application process.
                                </li>
                                <li>Choose from a range of credit cards with cashback and rewards.</li>

                            </ul>
                        </CardContent>
                    </Card>
                </div>

                <div data-aos="flip-down">

                    <div>
                        <h1 className="text-4xl text-lime-900 font-extrabold text-center">
                            Why Choose Nexas Bank?
                        </h1>
                    </div>
                    <Container>
                        <div className="container px-3 mx-auto py-12 grid grid-cols-1 md:grid-cols-3 gap-6" data-aos="fade-up">
                            <Card className="p-6 shadow-lg text-center hover:shadow-2xl transition-all ease-in-out duration-300">
                                <img src={cat} alt="Service 1" className="w-full h-48 object-cover mb-4 rounded-lg" />
                                <p className="text-2xl text-green-700 font-bold mb-2">Investment Plans</p>
                                <CardContent>Explore our diverse investment plans to grow your wealth.</CardContent>
                                <Button variant='contained' className='bg-green-700 text-white'>Learn More</Button>
                            </Card>

                            <Card className="p-6 shadow-lg text-center hover:shadow-2xl transition-all ease-in-out duration-300">
                                <img src={cat2} alt="Service 2" className="w-full h-48 object-cover mb-4 rounded-lg" />
                                <p className="text-green-700 text-2xl font-bold mb-2">Retirement Accounts</p>
                                <CardContent>Secure your future with our retirement savings options.</CardContent>
                                <Button variant='contained' className='bg-green-700 text-white'>Learn More</Button>
                            </Card>

                            <Card className="p-6 shadow-lg text-center hover:shadow-2xl transition-all ease-in-out duration-300">
                                <img src={cat3} alt="Service 3" className="w-full h-48 object-cover mb-4 rounded-lg" />
                                <p className="text-green-700 text-2xl font-bold mb-2">Insurance Services</p>
                                <CardContent>Protect yourself and your loved ones with our insurance plans.</CardContent>
                                <Button variant='contained' className='bg-green-700 text-white'>Learn More</Button>
                            </Card>
                        </div>
                    </Container>
                </div>
                {/* <section className="w-full flex flex-wrap justify-between items-center gap-4">
                    <div data className='flex-1' data-aos="flip-down">
                        <img src={man} className=' w-full object-contain' alt="" />
                    </div>

                    <section className=' flex-1 md:max-w-80'>
                        <div className=' w-full'>
                            <h1 className="text-6xl max-w-[700px] text-green-600 font-bold " data-aos="fade-in"> The Process Behind Smart Banking Solutions.</h1>
                        </div>
                    </section>
                    <div className='flex-1'>
                        <img src={woman} data-aos="flip-up" data-aos-delay='600' className='object-contain' alt="" />
                        <div className=' w-full'>
                            <h1 className="text-3xl md:text-right px-2 md:pr-3 text-green-800 font-bold " data-aos="fade-in"> The Process Where strategic vision meets transformative solutions. We empower the organizations to achieve excellence and navigate success. Mobile banking experience with</h1>
                        </div>
                    </div>
                </section> */}
                <section className='w-full'>
                    <section className='py-16 text-center'>
                        <h1 className='text-4xl text-lime-900 font-extrabold mb-6'>What Our Customers Say</h1>
                        <Container maxWidth='md'>
                            <Carousel indicators={false} navButtonsAlwaysVisible>
                                {testimonials.map((testimonial, index) => (
                                    <Card key={index} className='p-6 text-center bg-green-50 border border-solid  border-green-700 shadow-lg'>
                                        <Avatar src={testimonial.image} alt={testimonial.name} sx={{ width: 80, height: 80, margin: 'auto' }} />
                                        <p className='text-xl font-semibold mt-4'>&quot;{testimonial.name}</p>
                                        <CardContent className='text-gray-700 italic'>&quot;{testimonial.review}</CardContent>
                                    </Card>
                                ))}
                            </Carousel>
                        </Container>
                    </section>

                </section>
                <div
                    className="bg-no-repeat bg-center bg-cover w-screen min-h-[200px] px-2 py-5 flex flex-col justify-center items-center text-center p-4"
                    style={{
                        backgroundImage: `linear-gradient(rgba(8, 167, 8, 0.4), rgba(8, 167, 8, 0.4)), url(${city})`,
                    }}
                    data-aos="fade-up"
                >

                    <h1 className="font-black text-5xl text-white "> Get Started Today!</h1>
                    <p className="text-white">
                        Join the thousands of satisfied customers who trust Nexas Bank for their banking needs. Sign up now and experience the future of digital banking.
                    </p>
                    <Button variant='contained' size="large" className='text-white bg-green-600 cursor-pointer'>
                        SIGN UP NOW
                    </Button>
                </div>

                <div className='text-center mt-20 mb-10'>
                    <h1 className="text-4xl m-auto text-lime-900 font-extrabold">
                        Contact Us
                    </h1>
                </div>

                <div className='bg-green-800 flex justify-center w-full items-center h-[400px]'>
                    <form className='flex-1 flex flex-col gap-5 px-5 max-w-[600px]'>

                        <input className='text-white rounded-xl border p-3 border-white' placeholder='Name' />
                        <input className='text-white rounded-xl border p-3 border-white' placeholder='Email' />
                        <textarea className='border border-white rounded-xl px-3 text-white' placeholder='leave a message' ></textarea>
                        <button className='border border-white px-4 py-2  border-solid hover:bg-green-800 text-white rounded-xl cursor-pointer'> Send Message</button>
                    </form>
                    {/* <div className="flex-1 hidden md:flex bg-black h-full">

                    </div> */}
                </div>
            </section >
            <section>
                <section className='py-16 bg-green-900 text-white text-center'>
                    <h1 className='text-4xl font-extrabold mb-6'>Frequently Asked Questions</h1>
                    <Container maxWidth="md">
                        <div className="grid md:grid-cols-2 gap-5">
                            {faqs.map((faq, index) => (
                                <div key={index} className="flex flex-col">
                                    <Accordion
                                        sx={{
                                            backgroundColor: "#1B5E20",
                                            color: "white",
                                            marginBottom: 2,
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <AccordionSummary expandIcon={<ExpandMore sx={{ color: "white" }} />}>
                                            <Typography className="font-bold text-gray-50">{faq.question}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography className='text-gray-50 text-left'>{faq.answer}</Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                            ))}
                        </div>
                    </Container>

                </section>

            </section>
            <section>
                <Box component="footer" sx={{ backgroundColor: '#1a4223', color: 'white', py: 6 }}>
                    <Container maxWidth='lg'>
                        <Grid container spacing={4} className='text-white'>
                            <Grid item xs={12} md={3}>
                                <Typography variant='h6' className="text-white" gutterBottom>About Us</Typography>
                                <Typography variant='body2'>Nexas Bank provides secure and innovative banking solutions for individuals and businesses.</Typography>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Typography variant='h6' className="text-white" gutterBottom>Quick Links</Typography>
                                <ul>
                                    <li>Home</li>
                                    <li>About</li>
                                    <li>Services</li>
                                    <li>Contact</li>
                                </ul>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Typography variant='h6' className="text-white" gutterBottom>Resources</Typography>
                                <ul>
                                    <li>FAQ</li>
                                    <li>Terms of Service</li>
                                    <li>Privacy Policy</li>
                                    <li>Help Center</li>
                                </ul>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Typography variant='h6' className="text-white" gutterBottom>Newsletter</Typography>
                                <Typography variant='body2'>Subscribe to our newsletter for the latest updates.</Typography>
                                <Box component='form' sx={{ display: 'flex', mt: 2 }}>
                                    <TextField size='small' placeholder='Your Email' fullWidth sx={{ backgroundColor: 'white', borderRadius: 1 }} />
                                    <Button variant='contained' color='#004AAD' className="text-white" sx={{ ml: 1 }}>Subscribe</Button>
                                </Box>
                            </Grid>
                        </Grid>
                        <Stack direction='row' spacing={2} justifyContent='center' sx={{ mt: 4 }}>
                            <FaFacebook size={24} className='cursor-pointer hover:text-lime-300' />
                            <FaTwitter size={24} className='cursor-pointer hover:text-lime-300' />
                            <FaInstagram size={24} className='cursor-pointer hover:text-lime-300' />
                            <FaLinkedin size={24} className='cursor-pointer hover:text-lime-300' />
                        </Stack>
                        <Typography variant='body2' align='center' sx={{ mt: 4 }} className='text-gray-100'>© 2025 Nexas Bank. All Rights Reserved.</Typography>
                    </Container>
                </Box>
            </section>
        </section >
    )
}

export default HomePageLayout
