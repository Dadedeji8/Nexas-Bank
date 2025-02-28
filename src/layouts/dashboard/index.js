// @mui material components
import Grid from '@mui/material/Grid'
import { use, useEffect, useState } from 'react'
import moment from 'moment'
// Material Dashboard 2 React components
import MDBox from 'components/MDBox'

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
import { Cancel, Close, RemoveRedEye, RemoveRedEyeOutlined } from '@mui/icons-material'
import DepositsTableComponent from 'components/TableComponent/DepositsTableComponent'
import TransactionsTableComponent from 'components/TableComponent/TransactionsTableComponent'
import WithdrawalsTableComponent from 'components/TableComponent/WithdrawalsTableComponent'
import React from 'react'
import UsersTableComponent from 'components/TableComponent/UserTableComponent'
import { useAuth } from 'context/AuthContext'
import { Link } from 'react-router-dom'


function Dashboard() {

  const { isAdmin, allUsers, deposits, withdrawals } = useAuth()
  useEffect(() => {
    console.log({ isAdmin })
  }
    , [isAdmin])

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        {isAdmin ? <Grid container spacing={3} >
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

                count={(deposits.filter((el) => el.status === 'pending')).length}

              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Pending Withdrawals"
                count={(withdrawals.filter((el) => el.status === 'pending')).length}

              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person"
                title="Admins"
                count={(allUsers.filter((el) => el.isAdmin === true)).length}

              />
            </MDBox>
          </Grid>
        </Grid> : ''}

        <MDBox>
          <Grid container spacing={3} className='flex-col-reverse md:flex-row'>
            <Grid item xs={12} md={6} lg={7.5}>
              <div className="flex flex-col gap-[30px]">
                {isAdmin && <UsersTableComponent />}
                <TransactionsTableComponent />
                <DepositsTableComponent />
                <WithdrawalsTableComponent />
              </div>
            </Grid>
            {!isAdmin ?
              <Grid item rowSpacing={3} className='inline-flex  -0  md:fixed top-[96px] right-[3%] ' xs={12} md={6} lg={4.5}>
                <MDBox
                  className="flex flex-col gap-[15px] w-full"

                >

                  <AccountOverviewComponent />
                  <NotificationComponent />
                </MDBox>

              </Grid> : <Grid item rowSpacing={3} className='inline-flex  mt-10  md:max-w-[400px]' xs={12} md={6} lg={4.5}>
                <MDBox
                  className="flex flex-col gap-[15px] w-full"

                >

                  {/* <AccountOverviewComponent /> */}
                  <NotificationComponent />
                </MDBox>

              </Grid>

            }
          </Grid>
        </MDBox>
      </MDBox>
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
    <div className={`h-[200px] flex flex-col justify-between p-4 rounded-xl shadow cardImg`}>
      <div>
        <Box className={'flex'}>
          <Typography color={"primary"} sx={{ fontSize: 15, fontWeight: 800 }}>
            Account Overview
          </Typography>
        </Box>
        <div className="flex flex-row items-center gap-3">

          <Typography variant='h2' color={"primary"}>
            {showValue ? profile?.account?.balance : "*****"}
          </Typography>
          <span onClick={() => { setShowValue(!showValue) }} className='flex items-center'>
            {showValue ? <RemoveRedEyeOutlined color='primary' onClick={() => { setShowValue(!showValue) }} sx={{ cursor: "pointer" }} /> : <RemoveRedEye color='primary' onClick={() => { setShowValue(!showValue) }} sx={{ cursor: "pointer" }} />}
          </span>
        </div>
      </div>
      <Box className="flex gap-3">
        <Button variant='contained' sx={{ color: "#ffffff" }} size='medium' color='primary'>
          <Link to={'/maketransaction'}>
            Transfer</Link>
        </Button>
        <Button variant='contained' size='medium' sx={{ color: "#ffffff" }} color='primary'>
          <Link to={'/maketransaction'}>
            Deposit</Link>
        </Button>
      </Box>

    </div>
  )
}

function NotificationComponent() {
  const [showValue, setShowValue] = useState(false)
  const { sales, tasks } = reportsLineChartData
  const { notifications, getNotification } = useAuth()
  // useEffect(() => {

  //   setNotification(notifications);
  // }, []);

  return (
    <Card padding={2} sx={{ padding: 2 }} className='h-[240px]  overf low-y-scroll'>
      <Typography color={"primary"} sx={{ fontSize: 15, fontWeight: 800 }}>
        Notification
      </Typography>
      <Stack className='h-[200px]  overflow-y-scroll' >

        {notifications?.map((notification) => {
          return <Box key={notification._id}> <Box className='outline outline-gray-200 rounded mb-1  p-2 py-4   justify-between items-center'>
            <Link to={'/notifications'}>   <p className='text-blue-800  text-sm'>
              {(notification.message).slice(0, -8)}...
            </p>
              <p className='text-gray-400  text-[10px]'>
                {moment(notification.createdAt).format('MMMM Do h:mm:ss a')}
              </p></Link>
          </Box>
          </Box>
        })}

      </Stack>
    </Card>
  )
}