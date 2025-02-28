import { useState, useEffect } from 'react';
import { Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import MDBox from 'components/MDBox';
import MDButton from 'components/MDButton';
import MDInput from 'components/MDInput';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import { useAuth } from 'context/AuthContext';
import { toast } from 'react-toastify';

const MakeTransaction = () => {
    const [activeTab, setActiveTab] = useState(true);
    const [open, setOpen] = useState(false);
    const [deposit, setDeposit] = useState({ refNo: '', amount: '', description: '' });
    const [withdraw, setWithdraw] = useState({ number: '', bank: '', name: '', amount: '', description: '', password: '' });
    const [buttonContent, setButtonContent] = useState('Submit to proceed');
    const { makeDeposit, makeWithdrawel } = useAuth();

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (!activeTab) {
            setDeposit({ ...deposit, [name]: value });
        } else {
            setWithdraw({ ...withdraw, [name]: value });
        }
    };

    const validateDeposit = () => {
        if (!deposit.refNo || !deposit.amount || !deposit.description) {
            toast.warning('All fields are required for a deposit.');
            return false;
        }
        if (isNaN(deposit.amount) || Number(deposit.amount) <= 0) {
            toast.warning('Enter a valid deposit amount.');
            return false;
        }
        return true;
    };

    const validateWithdrawal = () => {
        if (!withdraw.number || !withdraw.bank || !withdraw.name || !withdraw.amount || !withdraw.description || !withdraw.password) {
            toast.warning('All fields are required for a withdrawal.');
            return false;
        }
        if (isNaN(withdraw.amount) || Number(withdraw.amount) <= 0) {
            toast.warning('Enter a valid withdrawal amount.');
            return false;
        }
        return true;
    };

    const updateDeposit = async () => {
        if (!validateDeposit()) return;
        setButtonContent('Processing...');
        try {
            await makeDeposit(deposit);
            setButtonContent('Submit to proceed');
            toast.success(`Deposit of $${deposit.amount} has been submitted successfully.`);
        } catch (error) {
            setButtonContent('Submit to proceed');
            toast.error(`Deposit failed: ${error.message || 'Something went wrong'}`);
        }
    };

    const submitWithdrawal = async () => {
        if (!validateWithdrawal()) return;
        try {
            await makeWithdrawel(withdraw);
            toast.success(`Withdrawal request of $${withdraw.amount} has been submitted successfully.`);
            handleClose();
        } catch (error) {
            toast.error(`Withdrawal failed: ${error.message || 'Something went wrong'}`);
        }
    };

    useEffect(() => {
        console.log(withdraw);
    }, [withdraw]);

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Card sx={{ padding: 5 }}>
                <div className="outline rounded-lg flex outline-gray-300">
                    <div
                        className={`withdraw rounded-l-lg flex-1 outline outline-gray-300 flex p-2 cursor-pointer hover:text-black justify-center items-center ${activeTab ? 'bg-[#1A73E8] text-white' : ''
                            }`}
                        onClick={() => setActiveTab(true)}
                    >
                        <p>Withdraw</p>
                    </div>
                    <div
                        className={`withdraw flex-1 rounded-r-lg outline outline-gray-300 cursor-pointer flex p-2 hover:bg-gray-100 justify-center items-center ${!activeTab ? 'bg-[#1A73E8] text-white' : ''
                            }`}
                        onClick={() => setActiveTab(false)}
                    >
                        <p>Deposit</p>
                    </div>
                </div>

                <MDBox component="form" className="mt-5">
                    <div className="flex gap-1">
                        <MDInput
                            fullWidth
                            label={activeTab ? 'Account Number' : 'Reference No.'}
                            onChange={handleChange}
                            type={activeTab ? 'number' : 'text'}
                            name={activeTab ? 'number' : 'refNo'}
                        />
                        <MDInput
                            fullWidth
                            label={activeTab ? 'Bank Name' : 'Amount'}
                            onChange={handleChange}
                            name={activeTab ? 'bank' : 'amount'}
                            type={activeTab ? 'text' : 'number'}
                        />
                    </div>
                    {activeTab && (
                        <div className="flex gap-1 mt-2">
                            <MDInput fullWidth label="Account Name" type="text" name="name" onChange={handleChange} />
                            <MDInput fullWidth label="Amount ($)" type="number" name="amount" onChange={handleChange} />
                        </div>
                    )}
                    <div className="flex gap-1 mt-2">
                        <MDInput fullWidth label="Description" type="text" name="description" onChange={handleChange} />
                    </div>
                    <MDButton
                        size="large"
                        variant="contained"
                        color="primary"
                        className="w-full mt-5"
                        onClick={activeTab ? handleClickOpen : updateDeposit}
                    >
                        {buttonContent}
                    </MDButton>
                </MDBox>
            </Card>

            <Dialog open={open} onClose={handleClose}>
                <div className="min-w-[350px]">
                    <DialogTitle>{"Input Password"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <MDInput className="w-full" type="password" name="password" onChange={handleChange} />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions className="flex">
                        <MDButton color="primary" className="w-full" onClick={submitWithdrawal}>
                            Submit
                        </MDButton>
                        <MDButton onClick={handleClose} color="error">
                            Close
                        </MDButton>
                    </DialogActions>
                </div>
            </Dialog>
        </DashboardLayout>
    );
};

export default MakeTransaction;
