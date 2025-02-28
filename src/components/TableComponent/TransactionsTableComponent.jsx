import { useAuth } from 'context/AuthContext'
import moment from 'moment'
import React, { useState } from 'react'
import { IconButton, Menu, MenuItem } from '@mui/material';
import DataTable from 'examples/Tables/DataTable';
import { MoreVert } from '@mui/icons-material';



function TransactionsTableComponent() {
  const { transactionsHistory } = useAuth()
  const formattedTransactions = transactionsHistory.map((transaction) => ({
    ...transaction,
    createdAt: moment(transaction.createdAt).format('DD MMM yyy'),
  }))
  return (
    <div className="">
      <div className=" text-[26px] pb-2 font-bold ">Transactions History</div>
      <DataTable
        canSearch={true}
        table={{
          columns: [
            { Header: 'User', accessor: 'userId.fullName', width: '35%' },
            { Header: 'Amount', accessor: 'amount', width: '20%' },
            { Header: 'Type', accessor: 'type' },
            { Header: 'Date', accessor: 'createdAt', width: '12%' },
          ],
          rows: [...formattedTransactions],
        }}
      />
    </div>
  )
}

export default TransactionsTableComponent

