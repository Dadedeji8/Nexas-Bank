import { useEffect, useState } from 'react';
import { Card, Box, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import MDBox from 'components/MDBox';
import MDButton from 'components/MDButton';
import MDInput from 'components/MDInput';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import { useAuth } from 'context/AuthContext';
import { toast } from 'react-toastify';
import Deactivated from 'layouts/deactivatedPage/Deactivated';
import { useNavigate } from 'react-router-dom';
const MakeTransaction = () => {
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [accountDetails, setAccountDetails] = useState(null);
    const [transferData, setTransferData] = useState({
        accountNumber: '',
        amount: '',
        description: '',
        password: ''
    });
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)
    const { makeTransfer, getAccountDetail, isActive } = useAuth();
    useEffect(() => { console.log(transferData) }, [transferData])// checking the data being passed
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTransferData(prev => ({ ...prev, [name]: value }));
    };

    const verifyAccount = async () => {
        if (!transferData.accountNumber) {
            toast.warning('Please enter an account number');
            return;
        }

        setLoadingProfile(true);
        try {
            const response = await getAccountDetail(transferData.accountNumber);
            setAccountDetails(response);

            console.log('this is the new Account details', accountDetails)

        } catch (error) {
            toast.error(error.message || 'Account verification failed');
            setAccountDetails(null);
        } finally {
            setLoadingProfile(false);
        }
    };

    const handleTransfer = async (e) => {
        e.preventDefault();
        try {
            // Validate inputs
            if (!transferData.amount ||
                !transferData.description ||
                !transferData.password) {
                toast.warning('All fields are required');
                return;
            }

            if (isNaN(transferData.amount) || Number(transferData.amount) <= 0) {
                toast.warning('Please enter a valid amount');
                return;
            }
            if (!accountDetails?.active) {
                setOpen(true)

                return

            }
            // Make transfer
            const response = await makeTransfer({
                ...transferData,
                ...accountDetails
            });
            navigate(`/receipt/${response.transaction._id}`, { replace: true });
            // Reset form on success
            setAccountDetails(null);
            setTransferData({
                accountNumber: '',
                amount: '',
                description: '',
                password: ''
            });

            toast.success('Transfer completed successfully!');

        } catch (error) {
            // Display error message from server
            toast.error(error.message || 'Transfer failed');
        }
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            {isActive ? <Card sx={{ padding: 5 }}>
                <Typography variant="h3" gutterBottom>Bank Transfer</Typography>

                <MDBox component="form" onSubmit={handleTransfer}>
                    {/* Account Number Input */}
                    {!accountDetails && (
                        <>
                            <MDInput
                                fullWidth
                                label="Recipient Account Number"
                                name="accountNumber"
                                value={transferData.accountNumber}
                                onChange={handleChange}
                                type="number"
                                margin="normal"
                            />

                            <MDButton
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={verifyAccount}
                                disabled={loadingProfile}
                            >
                                {loadingProfile ? 'Verifying...' : 'Verify Account'}
                            </MDButton>
                        </>
                    )}

                    {/* Verified Account Details */}
                    {accountDetails && (
                        <>
                            <Box className="mb-4 p-4 bg-blue-50 rounded">
                                <Typography variant="h6" className="mb-2">Recipient Details</Typography>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <Typography variant="body2">Account Name:</Typography>
                                        <Typography variant="body2" className="font-semibold">
                                            {accountDetails.name}
                                        </Typography>
                                    </div>
                                    <div className="flex justify-between">
                                        <Typography variant="body2">Account Number:</Typography>
                                        <Typography variant="body2" className="font-semibold">
                                            {accountDetails.code}
                                        </Typography>
                                    </div>
                                    <div className="flex justify-between">
                                        <Typography variant="body2">Bank:</Typography>
                                        <Typography variant="body2" className="font-semibold">
                                            {accountDetails.channel}
                                        </Typography>
                                    </div>
                                </div>
                            </Box>

                            {/* Transfer Form */}
                            <MDInput
                                fullWidth
                                label="Amount"
                                name="amount"
                                value={transferData.amount}
                                onChange={handleChange}
                                type="number"
                                margin="normal"
                                required
                            />

                            <MDInput
                                fullWidth
                                label="Description"
                                name="description"
                                value={transferData.description}
                                onChange={handleChange}
                                margin="normal"
                                multiline
                                rows={3}
                                required
                            />

                            <MDInput
                                fullWidth
                                label="Account Password"
                                name="password"
                                type="password"
                                value={transferData.password}
                                onChange={handleChange}
                                margin="normal"
                                required
                            />

                            <Box className="mt-4 flex gap-4">
                                <MDButton
                                    fullWidth
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => {
                                        setAccountDetails(null);
                                        setTransferData(prev => ({ ...prev, accountNumber: '' }));
                                    }}
                                >
                                    Cancel
                                </MDButton>
                                <MDButton
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Confirm Transfer
                                </MDButton>
                            </Box>
                        </>
                    )}
                    <Dialog open={open} onClose={() => { setOpen(false) }} >
                        <DialogTitle>
                            <Typography variant="h6" className='text-red-600'>Transaction Declined</Typography>

                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <Typography variant="body2" >Please contact the support department</Typography>

                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={() => { setOpen(false) }}
                                color="primary"
                            >
                                close
                            </Button>
                        </DialogActions>
                    </Dialog>
                </MDBox>
            </Card> : <Deactivated />}
        </DashboardLayout>
    );
};

// Updated API function with proper error handling


export default MakeTransaction;