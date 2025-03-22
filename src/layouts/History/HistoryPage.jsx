import Footer from 'examples/Footer'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React, { useState } from 'react'
import DepositsTableComponent from 'components/TableComponent/DepositsTableComponent'
import WithdrawalsTableComponent from 'components/TableComponent/WithdrawalsTableComponent'
import TransactionsTableComponent from 'components/TableComponent/TransactionsTableComponent'
import { Tabs, Tab, Typography } from '@mui/material'
import Deactivated from 'layouts/deactivatedPage/Deactivated'
import { useAuth } from 'context/AuthContext'

const HistoryPage = () => {
  const { isActive } = useAuth()
  const [activeTab, setActiveTab] = useState(0)

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />

      {isActive ? <div className="flex flex-col gap-[30px] pt-10">


        {/* <Tabs value={activeTab} onChange={handleTabChange} aria-label="history tabs">
          <Tab label="Transactions" />

        </Tabs> */}


        {activeTab === 0 && <TransactionsTableComponent />}
        {activeTab === 1 && <DepositsTableComponent />}
        {activeTab === 2 && <WithdrawalsTableComponent />}


      </div> : <Deactivated />}
      <Footer />
    </DashboardLayout>
  )
}

export default HistoryPage


