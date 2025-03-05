import { useEffect, useState } from 'react'
// react-router-dom components
import { Link, useNavigate } from 'react-router-dom'
// @mui material components
import Card from '@mui/material/Card'
import Switch from '@mui/material/Switch'
import { Stack, Box, Button, Grid, Typography } from '@mui/material'
import MuiLink from '@mui/material/Link'
import Alert from '@mui/material/Alert'
// @mui icons
import FacebookIcon from '@mui/icons-material/Facebook'
import GitHubIcon from '@mui/icons-material/GitHub'
import GoogleIcon from '@mui/icons-material/Google'
// Material Dashboard 2 React components
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'
import MDInput from 'components/MDInput'
import MDButton from 'components/MDButton'
// Authentication layout components
import BasicLayout from 'layouts/authentication/components/BasicLayout'
import { useAuth } from 'context/AuthContext'
import loginHero from '../../../assets/images/loginHero.png'
// Images
import bgImage from 'assets/images/bg-sign-in-basic.jpeg'
import { Container } from '@mui/material'
import HomePageNavBar from 'layouts/homepage/components/HomePageNavBar'
import AOS from 'aos';
function Basic() {
  const [rememberMe, setRememberMe] = useState(false)
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    console.log(userCredentials)
  }, [userCredentials])

  const validateInput = () => {
    const newErrors = {}
    if (!userCredentials.email) newErrors.email = 'Email is required'
    if (!userCredentials.password) newErrors.password = 'Password is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    if (validateInput()) {
      try {
        const result = await login(userCredentials); // Get login result

        if (result.success) {
          setSuccessMessage('Login successful! Redirecting to dashboard...');
          navigate('/dashboard'); // Navigate only on success
        } else {
          setErrorMessage(result.error); // Display API error message
        }
      } catch (error) {
        console.log('Failed to log in:', error);
        setErrorMessage('An unexpected error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserCredentials({ ...userCredentials, [name]: value })
  }

  const handleSetRememberMe = () => setRememberMe(!rememberMe)
  AOS.init();
  return (
    <div className='bg-[#ffffff]'>
      <HomePageNavBar />
      <div className='w-full min-h-[40dvh] md:h-[60dvh] bg-[#085C44] flex-col flex items-center gap-3 justify-center'>
        <div><h1 className='text-3xl md:text-5xl text-white font-black' data-aos="fade-up">Login</h1></div>
        <div className='text-white flex gap-2 text-xl ' data-aos="fade-up" data-aos-easing='ease-out' data-aos-duration='700'>
          <Link to={'/'}><h2>
            Home</h2></Link>|
          <Link><h2 className='text-lime-400'>
            Login</h2></Link>
        </div>

      </div>
      <Box>
        <Container className='py-28 max-w-[1200px] m-auto'>
          <h1 className='text-3xl md:text-5xl text-center max-w-[700px]  m-auto' data-aos="fade-up" data-aos-easing='ease-out' data-aos-duration='700'>
            Access Your Account and Experience Tailored Banking
          </h1>
          <div className='flex flex-col md:flex-row flex-wrap  gap-3 w-full mt-10  md:flex-nowrap items-end h-full' data-aos="fade-up" data-aos-easing='ease-out' data-aos-duration='700'>
            <div className=' sticky flex-1'>
              <img src={loginHero} className='h-full' />
            </div>
            <div className='flex flex-1 flex-col bg-[#EDF1EE] w-full rounded-2xl p-10  '>
              <h3 className='font-thin '>
                Sign In
              </h3>
              <h1 className='font-bold text-[#357965] tracking-wide text-2xl md:text-3xl'>
                Login Now
              </h1>
              <div className='flex flex-col gap-1 mt-3'>
                <label className=''>
                  Enter Your Email*
                </label>
                <input type='text' className='py-3 px-4 rounded-xl border border-solid border-gray-300 bg-[#F3F3FF] focus:outline-none focus:border-gray-600' placeholder='Enter Your Email' name="email"
                  value={userCredentials.email}
                  onChange={handleInputChange} />
              </div>

              <div className='flex flex-1 flex-col gap-1 mt-3'>
                <label className=' '>
                  Enter Your Password*
                </label>
                <input type='text' className='py-3 px-4 rounded-xl border border-solid border-gray-300 bg-[#F3F3FF] focus:outline-none focus:border-gray-600' placeholder='Enter Your Password' name="password"
                  value={userCredentials.password}
                  onChange={handleInputChange} />
              </div>

              <div className='mt-10'>
                <Button size='large' className='bg-[#baff5f] py-5 px-10 text-black' onClick={handleSubmit}>
                  Submit
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
      <Box className='w-full bg-[#F7FFD9] min-h-[90dvh]'>
        <Container className='py-20 flex flex-col justify-between items='>
          <Grid container spacing={4} className='my-5'>
            <Grid item md={3}>
              <h1 className='font-bold text-green-700 mb-8 text-2xl'>
                Nexus Bank
              </h1>
              <p className='text-[16px]'>
                We provide reliable financial solutions to support your goals with security and personalized service. Your success is our priority.
              </p>
            </Grid>
            <Grid item md={3} className='font-bold text-green-900'>
              <h1 className='font-bold text-green-700 mb-8'>
                About Us
              </h1>
              <p className='text-[16px]'>
                We provide reliable financial solutions to support your goals with security and personalized service. Your success is our priority.
              </p>
            </Grid>
            <Grid item md={3} className='font-bold text-green-900'>
              <h1 className='font-bold text-green-700 mb-8'>
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
            <Grid item md={3} className='font-bold text-green-900'>
              <h1 className='font-bold text-green-700 mb-8'>
                About Us
              </h1>
              <p className='text-[16px]'>
                We provide reliable financial solutions to support your goals with security and personalized service. Your success is our priority.
              </p>
              <div className='flex gap-2'>
                <input className='p-2 border rounded text-sm focus:border-none w-full' placeholder='Your Email address here' />
                <button className='px-3 py-1 bg-green-600 text-white rounded'>  Submit</button>
              </div>
            </Grid>
          </Grid>
          <div>
            <hr></hr>
            <Typography variant='body2' align='center' sx={{ mt: 4 }} className='text-gray-900 p-5'>© 2025 Nexas Bank. All Rights Reserved.</Typography>
          </div>
        </Container>
      </Box>
    </div>

  )
}

export default Basic