import { useState, useEffect } from 'react'

import PropTypes from 'prop-types'
import { useAuth } from 'context/AuthContext'
import { Card, Grid, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import { Check, Edit, Money } from '@mui/icons-material'
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'
import MDAvatar from 'components/MDAvatar'
import MDInput from 'components/MDInput'
import MDButton from 'components/MDButton'
import { toast } from 'react-toastify'
import breakpoints from 'assets/theme/base/breakpoints'
import ProfileImg from 'assets/images/ProfileIMG.jpg'
import backgroundImage from 'assets/images/bg-profile.jpeg'
// file upload
import { FileUploaderRegular } from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';
import { uploadFile } from '@uploadcare/upload-client'
function Header({ children }) {
  const { profile, getProfile, updateProfile } = useAuth()
  const [tabsOrientation, setTabsOrientation] = useState('horizontal')
  const [tabValue, setTabValue] = useState(0)
  const [isEditing, setIsEditing] = useState(false)
  const [fieldEdited, setFieldEdited] = useState('')
  const [profileStage, setProfileStage] = useState({})
  const [updating, setUpdating] = useState(false)
  const [open, setOpen] = useState(false)
  const [openVerify, setOpenVerify] = useState(false)
  const [uploading, setUploading] = useState(false);
  const [avatar, setAvatar] = useState(null);
  useEffect(() => {
    function handleTabsOrientation() {
      setTabsOrientation(window.innerWidth < breakpoints.values.sm ? 'vertical' : 'horizontal')
    }
    window.addEventListener('resize', handleTabsOrientation)
    handleTabsOrientation()
    return () => window.removeEventListener('resize', handleTabsOrientation)
  }, [])
  const inputFieldSet = [
    { name: 'fullName', label: 'Full Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'age', label: 'Age', type: 'number' },
    { name: 'username', label: 'Username', type: 'text' },
    { name: 'oldPassword', label: 'Old Password', type: 'password' },
    { name: 'newPassword', label: 'New Password', type: 'password' }
  ]


  const handleFileUpload = (e) => {
    if (e.allEntries && e.allEntries.length > 0) {
      setUploading(true); // Show loading indicator

      const fileEntry = e.allEntries[0]; // Get first uploaded file

      const checkForCDNUrl = setInterval(() => {
        if (fileEntry.cdnUrl) {
          clearInterval(checkForCDNUrl); // Stop checking when cdnUrl is available
          setAvatar(fileEntry.cdnUrl); // Update state with cdnUrl
          updateProfile({ avatar: fileEntry.cdnUrl })
          setUploading(false); // Hide loading indicator
          console.log('File uploaded successfully:', fileEntry.cdnUrl);
        }
      }, 500); // Check every 500ms until cdnUrl is available
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileStage((prev) => ({ ...prev, [name]: value }))
  }

  const updateProfileDetails = () => {
    if (Object.keys(profileStage).length === 0) {
      toast.error('No changes detected')
      return
    }
    setUpdating(true)
    updateProfile(profileStage)
      .then(() => {
        getProfile()
        handleClose()
        toast.success('Successfully updated')
      })
      .catch(() => toast.error('Profile update failed'))
      .finally(() => setUpdating(false))
  }





  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleVerifyOpen = () => setOpenVerify(true)
  const handleVerifyClose = () => setOpenVerify(false)


  return (
    <MDBox position="relative" mb={5}>
      <MDBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(rgba(gradients.info.main, 0.6), rgba(gradients.info.state, 0.6))}, url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: '50%',
          overflow: 'hidden',
        }}
      />
      <Card sx={{ position: 'relative', mt: -8, mx: 3, py: 2, px: 2 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <MDAvatar src={ProfileImg} alt="profile-image" size="xl" shadow="sm" />
          </Grid>
          <Grid item>
            <MDTypography variant="h5" fontWeight="medium">
              {profile?.fullName || 'User Name'}
            </MDTypography>
            <MDTypography variant="button" color="text" fontWeight="regular">
              {profile?.email} <span className='underline text-red-500'>{profile?.emailVerified ? 'Verified' : 'Not Verified'}</span>
            </MDTypography>
          </Grid>
          <Grid item>
            <Box className='rounded-2xl bg-lime-200 p-1 px-3'>
              <MDTypography variant='body2'>
                <Money /> Account Balance: <span className='text-blue-950'>${profile?.account?.balance || 0}</span>
              </MDTypography>
            </Box>
          </Grid>
          <Grid item>
            <Button variant='outlined' className='text-blue-900' onClick={handleClickOpen}>
              Edit Profile
            </Button>
          </Grid>
          <Grid item>
            <Button variant='outlined' className='text-blue-900' onClick={handleVerifyOpen}>
              Verify Account
            </Button>
          </Grid>
        </Grid>
        {children}
        <Dialog open={open} onClose={handleClose}>
          <div className='min-w-[350px]'>
            <DialogTitle>Update Profile</DialogTitle>
            <DialogContent>
              {inputFieldSet.map((input) => (
                <Box className='flex gap-2 items-center mb-2' key={input.name}>
                  {fieldEdited === input.name ? (
                    <MDInput className='w-full' label={input.label} name={input.name} type={input.type} onChange={handleInputChange} />
                  ) : (
                    <Box className='rounded-xl p-2 w-full'>
                      <Typography className='text-[14px]'>
                        {profile?.[input.name] || input.label}
                      </Typography>
                    </Box>
                  )}
                  {fieldEdited === input.name ? <Check onClick={() => setFieldEdited('')} /> : <Edit onClick={() => setFieldEdited(input.name)} />}
                </Box>
              ))}
            </DialogContent>
            <DialogActions>
              <MDButton color="primary" className={`w-full ${updating ? 'bg-green-400' : ''}`} onClick={updateProfileDetails}>
                {updating ? 'Submitting' : 'Submit'}
              </MDButton>
              <MDButton onClick={handleClose} color="error">Close</MDButton>
            </DialogActions>
          </div>
        </Dialog>
        <Dialog open={openVerify} onClose={handleVerifyClose}>
          <div className='min-w-[350px]'>
            <DialogTitle className='text-sm'>Upload Valid Government ID</DialogTitle>
            <DialogContent>
              <div>
                <FileUploaderRegular
                  sourceList="local, camera, gdrive"
                  cameraModes="photo, video"
                  classNameUploader="uc-light"
                  pubkey="de06d3627e924744c45e"
                  onChange={handleFileUpload} // Handle file upload
                />


              </div>
            </DialogContent>
            <DialogActions>
              <MDButton color="primary" className={`w-full ${updating ? 'bg-green-400' : ''}`} onClick={updateProfileDetails} >
                {updating ? 'Submitting' : 'Submit'}
              </MDButton>
              <MDButton onClick={handleVerifyClose} color="error">Close</MDButton>
            </DialogActions>
          </div>
        </Dialog>
      </Card>
    </MDBox>
  )
}

Header.defaultProps = { children: '' }
Header.propTypes = { children: PropTypes.node }
export default Header
