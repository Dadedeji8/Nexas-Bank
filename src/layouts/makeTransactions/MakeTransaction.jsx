import { useState } from 'react';
import { Card, Box, Typography } from '@mui/material';
import MDBox from 'components/MDBox';
import MDButton from 'components/MDButton';
import MDInput from 'components/MDInput';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import { useAuth } from 'context/AuthContext';
import { toast } from 'react-toastify';

const MakeTransaction = () => {
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [accountDetails, setAccountDetails] = useState(null);
    const [transferData, setTransferData] = useState({
        accountNumber: '',
        amount: '',
        description: '',
        password: ''
    });
    const { makeTransfer } = useAuth();

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
            // Simulated API call
            const response = await getAccountDetail(transferData.accountNumber);
            setAccountDetails(response);
        } catch (error) {
            toast.error(error.message || 'Account verification failed');
        } finally {
            setLoadingProfile(false);
        }
    };

    const handleTransfer = async (e) => {
        e.preventDefault();
        if (!transferData.amount || !transferData.description || !transferData.password) {
            toast.warning('All fields are required');
            return;
        }

        if (isNaN(transferData.amount)) {
            toast.warning('Please enter a valid amount');
            return;
        }

        try {
            await makeTransfer({
                ...transferData,
                recipientDetails: accountDetails
            });
            toast.success('Transfer initiated successfully');
            // Reset form
            setTransferData({
                accountNumber: '',
                amount: '',
                description: '',
                password: ''
            });
            setAccountDetails(null);
        } catch (error) {
            toast.error(error.message || 'Transfer failed');
        }
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Card sx={{ padding: 5 }}>
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
                                label="Transaction Password"
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
                                    onClick={() => setAccountDetails(null)}
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
                </MDBox>
            </Card>
        </DashboardLayout>
    );
};

// Simulated API function
const getAccountDetail = async (accountNumber) => {
    return new Promise(resolve => setTimeout(() => resolve({
        code: accountNumber,
        name: "Josiah Victor",
        channel: "Opay",
        active: true
    }), 1000));
};

export default MakeTransaction;