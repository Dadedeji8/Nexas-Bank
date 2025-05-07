// @mui material components
import Grid from '@mui/material/Grid'
import { use, useEffect, useState } from 'react'
import moment from 'moment'
// Material Dashboard 2 React components
import MDBox from 'components/MDBox'
import PropTypes from 'prop-types';

// Material Dashboard 2 React example components
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import Footer from 'examples/Footer'
import ReportsBarChart from 'examples/Charts/BarCharts/ReportsBarChart'
import ReportsLineChart from 'examples/Charts/LineCharts/ReportsLineChart'
import ComplexStatisticsCard from 'examples/Cards/StatisticsCards/ComplexStatisticsCard'

// Data
import reportsBarChartData from 'layouts/dashboard/data/reportsBarChartData'
import reportsLineChartData from 'layouts/dashboard/data/reportsLineChartData'
import cardBG from '../../assets/images/cardBG.jpg'
// Dashboard components
import Projects from 'layouts/dashboard/components/Projects'
import OrdersOverview from 'layouts/dashboard/components/OrdersOverview'
import { Box, Button, Card, Divider, Stack, Typography } from '@mui/material'
import {
  Cancel,
  Close,
  RemoveRedEye,
  RemoveRedEyeOutlined,
} from '@mui/icons-material'
import DepositsTableComponent from 'components/TableComponent/DepositsTableComponent'
import TransactionsTableComponent from 'components/TableComponent/TransactionsTableComponent'
import WithdrawalsTableComponent from 'components/TableComponent/WithdrawalsTableComponent'
import React from 'react'
import UsersTableComponent from 'components/TableComponent/UserTableComponent'
import { useAuth } from 'context/AuthContext'
import { Link } from 'react-router-dom'
import { Copy } from 'lucide-react'
import MDInput from 'components/MDInput';
import { toast } from 'react-toastify';
import Deactivated from 'layouts/deactivatedPage/Deactivated';
import { BsTrash3Fill } from "react-icons/bs";

function Dashboard() {
  const { isAdmin, isActive, allUsers, deposits, withdrawals, allAccountDetails, toggleDetailState, deleteAccountDetail } = useAuth()
  const [newAccount, setNewAccount] = useState({})
  const [loadinig, setLoading] = useState(false)
  const { createDetail } = useAuth()

  useEffect(() => {
    console.log({ isAdmin })
  }, [isAdmin])
  useEffect(() => {
    console.log(newAccount)
  }, [newAccount])
  useEffect(() => {
    console.log('these are all the account details created by the admin', allAccountDetails)
  }, [allAccountDetails])

  // const validate =()=>{}

  // This function handles input changes for a form
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewAccount(prev => ({ ...prev, [name]: value }))
  }

  const submitAccDetails = async () => {
    setLoading(true);
    try {
      // Wait for the API call to complete
      await createDetail(newAccount);
      console.log(newAccount, 'this is the data submitted');
      toast.success('Account Created Successfully');
    } catch (error) {
      console.error('Submission error:', error);
      toast.error(`Failed to register Account: ${error.message}`);
    } finally {
      setLoading(false);  // Always reset loading state
    }
  };
  const deleteDetail = async (id) => {
    try {

      await deleteAccountDetail(id);
      allAccountDetails()
      toast.success('Account detail deleted successfully');
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {isActive ?
        <MDBox py={3}>
          {isAdmin ? (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    color="success"
                    icon="money"
                    title="Total Users"
                    count={allUsers.length}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    icon="leaderboard"
                    title="Pending Deposits"
                    count={
                      deposits.filter((el) => el.status === 'pending').length
                    }
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    color="success"
                    icon="store"
                    title="Pending Withdrawals"
                    count={
                      withdrawals.filter((el) => el.status === 'pending').length
                    }
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    color="primary"
                    icon="person"
                    title="Admins"
                    count={allUsers.filter((el) => el.isAdmin === true).length}
                  />
                </MDBox>
              </Grid>
            </Grid>
          ) : (
            ''
          )}

          <MDBox>

            <Grid container spacing={3} className="flex-col-reverse md:flex-row">
              <Grid item xs={12} md={6} lg={7.5}>
                <div className="flex flex-col gap-[30px]">

                  <div className="hidden md:block">
                    {!isAdmin && <InfoComponent showAccount={true} />}
                  </div>

                  {isAdmin && <UsersTableComponent />}

                  <TransactionsTableComponent />
                </div>
              </Grid>

              {!isAdmin ? (
                <Grid
                  item
                  rowSpacing={3}
                  className="inline-flex  -0  md:fix ed top-[96px] right-[3%] "
                  xs={12}
                  md={6}
                  lg={4.5}
                >
                  <MDBox className="flex flex-col gap-[15px] w-full">
                    <div className="md:hidden">
                      {!isAdmin && <InfoComponent showAccount={false} />}
                    </div>

                    <AccountOverviewComponent />
                    <div className="md:hidden">
                      {!isAdmin && <Card className='w-full p-5'>
                        <p className="text-gray-400 font-bold text-[18px]">Account Number </p>
                        <div className="flex">  <input type="Number" disabled={true} value={2217392093} className='p-2 border rounded-[5px] w-full' />
                          <button
                            className='bg-[#1a73eb] text-white p-2 rounded-[5px] ml-2 border-none'
                            onClick={() => {
                              navigator.clipboard.writeText(2217392093)
                              alert('Account number copied to clipboard')
                            }}
                          >
                            <Copy className='size-[20px]' />
                          </button></div>
                      </Card>}
                    </div>

                    <NotificationComponent />
                  </MDBox>
                </Grid>
              ) : (
                <Grid
                  item
                  rowSpacing={3}
                  className="inline-flex  mt-10  md:max-w-[400px]"
                  xs={12}
                  md={6}
                  lg={4.5}
                >
                  <MDBox className="flex flex-col gap-[15px] w-full">
                    {/* <AccountOverviewComponent /> */}
                    <NotificationComponent />

                    <Grid item>

                      <Card className='p-2'>
                        <Typography className='text-sm font-black text-blue-800' color="initial">Create New Account Detail</Typography>
                        <div className='mt-3 flex flex-col gap-4'>
                          <MDInput className='w-full ' label='Name' name='name' onChange={handleInputChange} />
                          <MDInput className='w-full ' label='Account Number' name='code' onChange={handleInputChange} />
                          <MDInput className='w-full ' label='Bank' name='channel' onChange={handleInputChange} />
                          <Button variant='contained' className='text-white' onClick={submitAccDetails}> Register </Button>
                        </div>
                      </Card>

                    </Grid>

                    <Grid item>

                      <Card className='p-2'>
                        <Typography className='text-sm font-black text-blue-800' color="initial">All account details</Typography>
                        <div className='mt-3 flex flex-col gap-4'>
                          {allAccountDetails ? allAccountDetails.map((account, index) => {
                            return <div key={index} className={`p-2 ${account?.active ? 'bg-blue-100' : 'bg-red-50'} rounded `}>
                              <Typography className='text-sm font-black text-blue-900 flex justify-between'>
                                <span> Account Name:</span> <span>{account?.name}</span>
                              </Typography>
                              <Typography className='text-sm text-blue-900 flex justify-between'>
                                <span> Account Number:</span> <span className='font-bold'>{account?.code}</span>
                              </Typography>
                              <Typography className='text-sm text-blue-900 flex justify-between'>
                                <span> Bank Account:</span> <span className='font-bold'>{account?.channel}</span>
                              </Typography>
                              <Typography className='text-sm text-blue-900 flex justify-between'>
                                <span>Status:</span> <span className='font-bold'>{account?.active ? 'Active' : <span className='text-red-600'>Deactivated</span>}</span>
                              </Typography>
                              <div className='flex justify-content-between gap-2 align-items-center'>
                                <Button className={` text-white w-full ${account?.active ? 'bg-red-500' : 'bg-blue-600'}`} onClick={() => { account?.active ? toggleDetailState({ id: account?._id, active: false }) : toggleDetailState({ id: account?._id, active: true }) }} >
                                  {account?.active ? ' Deactivate Account' : 'Activate Account'}
                                </Button>
                                <Button className=' text-white  bg-red-700' onClick={() => { deleteAccountDetail(account?._id) }} >
                                  <BsTrash3Fill />
                                </Button>
                              </div>

                            </div>
                          }) : 'No account Available'}
                        </div>
                      </Card>

                    </Grid>
                  </MDBox>
                </Grid>
              )}

            </Grid>
          </MDBox>
        </MDBox> : <Deactivated />}
      <Footer />
    </DashboardLayout>
  )
}

export default Dashboard

function AccountOverviewComponent() {
  const [showValue, setShowValue] = useState(false)
  const { sales, tasks } = reportsLineChartData
  const { profile } = useAuth()
  return (
    <div
      className={`h-[200px] flex flex-col justify-between p-4 rounded-xl shadow cardImg`}
    >
      <div>
        <Box className={'flex'}>
          <Typography color={'primary'} sx={{ fontSize: 15, fontWeight: 800 }}>
            Account Overview
          </Typography>
        </Box>
        <div className="flex flex-row items-center gap-3">
          <div>
            <Typography variant="h2" color={'primary'}>
              {profile?.account?.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 2 })}
            </Typography>

          </div>
          <span
            onClick={() => {
              setShowValue(!showValue)
            }}
            className="flex items-center"
          >
            {showValue ? (
              <RemoveRedEyeOutlined
                color="primary"
                onClick={() => {
                  setShowValue(!showValue)
                }}
                sx={{ cursor: 'pointer' }}
              />
            ) : (
              <RemoveRedEye
                color="primary"
                onClick={() => {
                  setShowValue(!showValue)
                }}
                sx={{ cursor: 'pointer' }}
              />
            )}
          </span>

        </div>   <Typography variant="body2" color={'primary'}>
          {profile?.account?.number}
        </Typography>
      </div>
      <Box className="flex gap-3">
        <Button
          variant="contained"
          sx={{ color: '#ffffff' }}
          size="medium"
          color="primary"
        >
          <Link to={'/make-transaction'}>Transfer</Link>
        </Button>
        {/* <Button
          variant="contained"
          size="medium"
          sx={{ color: '#ffffff' }}
          color="primary"
        >
          <Link to={'/maketransaction'}>Deposit</Link>
        </Button> */}
      </Box>
    </div>
  )
}

function NotificationComponent() {
  const { notifications } = useAuth()
  return (
    <Card
      padding={2}
      sx={{ padding: 2 }}
      className="h-[100px] md:h-[240px]  overf low-y-scroll"
    >
      <Typography color={'primary'} sx={{ fontSize: 15, fontWeight: 800 }}>
        Notification
      </Typography>
      <Stack className="h-[200px]  overflow-y-scroll">

        {notifications?.length > 0 ? notifications.map((notification) => {
          return (
            <Box key={notification._id} className="outline outline-gray-200 rounded mb-1 p-2 py-4 justify-between items-center">
              <p className="text-blue-800 text-sm">
                {notification.message.slice(0, -8)}...
              </p>
              <p className="text-gray-400 text-[10px]">
                {moment(notification?.date).format('MMMM Do YYYY h:mm:ss a') || moment(notification?.createdAt).format('MMMM Do YYYY h:mm:ss a')}

              </p>
            </Box>
          )
        }) : <Typography color={'textSecondary'} className='mt-2' sx={{ fontSize: 18 }}>
          No notifications yet
        </Typography>
        }
      </Stack>
    </Card>
  )
}
function InfoComponent({ showAccount }) {
  const [showValue, setShowValue] = useState(false)
  const { sales, tasks } = reportsLineChartData
  const { notifications, profile } = useAuth()
  useEffect(() => {
    console.log({ profile })
  }, [])
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex flex-col">
        <p className="text-blue-800  text-lg">Welcome to your dashboard</p>
        <p className="text-gray-400  text-[18px]">{profile.fullName} </p>
      </div>

      {showAccount && <Card className='w-full p-5'>
        <p className="text-gray-400 font-bold text-[18px]">Account Number </p>
        <div className="flex">  <input type="Number" disabled={true} value={profile?.account?.number} className='p-2 border rounded-[5px] w-full' />
          <button
            className='bg-[#1a73eb] text-white p-2 rounded-[5px] ml-2 border-none'
            onClick={() => {
              navigator.clipboard.writeText(profile?.account?.number)
              alert('Account number copied to clipboard')
            }}
          >
            <Copy className='size-[20px]' />
          </button></div>
      </Card>}
    </div>
  )
}


InfoComponent.propTypes = {
  showAccount: PropTypes.bool,
};
