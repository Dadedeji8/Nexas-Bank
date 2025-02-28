import { useAuth } from 'context/AuthContext'
import moment from 'moment'
import React, { useState } from 'react'
import { IconButton, Menu, MenuItem } from '@mui/material';
import DataTable from 'examples/Tables/DataTable';
import PropTypes from 'prop-types';
import { MoreVert } from '@mui/icons-material';



function DepositsTableComponent() {
  const { deposits, isAdmin } = useAuth()
  const formattedDeposits = deposits.map((deposit) => ({
    ...deposit,
    createdAt: moment(deposit.createdAt).format('DD MMM yyy'),
    action: <DepositActionMenu rowId={deposit._id} />,
  }))
  return (
    <div className="">
      <div className=" text-[26px] pb-2 font-bold ">Deposits</div>
      <DataTable
        canSearch={true}
        table={{
          columns: [
            { Header: 'User', accessor: 'userId.fullName', width: '35%' },
            { Header: 'Amount', accessor: 'amount', width: '20%' },
            { Header: 'Status', accessor: 'status' },
            { Header: 'Date', accessor: 'createdAt', width: '12%' },
            ...(isAdmin ? [{ Header: 'Action', accessor: 'action', width: '10%' }] : [])
          ],
          rows: [...formattedDeposits],
        }}
      />
    </div>
  )
}

export default DepositsTableComponent

const DepositActionMenu = ({ rowId }) => {
  const { adminApproveDeposits } = useAuth()
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
          adminApproveDeposits({ id: rowId, status: "approved" })
          handleClose()

        }}>Approve</MenuItem>
        <MenuItem onClick={() => {
          adminApproveDeposits({ id: rowId, status: "rejected" })
          handleClose()

        }}>Reject</MenuItem>
      </Menu>
    </div>
  );
};
DepositActionMenu.propTypes = {
  rowId: PropTypes.string.isRequired,
};
