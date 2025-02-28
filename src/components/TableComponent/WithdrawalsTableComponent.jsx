import { MoreVert } from '@mui/icons-material'
import { IconButton, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import DataTable from 'examples/Tables/DataTable'
import { useAuth } from 'context/AuthContext'
import moment from 'moment'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from '@mui/material'
import PropTypes from 'prop-types'

function WithdrawalsTableComponent() {
  const { withdrawals, isAdmin } = useAuth()

  const formattedWithdrawal = withdrawals.map((withdrawal) => ({
    ...withdrawal,
    createdAt: moment(withdrawal.createdAt).format('DD MMM yyy'),
    action: <WithdrawalActionMenu rowId={withdrawal._id} />,
  }))

  return (
    <div className="">
      <div className=" text-[26px] pb-2 font-bold ">Withdrawal</div>
      <DataTable
        canSearch={true}
        table={{
          columns: [
            { Header: 'User', accessor: 'userId.fullName', width: '35%' },
            { Header: 'Amount', accessor: 'amount' },
            {
              Header: 'Account Number',
              accessor: 'account.number',
              width: '20%',
            },
            { Header: 'Account Name', accessor: 'account.name' },
            { Header: 'Bank', accessor: 'account.bank' },
            { Header: 'Description', accessor: 'description' },
            { Header: 'Status', accessor: 'status' },
            { Header: 'Reason', accessor: 'reason' },

            { Header: 'Date', accessor: 'createdAt', width: '12%' },
            ...(isAdmin ? [{ Header: 'Action', accessor: 'action', width: '10%' }] : [])
          ],
          rows: [...formattedWithdrawal],
        }}
      />
    </div>
  )
}

export default WithdrawalsTableComponent

const WithdrawalActionMenu = ({ rowId }) => {
  const { adminApproveWithdrawals } = useAuth()

  const [anchorEl, setAnchorEl] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [reason, setReason] = useState('')
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDialogOpen = () => {
    setOpenDialog(true)
    handleClose()
  }

  const handleDialogClose = () => {
    setOpenDialog(false)
  }

  const handleWalletUpdate = () => {
    if (!reason) return window.alert('Please provide a reason for rejection')
    // Logic to update wallet amount
    // console.log(`Reject Withdrawal ${rowId} for Reason: ${reason}`);
    adminApproveWithdrawals({ id: rowId, status: 'rejected', reason })
    handleDialogClose()
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVert />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: '20ch',
          },
        }}
      >
        <MenuItem
          onClick={() => {
            adminApproveWithdrawals({
              id: rowId,
              status: 'approved',
              reason: 'Okay',
            })
              handleClose()

          }}
        >
          Approve
        </MenuItem>
        <MenuItem onClick={handleDialogOpen}>Reject</MenuItem>
      </Menu>
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Reject Withdrawal</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Reason for rejection"
            type="text"
            fullWidth
            variant="standard"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
          <Button onClick={handleWalletUpdate}>Reject</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

WithdrawalActionMenu.propTypes = {
  rowId: PropTypes.string.isRequired,
}
