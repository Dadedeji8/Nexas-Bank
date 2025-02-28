import { useEffect, useState } from 'react'
// react-router-dom components
import { Link, useNavigate } from 'react-router-dom'
// @mui material components
import Card from '@mui/material/Card'
import Switch from '@mui/material/Switch'
import Grid from '@mui/material/Grid'
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
// Images
import bgImage from 'assets/images/bg-sign-in-basic.jpeg'

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

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          {successMessage && <Alert severity="success">{successMessage}</Alert>}
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                fullWidth
                name="email"
                value={userCredentials.email}
                onChange={handleInputChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                fullWidth
                name="password"
                value={userCredentials.password}
                onChange={handleInputChange}
                error={!!errors.password}
                helperText={errors.password}
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: 'pointer', userSelect: 'none', ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth type="submit" disabled={loading}>
                {loading ? 'Signing In...' : 'Sign in'}
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{' '}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  )
}

export default Basic