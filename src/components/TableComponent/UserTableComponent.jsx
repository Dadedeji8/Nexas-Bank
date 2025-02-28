import { useAuth } from 'context/AuthContext'
import moment from 'moment'
import React, { useState } from 'react'
import { Checkbox, FormControl, FormControlLabel, IconButton, InputLabel, Menu, MenuItem, Select } from '@mui/material';
import DataTable from 'examples/Tables/DataTable';
import { MoreVert } from '@mui/icons-material';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import PropTypes from 'prop-types';


function UsersTableComponent() {
  const { allUsers } = useAuth()
  const formattedAllUsers = allUsers.map((user) => ({
    ...user,
    account: {
      balance: user.account.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 2 }),
    },
    isAdmin: user.isAdmin ? 'Admin' : 'User',
    isActive: user.isActive ? 'Active' : 'Disabled',
    createdAt: moment(user.createdAt).format('DD MMM yyy'),
    action: <UserActionMenu rowId={user._id} wallet={user.account.balance} isActive={user.isActive} />,
  }))
  return (
    <div className="">
      <div className=" text-[26px] pb-2 font-bold ">Users Table</div>
      <DataTable
        canSearch={true}
        table={{
          columns: [
            { Header: 'Fullname', accessor: 'fullName' },
            { Header: 'Username', accessor: 'username' },
            { Header: 'Email', accessor: 'email' },
            { Header: 'Age', accessor: 'age' },
            { Header: 'Gender', accessor: 'gender' },
            { Header: 'Country', accessor: 'country' },
            { Header: 'Balance', accessor: 'account.balance' },
            { Header: 'Date', accessor: 'createdAt' },
            { Header: 'Type', accessor: 'isAdmin' },
            { Header: 'Status', accessor: 'isActive' },
            { Header: 'Action', accessor: 'action' },
          ],
          rows: [...formattedAllUsers],
        }}
      />
    </div>
  )
}

export default UsersTableComponent

const UserActionMenu = ({ rowId, wallet, isActive }) => {
  const { adminUpdateUserWallet, adminDisableUser } = useAuth()
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const [walletAmount, setWalletAmount] = useState(wallet);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
    handleClose();
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleWalletUpdate = () => {
    // Logic to update wallet amount

    adminUpdateUserWallet({ id: rowId, amount: walletAmount });
    console.log(`Updating wallet for user ${rowId} with amount ${walletAmount}`);
    handleDialogClose();
  };

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
        <MenuItem onClick={() => {
          adminDisableUser({ id: rowId });
          handleClose()
        }}>{isActive ? "Disable" : "Activate"}</MenuItem>
        <MenuItem onClick={handleDialogOpen}>Update Wallet</MenuItem>
      </Menu>
      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Update Wallet</DialogTitle>
        <DialogContent>

          <p> <b> Previous Balance:</b> {wallet.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 2 })}</p>
          <TextField
            autoFocus
            margin="dense"
            label="Wallet Amount"
            type="number"
            fullWidth
            variant="standard"
            value={walletAmount}
            onChange={(e) => setWalletAmount(e.target.value)}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleWalletUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};


UserActionMenu.propTypes = {
  rowId: PropTypes.string.isRequired,
  wallet: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
};