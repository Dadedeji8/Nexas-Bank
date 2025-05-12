import { useState, useEffect } from 'react'

import PropTypes from 'prop-types'
import { useAuth } from 'context/AuthContext'
import { Card, Grid, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, DialogContentText, CircularProgress } from '@mui/material'
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
// import { uploadFile } from '@uploadcare/upload-client'
function Header({ children }) {
  const { profile, getProfile, updateProfile, updateUserWallet } = useAuth()
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
  const [userProfileImg, setUserProfileImg] = useState('')
  useEffect(() => {
    function handleTabsOrientation() {
      setTabsOrientation(window.innerWidth < breakpoints.values.sm ? 'vertical' : 'horizontal')
    }
    window.addEventListener('resize', handleTabsOrientation)
    handleTabsOrientation()
    return () => window.removeEventListener('resize', handleTabsOrientation)
  }, [])
  const inputFieldSet = [
    // { name: 'fullName', label: 'Full Name', type: 'text' },
    // { name: 'email', label: 'Email', type: 'email' },
    { name: 'age', label: 'Age', type: 'number' },
    { name: 'username', label: 'Username', type: 'text' },
    { name: 'oldPassword', label: 'Old Password', type: 'password' },
    { name: 'newPassword', label: 'New Password', type: 'password' }
  ]
  const [walletAddress, setWalletAddress] = useState('')
  const [openWalletDialog, setOpenWalletDialog] = useState(false)
  useEffect(() => {
    return () => {
      getProfile()
    };
  }, [uploading])
  const [loading, setLoading] = useState(false)
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


  const handleProfileChange = async (e) => {
    if (e.allEntries && e.allEntries.length > 0) {
      setUploading(true); // Show loading indicator

      const fileEntry = e.allEntries[0]; // Get first uploaded file

      const checkForCDNUrl = setInterval(() => {
        if (fileEntry.cdnUrl) {
          clearInterval(checkForCDNUrl); // Stop checking when cdnUrl is available
          // setAvatar(fileEntry.cdnUrl); // Update state with cdnUrl
          updateProfile({ profilePhoto: fileEntry.cdnUrl })
          setUserProfileImg(fileEntry.cdnUrl)
          setUploading(false); // Hide loading indicator
          console.log('File uploaded successfully:', fileEntry.cdnUrl);
          getProfile()
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


  // const UpdateWalletAddress = async () => {
  //   setLoading(true)
  //   try {

  //     const result = await updateUserWallet(walletAddress)
  //     toast.success('Wallet Updated Successfully')
  //     setLoading(false)
  //     setOpenWalletDialog(false)
  //   } catch (error) {
  //     console.log(error)
  //     toast.error(error)
  //     // setOpenWalletDialog(false)
  //   }
  // }

  const UpdateWalletAddress = async () => {
    try {
      setLoading(true);
      await updateUserWallet(walletAddress);
      toast.success('Wallet Updated Successfully');
      setOpenWalletDialog(false); // Close on success
    } catch (error) {
      console.error('Wallet Update Error:', error);
      const errorMessage = error.message || 'Failed to update wallet address';
      toast.error(errorMessage);
      // Keep dialog open on error to let user retry
      // Remove next line if you want to close dialog on error
      setOpenWalletDialog(true);
    } finally {
      setLoading(false); // Always reset loading state
    }
  };


  useEffect(() => { console.log(walletAddress) }, [walletAddress])
  const handleWalletInputChange = (e) => {
    const { name, value } = e.target
    setWalletAddress(value)
  }
  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleVerifyOpen = () => setOpenVerify(true)
  const handleVerifyClose = () => setOpenVerify(false)
  // const openProfilePictureBox =()=>setOpenProfileImage(true)

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
            <MDAvatar src={userProfileImg || profile?.profilePhoto} alt="profile-image" size="xl" shadow="sm" />
          </Grid>
          <Grid item>
            <MDTypography variant="h5" fontWeight="medium">
              {profile?.fullName || 'User Name'}
            </MDTypography>
            <MDTypography variant="button" color="text" fontWeight="regular">
              {/* {profile?.email} <span className='underline text-red-500'>{profile?.emailVerified ? 'Verified' : 'Not Verified'}</span> */}
              {profile?.email} <span className='underline text-green-500'>{'Verified'}</span>
            </MDTypography>

          </Grid>
          <Grid item>
            <Box className='rounded-2xl bg-lime-200 p-1 px-3'>
              <MDTypography variant='body2'>
                <Money /> Account Balance: <span className='text-blue-950'>{profile?.account?.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 2 }) || 0}</span>
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
          <Grid item>
            <Button variant='outlined' className='text-blue-900' onClick={() => setOpenWalletDialog(true)}>
              Update Wallet Address
            </Button>
          </Grid>
          <Grid item>
            {/* <Button variant='outlined' className='text-blue-900' onClick={openProfilePictureBox}>
              Update Profile Picture
            </Button> */}
            <Dialog>
              {/* 
              <FileUploaderRegular
                label='update profile photo'
                sourceList="local, camera, gdrive"
                cameraModes="photo, video"
                classNameUploader="uc-light"
                pubkey="de06d3627e924744c45e"
                onChange={handleFileUpload} // Handle file upload
              /> */}


            </Dialog>
          </Grid>
        </Grid>
        {children}
        <Dialog open={open} onClose={handleClose}>
          <div className='min-w-[350px]'>
            <DialogTitle>Update Profile</DialogTitle>

            <DialogContent>
              <Box className='flex w-full gap-2 justify-between items-center mb-2'>
                <MDAvatar src={profile?.profilePhoto || ProfileImg} alt="profile-image" size="xl" shadow="sm" />
                <Box>
                  <Typography className='text-[14px]'>
                    update Profile Picture
                  </Typography>

                  <FileUploaderRegular
                    sourceList="local, camera, gdrive"
                    cameraModes="photo, video"
                    classNameUploader="uc-light"
                    pubkey="de06d3627e924744c45e"
                    onChange={handleProfileChange} // Handle file upload
                  />
                </Box>

              </Box>
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
      {/* <Dialog open={openWalletDialog} onClose={() => { setOpenWalletDialog(false) }} >
        <DialogTitle >
          Update Wallet Address
        </DialogTitle>
        <DialogContent>
          <MDInput className='w-full mt-3' label={'Wallet Address'} type={'text'} onChange={handleWalletInputChange} />
        </DialogContent>
        <DialogActions>
          <Button
            variant='outlined'
            color="primary"
            className='text-blue-500'
            onClick={() => UpdateWalletAddress}
          >
            {loading ? 'Updating Wallet' : 'Update Wallet'}
          </Button>
          <Button

            color="primary"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog> */}

      <Dialog
        open={openWalletDialog}
        onClose={() => setOpenWalletDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Update Wallet Address</DialogTitle>
        <DialogContent>
          <MDInput
            className="w-full mt-3"
            label="Wallet Address"
            type="text"
            onChange={handleWalletInputChange}
            disabled={loading}
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            className='text-white'
            onClick={UpdateWalletAddress}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? 'Updating...' : 'Update'}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            className='text-black'
            onClick={() => setOpenWalletDialog(false)}
            disabled={loading}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </MDBox>
  )
}

Header.defaultProps = { children: '' }
Header.propTypes = { children: PropTypes.node }
export default Header
