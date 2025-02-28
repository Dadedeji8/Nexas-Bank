import Footer from 'examples/Footer'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React, { useState } from 'react'
import DepositsTableComponent from 'components/TableComponent/DepositsTableComponent'
import WithdrawalsTableComponent from 'components/TableComponent/WithdrawalsTableComponent'
import TransactionsTableComponent from 'components/TableComponent/TransactionsTableComponent'
import { Tabs, Tab } from '@mui/material'
import UsersTableComponent from 'components/TableComponent/UserTableComponent'

const UsersPage = () => {

  const [activeTab, setActiveTab] = useState(0)

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />

      <div className="flex flex-col gap-[30px] pt-10">

        <UsersTableComponent />
      </div>
      <Footer />
    </DashboardLayout>
  )
}

export default UsersPage


