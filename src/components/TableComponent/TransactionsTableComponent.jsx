import { useAuth } from 'context/AuthContext'
import moment from 'moment'
import React, { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Menu, MenuItem } from '@mui/material';
import DataTable from 'examples/Tables/DataTable';
import { MoreVert } from '@mui/icons-material';
import MDInput from 'components/MDInput';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function TransactionsTableComponent() {
  const { transactionsHistory, isAdmin, adminDeleteSingleTransaction } = useAuth()
  // const formattedTransactions = transactionsHistory.map((transaction) => ({
  //   ...transaction,
  //   createdAt: moment(transaction.createdAt).format('DD MMM yyy'),
  // }))
  const formattedTransactions = transactionsHistory.map((transaction) => ({
    ...transaction,
    createdAt: moment(transaction.date).format('MMMM Do YYYY, h:mm a'),
    action: <UserActionMenu
      rowId={transaction._id}
      amount={transaction.amount}
      type={transaction.type}
      status={transaction.status}
      description={transaction.description}
    />,
  }));



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
            { Header: 'Status', accessor: 'status', width: '12%' },
            { Header: 'Actions', accessor: 'action' },
          ],
          rows: [...formattedTransactions],
        }}
      />
    </div>
  )
}

export default TransactionsTableComponent

// This function creates a UserActionMenu component that takes in rowId, amount, type, and description as props
const UserActionMenu = ({ rowId, amount, type, description, status, }) => {
  // Destructure the adminUpdateTransaction function from the useAuth hook
  const { adminUpdateTransaction, adminDeleteSingleTransaction } = useAuth();
  // Set the anchorEl state to null
  const [anchorEl, setAnchorEl] = useState(null);
  // Set the openDialog state to false
  const [openDialog, setOpenDialog] = useState(false);
  // Set the transactionDetail state to an object with the amount, type, and description props
  const [transactionDetail, setTransactionDetail] = useState({ amount, type, description });
  const { isAdmin } = useAuth()
  // Set the open state to a boolean value based on the anchorEl state
  const open = Boolean(anchorEl);

  // Function to handle the click event on the IconButton
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to handle the close event on the Menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Function to handle the update of the transaction data
  const handleUpdateTransactionData = (e) => {
    const { name, value } = e.target;
    setTransactionDetail((prev) => ({ ...prev, [name]: value }));
  };
  const handleDateChange = (event) => {
    const inputDate = event.target.value;
    const formattedDate = new Date(inputDate).toISOString(); // Convert to ISO format
    handleUpdateTransactionData({ target: { name: event.target.name, value: formattedDate } });
  };
  // Function to handle the open of the dialog
  const handleDialogOpen = () => {
    setOpenDialog(true);
    handleClose();
  };

  // Function to handle the close of the dialog
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  // Function to handle the update of the transaction
  const handleTransactionUpdate = async () => {
    try {
      // Call the adminUpdateTransaction function with the rowId and transactionDetail
      await adminUpdateTransaction({ id: rowId, ...transactionDetail });
      // Show a success toast message
      toast.success('Transaction updated successfully');
      // Close the dialog
      handleDialogClose();
    } catch (error) {
      console.error("Transaction update failed:", error.message);
      toast.error('Transaction update failed');
      // Show an error toast message
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await adminDeleteSingleTransaction(id)
      toast.success('Transaction record deleted')
      handleDialogClose();
    } catch (error) {
      console.log(error)
      toast.error('Transaction update failed');
    }
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
      {isAdmin ? <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{ style: { maxHeight: 48 * 4.5, width: '20ch' } }}
      >
        <MenuItem onClick={handleDialogOpen}>Edit Transaction</MenuItem>
        <MenuItem onClick={() => deleteTransaction(rowId)} >Delete Transaction </MenuItem>
        <MenuItem ><Link to={`/receipt/${rowId}`}>View Receipt</Link></MenuItem>
      </Menu>
        :
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{ style: { maxHeight: 48 * 4.5, width: '20ch' } }}
        >
          <MenuItem ><Link to={`/receipt/${rowId}`}>View Receipt</Link></MenuItem>
        </Menu>}
      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Transaction</DialogTitle>
        <DialogContent>
          <MDInput
            autoFocus
            margin="dense"
            label="Amount"
            type="number"
            fullWidth
            name='amount'
            variant="standard"
            value={transactionDetail.amount}
            onChange={handleUpdateTransactionData}
          />
          <h6>Select Transaction Type</h6>
          <select name='method' onChange={handleUpdateTransactionData} aria-placeholder='select Transaction type' className='w-full p-3 rounded border-1 border-green-50'>
            <option value={''}>Select Transaction type</option>
            <option value={'+'}>Credit</option>
            <option value={'-'}>Debit</option>
          </select>


          <MDInput
            margin="dense"

            type="datetime-local"
            fullWidth
            name='date'
            variant="standard"
            // value={transactionDetail.createdAt}
            onChange={handleDateChange}
          />
          <div className='flex gap-3'>
            <div className="flex items-center">
              <MDInput


                type="radio"
                fullWidth
                name='status'
                value={'success'}
                variant="standard"
                // value={transactionDetail.createdAt}
                onChange={handleUpdateTransactionData}
              />
              <label htmlFor="status">success</label>
            </div>
            <div className="flex items-center">
              <MDInput


                type="radio"
                fullWidth
                name='status'
                value={'pending'}
                variant="standard"
                // value={transactionDetail.createdAt}
                onChange={handleUpdateTransactionData}
              />
              <label htmlFor="status">pending</label>
            </div>
            <div className="flex items-center">
              <MDInput


                type="radio"
                fullWidth
                name='status'
                value={'failed'}
                variant="standard"
                // value={transactionDetail.createdAt}
                onChange={handleUpdateTransactionData}
              />
              <label htmlFor="status">failed</label>
            </div>
          </div>
          <MDInput
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            name='description'
            variant="standard"
            value={transactionDetail.description}
            onChange={handleUpdateTransactionData}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleTransactionUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

UserActionMenu.propTypes = {
  rowId: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};
