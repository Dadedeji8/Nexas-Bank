/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'

// @mui icons
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'

// Material Dashboard 2 React components
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'

// Material Dashboard 2 React example components
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import Footer from 'examples/Footer'
import ProfileInfoCard from 'examples/Cards/InfoCards/ProfileInfoCard'
import ProfilesList from 'examples/Lists/ProfilesList'
import DefaultProjectCard from 'examples/Cards/ProjectCards/DefaultProjectCard'

// Overview page components
import Header from 'layouts/profile/components/Header'
import { useEffect } from 'react'
import { useAuth } from 'context/AuthContext'
import { CakeOutlined, Check, GpsFixedRounded, Money, OtherHousesOutlined, Person2 } from '@mui/icons-material'


function Overview() {
  const { profile, getProfile, loading } = useAuth()
  useEffect(() => { !loading ? getProfile() : '' }, [])
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
        <MDBox mt={5} mb={3}>

          <MDTypography variant={'body2'}>
            <GpsFixedRounded /> Location: <span className='text-blue-950 font-bold'>{profile?.country}</span>
          </MDTypography>
          <MDTypography variant={'body2'}>
            <OtherHousesOutlined /> Account Type:<span className='text-blue-950 font-bold'> Regular</span>
          </MDTypography>
          <MDTypography variant={'body2'}>
            <Person2 /> Sex :<span className='text-blue-950 font-bold'> {profile?.gender || 'rather not say'}</span>
          </MDTypography>
          <MDTypography variant={'body2'}>
            <CakeOutlined /> Age :<span className='text-blue-950 font-bold'> {profile?.age || 'rather not says'}</span>
          </MDTypography>
          <MDTypography variant={'body2'}>
            {/* <Check /> Verification Status: <span className='text-blue-950 font-bold'>{profile?.emailVerified ? 'verified' : 'Not Verified'}</span> */}
            <Check /> Verification Status: <span className='text-blue-950 font-bold'>{' verified'}</span>
          </MDTypography>

        </MDBox>

        <MDBox p={2}>

        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  )
}

export default Overview
