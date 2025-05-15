import { Tab, Tabs, Typography, Box } from '@mui/material';
import MDBox from 'components/MDBox';
import MDInput from 'components/MDInput';
import { useAuth } from 'context/AuthContext';
import MasterCard from 'examples/Cards/MasterCard';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import { Copy } from 'lucide-react';

import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const DepositIntoCard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [activeTab, setActiveTab] = useState(0)
    const { profile, makeCardTransaction } = useAuth()
    const cardDetails = {
        cardNumber: 54567890123456,
        cardHolderName: profile.fullName,
        expiryDate: '12/27',
        cvv: '123',
    };

    const [depositDetails, setDepositDetails] = useState({
        amount: 0,
        password: ''
    });
    useEffect(() => {
        console.log(depositDetails)
    }, [depositDetails]);
    const handleInputChange = (e) => {
        e.preventDefault();

        const { name, value } = e.target;
        setDepositDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };
    // const submitCardDeposit = async () => {
    //     setLoading(true);
    //     if (!depositDetails.amount || !depositDetails.password) {
    //         toast.error('Please fill in all fields');
    //         setLoading(false);
    //         return;
    //     }
    //     try {
    //         const result = await makeCardTransaction(depositDetails);
    //         console.log('card deposit details', depositDetails)
    //         if (result) {
    //             toast.success('Deposit successful!');
    //             Navigate(`/receipt/result/${result?.transaction?._id}`);
    //         }
    //     } catch (error) {
    //         toast.error(error.message || 'Deposit failed');
    //         setLoading(false);
    //     }
    // }
    const submitCardDeposit = async () => {
        setLoading(true);
        if (!depositDetails.amount || !depositDetails.password) {
            toast.error('Please fill in all fields');
            setLoading(false);
            return;
        }
        if (profile.isActive === false) {
            toast.error("Card Deposit Failed.");
            setLoading(false);
            return;
        }
        try {


            const result = await makeCardTransaction(depositDetails);

            // Add explicit check for transaction ID
            if (!result?.transaction?._id) {
                throw new Error("Transaction ID missing in response");
            }

            console.log('Transaction successful. ID:', result.transaction._id);

            // Navigate FIRST before showing toast
            navigate(`/receipt/${result.transaction._id}`, { replace: true });
            // navigate(`/receipt/6821e76e5bbf4283827cd153`, { replace: true });

            // Show success message after navigation
            toast.success('Deposit successful!');

        } catch (error) {
            console.error('Deposit error:', error);
            toast.error(error.message || 'Deposit failed');
        } finally {
            setLoading(false); // Always reset loading state
        }
    };
    const textRef = useRef(null);

    const copyToClipboard = () => {
        const text = textRef.current.innerText;
        navigator.clipboard.writeText(text)
            .then(() => {
                toast('Wallet address copied to clipboard!');
            })
            .catch((err) => {
                console.error('Failed to copy text: ', err);
            });
    };
    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue)
    }


    return (
        <div>
            <DashboardLayout>
                <DashboardNavbar />
                <Typography variant="h3" gutterBottom> Deposit Into Debit Card</Typography>

                <MDBox sx={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', display: 'flex', gap: 1, flexWrap: { sx: 'wrap', md: 'nowrap' }, flexDirection: { xs: 'column', md: 'row' } }}>
                    <div className="debit-card md:col-4 md:max-w-[350px] w-full">
                        <MasterCard color='secondary' number={cardDetails.cardNumber} holder={cardDetails.cardHolderName} expires={cardDetails.expiryDate} />
                    </div>
                    <MDBox className=' flex md:flex-1 flex-col gap-2 mt-4 md:mt-0'>
                        <Tabs value={activeTab} onChange={handleTabChange} aria-label="history tabs">
                            <Tab label="Deposit From Balance" className='p-2' />
                            <Tab label="Deposit With USDT" className='p-2' />
                        </Tabs>
                        {activeTab === 0 ? <Box className=' bg-gray-50 md:p-3'>
                            <input type="number" placeholder='Amount' name="amount" onChange={handleInputChange} className='border border-1 border-gray-300 p-3 rounded w-full my-2 text-[14px]' />
                            <div className='flex flex-col md:flex-row gap-2'>
                                <input type="password" onChange={handleInputChange} placeholder='Password' name="password" className='border border-1 border-gray-300 p-3 rounded w-full my-2 text-[14px]' />
                                <button className='border-none bg-blue-500 cursor-pointer hover:bg-[#1f1f77] transition-all duration-300 ease-in-out text-white p-3 rounded w-full my-2 text-[14px]' onClick={() => submitCardDeposit()}>{loading ? 'Processing...' : 'Deposit'}</button>
                            </div>
                        </Box> : <Box className=' bg-gray-50 md:p-3 flex flex-col gap-2'>
                            <p className='text-[10px] font-bold mb-2'>
                                Linked Wallet Address:
                            </p>
                            <span className='text-[14px] text-gray-500 p-2 rounded bg-blue-100 overflow-hidden break-words max-w-[400px]' ref={textRef}>
                                {profile?.account?.wallet ? profile?.account?.wallet : 'Wallet Address Unavailable'}
                            </span>
                            <div className='flex'>
                                <button onClick={copyToClipboard} className='border-none bg-blue-500 cursor-pointer hover:bg-[#1f1f77] transition-all duration-300 ease-in-out text-white p-3 rounded my-2 text-[12px]'>
                                    <Copy className='w-4 h-4 inline-block mr-2' />
                                    Copy Wallet Address
                                </button>
                            </div>
                        </Box>}
                    </MDBox>
                </MDBox>
            </DashboardLayout>
        </div>
    )
}

export default DepositIntoCard
