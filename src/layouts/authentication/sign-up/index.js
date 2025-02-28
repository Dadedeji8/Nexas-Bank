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
import { Stack } from '@mui/material'
// importing AuthContext
import { useAuth } from 'context/AuthContext'

function Cover() {
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
        navigate('/dashboard'); // Only navigate if login succeeds

      } catch (error) {
        console.error('Error:', error.message);
        setErrorMessage(error.message || 'Error registering user. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };


  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            MAINSTAY BANK
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          {successMessage && <Alert severity="success">{successMessage}</Alert>}
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Full Name"
                variant="standard"
                fullWidth
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                error={!!errors.fullName}
                helperText={errors.fullName}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                variant="standard"
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Username"
                variant="standard"
                fullWidth
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                error={!!errors.username}
                helperText={errors.username}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="number"
                label="Phone Number"
                variant="standard"
                fullWidth
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
              />
            </MDBox>
            <Stack direction={"row"} gap={2}>
              <MDBox mb={2}>
                <MDInput
                  type="number"
                  label="Age"
                  variant="standard"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  error={!!errors.age}
                  helperText={errors.age}
                />
              </MDBox>
              <span className='flex items-center text-sm gap-1'>
                <input
                  type="radio"
                  value="Male"
                  name="gender"
                  checked={formData.gender === 'Male'}
                  onChange={handleInputChange}
                />
                Male
              </span>
              <span className='flex items-center text-sm gap-1'>
                <input
                  type="radio"
                  value="Female"
                  name="gender"
                  checked={formData.gender === 'Female'}
                  onChange={handleInputChange}
                />
                Female
              </span>
            </Stack>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                variant="standard"
                fullWidth
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                error={!!errors.password}
                helperText={errors.password}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Repeat Password"
                variant="standard"
                fullWidth
                name="repeatPassword"
                value={formData.repeatPassword}
                onChange={handleInputChange}
                error={!!errors.repeatPassword}
                helperText={errors.repeatPassword}
              />
            </MDBox>
            <MDBox mt={2} mb={2} className='z-20'>
              <Select
                className='text-sm bg-white'
                options={options}
                value={countryValue}
                placeholder={'Select Country'}
                onChange={changeHandler}
                error={!!errors.country}
                helperText={errors.country}
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: 'pointer', userSelect: 'none', ml: -1 }}
              >
                &nbsp;&nbsp;I agree to the&nbsp;
              </MDTypography>
              <p className='text-sm underline'>
                <a href="#">Terms and Conditions</a>
              </p>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth type="submit" disabled={loading}>
                {loading ? 'Signing Up...' : 'Sign Up'}
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{' '}
                <Link to={'/authentication/sign-in'}>
                  <span className='underline'>
                    Sign In
                  </span>
                </Link>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  )
}

export default Cover