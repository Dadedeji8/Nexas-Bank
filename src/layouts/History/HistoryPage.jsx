import Footer from 'examples/Footer'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React, { useState } from 'react'
import DepositsTableComponent from 'components/TableComponent/DepositsTableComponent'
import WithdrawalsTableComponent from 'components/TableComponent/WithdrawalsTableComponent'
import TransactionsTableComponent from 'components/TableComponent/TransactionsTableComponent'
import { Tabs, Tab } from '@mui/material'

const HistoryPage = () => {

  const [activeTab, setActiveTab] = useState(0)

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />

      <div className="flex flex-col gap-[30px] pt-10">


        <Tabs value={activeTab} onChange={handleTabChange} aria-label="history tabs">
          <Tab label="Transactions" />
          <Tab label="Deposits" />
          <Tab label="Withdrawals" />
        </Tabs>

        {activeTab === 0 && <TransactionsTableComponent />}
        {activeTab === 1 && <DepositsTableComponent />}
        {activeTab === 2 && <WithdrawalsTableComponent />}


      </div>
      <Footer />
    </DashboardLayout>
  )
}

export default HistoryPage


