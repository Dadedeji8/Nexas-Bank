import { useState, useMemo } from 'react'
// react-router-dom components
import { Link, useNavigate } from 'react-router-dom'
// @mui material components
import Card from '@mui/material/Card'
import Checkbox from '@mui/material/Checkbox'
import Alert from '@mui/material/Alert'

// Material Dashboard 2 React components
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'
import MDInput from 'components/MDInput'
import MDButton from 'components/MDButton'

// Authentication layout components
import CoverLayout from 'layouts/authentication/components/CoverLayout'

// Images
import bgImage from 'assets/images/bg-sign-up-cover.jpeg'
// select country
import Select from 'react-select'
import countryList from 'react-select-country-list'
import { Stack, Box, Button, Grid, Typography } from '@mui/material'
// importing AuthContext
import { useAuth } from 'context/AuthContext'
import divider from 'assets/theme/components/divider'
import HomePageNavBar from 'layouts/homepage/components/HomePageNavBar'
import { } from 'lucide-react'
import { Container } from '@mui/material'
import signUpImg from '../../../assets/images/Login.png'
import AOS from 'aos';
import '../../../assets/styles/styles.css'
import { toast } from 'react-toastify'
function Cover() {

  AOS.init();
  const [countryValue, setCountryValue] = useState('')
  const options = useMemo(() => countryList().getData(), [])
  const navigate = useNavigate()

  const { registerUser, login } = useAuth()

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    phoneNumber: '',
    email: '',
    password: '',
    repeatPassword: '',
    gender: '',
    country: '',
    age: '',
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const changeHandler = (value) => {
    setCountryValue(value)
    setFormData({ ...formData, country: value.label })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.fullName) newErrors.fullName = 'Full Name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.password) newErrors.password = 'Password is required'
    if (!formData.username) newErrors.username = 'username is required'
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required'
    if (formData.password !== formData.repeatPassword) newErrors.repeatPassword = 'Passwords do not match'
    if (!formData.gender) newErrors.gender = 'Gender is required'
    if (!formData.country) newErrors.country = 'Country is required'
    if (!formData.age) newErrors.age = 'Age is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    if (validateForm()) {
      const { repeatPassword, ...submitData } = formData; // Exclude repeatPassword

      try {
        const registrationResult = await registerUser(submitData);

        if (!registrationResult.success) {
          throw new Error(registrationResult.error); // Stop execution if registration fails
        }

        console.log('Submitting this data', submitData);

        // Attempt to log in after successful registration
        const loginResult = await login({ email: formData.email, password: formData.password });

        if (!loginResult.success) {
          throw new Error(loginResult.error); // Stop execution if login fails
        }

        setSuccessMessage('Registration successful! Redirecting to dashboard...');
        toast.success('Account created successfully')
        navigate('/dashboard'); // Only navigate if login succeeds

      } catch (error) {
        console.error('Error:', error.error);
        setErrorMessage(error.error || 'Error occured try again later');
        toast.error(error.error || 'Error occured try again later');

      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };


  return (

    // 
    <div className='bg-[#ffffff]'>
      <HomePageNavBar />
      <div className='w-full min-h-[40dvh] md:h-[60dvh] bg-[#085C44] flex-col flex items-center gap-3 justify-center'>
        <div><h1 className='text-3xl md:text-5xl text-white font-black' data-aos="fade-up">Register</h1></div>
        <div className='text-white flex gap-2 text-xl ' data-aos="fade-up" data-aos-easing='ease-out' data-aos-duration='700'>
          <Link><h2>
            Home</h2></Link>|
          <Link><h2 className='text-lime-400'>
            Register</h2></Link>
        </div>

      </div>
      <Box>
        <Container className='py-28 max-w-[1200px] m-auto'>
          <h1 className='text-3xl md:text-5xl text-center max-w-[700px]  m-auto' data-aos="fade-up" data-aos-easing='ease-out' data-aos-duration='700'>
            Open Your Account Today and Enjoy Exclusive Benefits!
          </h1>
          <div className='flex gap-3 w-full mt-10 flex-wrap md:flex-nowrap items-end relative' data-aos="fade-up" data-aos-easing='ease-out' data-aos-duration='700'>
            <div className='md:sticky md:top-20 md:self-start md:h-full'>
              <img src={signUpImg} className='sticky top-20 max-h-screen' />
            </div>
            <div className='flex flex-col bg-[#EDF1EE] w-full rounded-2xl p-10  '>
              <h3 className='font-thin '>
                Sign Up
              </h3>
              <h1 className='font-bold text-[#357965] tracking-wide text-2xl md:text-3xl'>
                Create Account Now
              </h1>
              <div className='flex flex-col gap-1 mt-3'>
                <label className=''>
                  Enter Your Name*
                </label>
                <input type='text' className='py-3 px-4 rounded-xl border border-solid border-gray-300 bg-[#F3F3FF] focus:outline-none focus:border-gray-600' placeholder='Enter Your Name' name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange} />
                <p className='text-red-500 text-xs'>{errors.fullName}</p>
              </div>
              <div className='flex w-full gap-5 flex-col md:flex-row'>
                <div className='flex flex-1 flex-col gap-1 mt-3'>
                  <label className=' '>
                    Enter Your Email*
                  </label>
                  <input type='text' className='py-3 px-4 rounded-xl border border-solid border-gray-300 bg-[#F3F3FF] focus:outline-none focus:border-gray-600' placeholder='Enter Your Email' name="email"
                    value={formData.email}
                    onChange={handleInputChange} />
                  <p className='text-red-500 text-xs'>{errors.email}</p>
                </div>
                <div className='flex flex-1 flex-col gap-1 mt-3'>
                  <label className=''>
                    Enter Your Number*
                  </label>
                  <input type='text' className='py-3 px-4 rounded-xl border border-solid border-gray-300 bg-[#F3F3FF] focus:outline-none focus:border-gray-600' placeholder='Enter Your Number' name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange} />
                  <p className='text-red-500 text-xs'>{errors.phoneNumber}</p>
                </div>
              </div>
              <div className='flex w-full gap-5 flex-col md:flex-row'>
                <div className='flex flex-1 flex-col gap-1 mt-3'>
                  <label className=' '>
                    Enter Your Age*
                  </label>
                  <input type='date' className='py-3 px-4 rounded-xl border border-solid border-gray-300 bg-[#F3F3FF] focus:outline-none focus:border-gray-600' placeholder='Enter Your Age' name="age"
                    value={formData.age}
                    onChange={handleInputChange} />
                  <p className='text-red-500 text-xs'>{errors.age}</p>
                </div>
                <div className='flex flex-1 flex-col gap-1 mt-3'>
                  <label className=' '>
                    Enter Your Username*
                  </label>
                  <input type='text' className='py-3 px-4 rounded-xl border border-solid border-gray-300 bg-[#F3F3FF] focus:outline-none focus:border-gray-600' placeholder='Enter Username' name="username"
                    value={formData.username}
                    onChange={handleInputChange} />
                  <p className='text-red-500 text-xs'>{errors.username}</p>
                </div>
                {/* <div className='flex flex-1 items-center gap-5 mt-3'>
                  <label className=''>
                    Select SEX*
                  </label>
                  <div>
                    <label>Male</label>   <input type='radio' className='' name='gender' value={'male'}

                      onChange={handleInputChange} />
                  </div>
                  <div>
                    <label>Female</label>   <input type='radio' className='' value={'female'} name="gender"

                      onChange={handleInputChange} />
                  </div>
                  <p className='text-red-500 text-xs'>{errors.gender}</p>
                </div> */}
              </div>
              <div className='md:flex gap-3 w-full '>
                <div className='flex-1'>
                  <label className="mt-5">Select Country</label>
                  <Select
                    className="text-sm bg-[#F3F3FF] text-black my-2 rounded-xl p-3 border border-solid border-gray-300"

                    options={options}
                    value={countryValue}
                    placeholder="Select Country"
                    onChange={changeHandler}
                  />
                  {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                </div>
                <div className='flex flex-1 items-center gap-5 mt-3'>
                  <label className=''>
                    Select SEX*
                  </label>
                  <div>
                    <label>Male</label>   <input type='radio' className='' name='gender' value={'male'}

                      onChange={handleInputChange} />
                  </div>
                  <div>
                    <label>Female</label>   <input type='radio' className='' value={'female'} name="gender"

                      onChange={handleInputChange} />
                  </div>
                  <p className='text-red-500 text-xs'>{errors.gender}</p>
                </div>
              </div>

              <div className='flex w-full gap-5 flex-col md:flex-row'>
                <div className='flex flex-1 flex-col gap-1 mt-3'>
                  <label className=''>
                    Enter Your Password*
                  </label>
                  <input type='text' className='py-3 px-4 rounded-xl border border-solid border-gray-300 bg-[#F3F3FF] focus:outline-none focus:border-gray-600' placeholder='Enter Your Password'
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange} />
                  <p className='text-red-500 text-xs'>{errors.password}</p>
                </div>
                <div className='flex flex-1 flex-col gap-1 mt-3'>
                  <label className=''>
                    Comfirm Password*
                  </label>
                  <input type='text' className='py-3 px-4 rounded-xl border border-solid border-gray-300 bg-[#F3F3FF] focus:outline-none focus:border-gray-600' placeholder='Enter Password' name="repeatPassword"
                    value={formData.repeatPassword}
                    onChange={handleInputChange} />
                </div>
              </div>
              <div className='mt-10'>
                <Button size='large' className='bg-[#baff5f] py-5 px-10 text-black' onClick={handleSubmit}>
                  {loading ? 'Loading....' : 'Submit'}
                </Button>
              </div>
              <div>
                <p className='mt-2 text-gray-600 md:text-right text-[14px]'>
                  <Link>Already have an account?</Link>
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Box>
      <Box className='w-full bg-[#1a4223] min-h-[90dvh]'>
        <Container className='py-20 flex flex-col justify-between items='>
          <Grid container spacing={4} className='my-5'>
            <Grid item md={3}>
              <h1 className='font-bold text-white mb-8 text-2xl'>
                Nexus Bank
              </h1>
              <p className='text-[16px] text-white'>
                We provide reliable financial solutions to support your goals with security and personalized service. Your success is our priority.
              </p>
            </Grid>
            <Grid item md={3} className='font-bold text-white'>
              <h1 className='font-bold text-white mb-8'>
                About Us
              </h1>
              <p className='text-[16px]'>
                We provide reliable financial solutions to support your goals with security and personalized service. Your success is our priority.
              </p>
            </Grid>
            <Grid item md={3} className='font-bold text-white'>
              <h1 className='font-bold text-white mb-8'>
                Contact Us
              </h1>
              <p className='text-[16px]'>
                123 the main street Available to everyone ,USA
              </p>
              <p className='text-[16px]'>
                123 the main street Available to everyone ,USA
              </p>
              <p className='text-[16px]'>
                123 the main street Available to everyone ,USA
              </p>
            </Grid>
            <Grid item md={3} className='font-bold text-white'>
              <h1 className='font-bold text-white mb-8'>
                About Us
              </h1>
              <p className='text-[16px]'>
                We provide reliable financial solutions to support your goals with security and personalized service. Your success is our priority.
              </p>
              <div className='flex gap-2'>
                <input className='p-2 border rounded text-xs focus:border-none w-full' placeholder='Your Email address here' />
                <button className='px-3 py-1 bg-white text-black text-xs  rounded'>  Submit</button>
              </div>
            </Grid>
          </Grid>
          <div>
            <hr></hr>
            <Typography variant='body2' align='center' sx={{ mt: 4 }} className='text-white p-5'>© 2025 Nexas Bank. All Rights Reserved.</Typography>
          </div>
        </Container>
      </Box>
    </div>

  )
}

export default Cover