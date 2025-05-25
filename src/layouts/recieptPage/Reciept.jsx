// import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
// import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
// import React from 'react'
// import { useRef } from 'react'
// import Signature from 'assets/images/73934051_9819201-removebg-preview.png'
// import { useNavigate, useParams } from 'react-router-dom';
// import { ArrowBack } from '@mui/icons-material'

// const Receipt = () => {
//     const { id } = useParams()



//     const printRef = useRef();

//     const handlePrint = () => {
//         const printWindow = window.open('', '_blank');
//         const printableContent = printRef.current.innerHTML;

//         printWindow.document.write(`
//             <html>
//                 <head>
//                     <title>Receipt</title>
//                     <style>
//                         @media print {
//                             @page {
//                                 margin: 20px;
//                                 size: A4 portrait;
//                             }
//                             body {
//                                 margin: 0;
//                                 font-family: Arial, sans-serif;
//                                 -webkit-print-color-adjust: exact;
//                             }
//                         }
//                         .print-container {
//                             width: 210mm;
//                             min-height: 297mm;
//                             padding: 20px;

//                         }
//                         .no-print {
//                             display: none !important;
//                         }
//                         .print-content {
//                             margin: 40px auto;
//                             max-width: 600px;
//                           /*  background: white;*/
//                           background:baf8ff;
//                             padding: 30px;
//                             box-shadow: 0 0 10px rgba(0,0,0,0.1);
//                         }
//                         .receipt-header {
//                             text-align: center;
//                             border-bottom: 2px solid #000;
//                             margin-bottom: 20px;
//                             padding-bottom: 10px;
//                         }
//                         .text-4xl {
//                             font-size: 2.25rem;
//                             line-height: 2.5rem;
//                         }
//                     </style>
//                     <script src="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/4.0.0-beta.10/lib.min.js" integrity="sha512-iZkSskGK6ztK3mG293FyahxuEzQjj/qpKBnvMCoXD42sBLOd3ljqCt4nZWbS2YYAEQiNMex832AhAU4nFILWoQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
//                 </head>
//                 <body>
//                     <div class="print-container">
//                         ${printableContent}
//                     </div>
//                 </body>
//             </html>
//         `);

//         printWindow.document.close();
//         printWindow.focus();
//         setTimeout(() => {
//             printWindow.print();
//             printWindow.close();
//         }, 500);
//     };
//     const dummyData = {
//         accountName: "John Doe",
//         code: "**** 1234",
//         amount: "$500.00",
//         transactionType: "Transfer",
//         channel: 'Opay',
//         description: 'Transfer to Opay',

//         date: new Date().toLocaleDateString(),
//         transactionId: id,
//         accountNumber: "1234567890",
//         status: "Successful",

//     };
//     const navigate = useNavigate();

//     return (
//         <DashboardLayout>
//             <DashboardNavbar />
//             <div className='p-2 w-full flex justify-between items-center border border-solid rounded-2 no-print mb-4'>
//                 <div
//                     className='text-sm border border-1 text-black px-4 py-2  cursor-pointer  rounded  hover:bg-gray-600 transition-colors'
//                     onClick={() => navigate(-1)}
//                 >
//                     <ArrowBack className='' />
//                 </div>

//                 <button
//                     className='bg-blue-500 text-sm text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors'
//                     onClick={handlePrint}
//                 >
//                     Download Receipt
//                 </button>
//             </div>

//             {/* Printable Content */}
//             <div ref={printRef} className="print-content bg-blue-300 p-5">
//                 <div className="receipt-header">
//                     <h1 className="text-2xl md:text-4xl font-bold mb-4">
//                         Nexeas Bank - Official Receipt
//                     </h1>
//                     <div className="text-lg">
//                         <p>Date: {new Date().toLocaleDateString()}</p>
//                         <p>Transaction ID: TXN-{id}</p>
//                     </div>
//                 </div>

//                 <div className="mt-8 p-2 rounded-3 bg-blue-200">
//                     <div className="mb-4">
//                         <h2 className="text-xl font-semibold">Transaction Details</h2>
//                         <div className="mt-2">
//                             <p>Sent to: {dummyData.accountName}</p>
//                             <p>Account Number:{dummyData.code}</p>
//                             <p>Amount: {dummyData.amount}</p>
//                             <p>Bank: {dummyData.channel}</p>
//                             <p>Transaction Type: {dummyData.transactionType}</p>
//                             <p>Description: {dummyData.description}</p>
//                         </div>
//                     </div>

//                     <div className="mt-6 px-4 border-t pt-4 flex flex-wrap justify-between items-end w-full ">

//                         <div>
//                             <p className="font-semibold">Thank you for banking with us!</p>
//                             <p className="text-sm text-gray-600 mt-2">
//                                 For any inquiries, please contact support@nexeasbank.com
//                             </p>
//                         </div>
//                         <div className=''>
//                             <img src={Signature} alt="" />
//                             <div><hr /></div>
//                             <p className="text-sm text-gray-600 mt-2">
//                                 Authorized Signature
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </DashboardLayout>
//     )
// }

// export default Receipt
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React, { useRef, useState, useEffect } from 'react'
import Signature from 'assets/images/73934051_9819201-removebg-preview.png'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowBack } from '@mui/icons-material'
import { Loader } from 'lucide-react'
import { useAuth } from 'context/AuthContext'

const Receipt = () => {
    const { id } = useParams()
    const [transactionData, setTransactionData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const printRef = useRef()
    const navigate = useNavigate()
    const { token } = useAuth()
    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const myHeaders = new Headers()
                myHeaders.append(
                    "Authorization",
                    token
                )
                myHeaders.append("Content-Type", "application/json")

                const response = await fetch(
                    `https://nexas-bank-seven.vercel.app/api/bank/history?id=${id}`,
                    {
                        method: "GET",
                        headers: myHeaders,
                        redirect: "follow"
                    }
                )

                if (!response.ok) throw new Error('Failed to fetch transaction')

                const data = await response.json()
                if (data.transactions.length === 0) throw new Error('Transaction not found')

                setTransactionData(data.transactions[0])
                setLoading(false)
            } catch (err) {
                setError(err.message)
                setLoading(false)
            }
        }

        fetchTransaction()
    }, [id])

    const handlePrint = () => {
        const printWindow = window.open('', '_blank')
        const printableContent = printRef.current.innerHTML
        const signatureSrc = window.location.origin + Signature

        printWindow.document.write(`
            <html>
                <head>
                    <title>Receipt</title>
                    <style>
                        @media print {
                            @page {
                                margin: 20px;
                                size: A4 portrait;
                            }
                            body {
                                margin: 0;
                                font-family: Arial, sans-serif;
                                -webkit-print-color-adjust: exact !important;
                            }
                            .print-container {
                           
                            }
                        }
                        .print-container {
                            width: 210mm;
                            min-height: 297mm;
                            padding: 20px;
                            background-color: #baf8ff;
                        }
                        .no-print { display: none !important; }
                        .receipt-header {
                            text-align: center;
                            border-bottom: 2px solid #000;
                            margin-bottom: 20px;
                            padding-bottom: 10px;
                        }
                        .transaction-details {
                            background-color: #e0f8ff;
                            padding: 20px;
                            border-radius: 8px;
                            margin: 20px 0;
                        }
                        .signature-section {
                            margin-top: 40px;
                            text-align: right;
                        }
                    </style>
                </head>
                <body>
                    <div class="print-container">
                        ${printableContent}
                    </div>
                </body>
            </html>
        `)

        printWindow.document.close()
        printWindow.focus()
        setTimeout(() => {
            printWindow.print()
            printWindow.close()
        }, 500)
    }

    if (loading) return <div className='min-h-screen flex justify-center items-center'><h3 className='flex gap-1'><Loader /> Loading receipt...</h3></div>
    if (error) return <div className='min-h-screen flex justify-center items-center'><h3>Error: {error}</h3></div>

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <div className='p-2 w-full flex justify-between items-center border border-solid rounded-2 no-print mb-4'>
                <div
                    className='text-sm border border-1 text-black px-4 py-2 cursor-pointer rounded hover:bg-gray-600 transition-colors'
                    onClick={() => navigate(-1)}
                >
                    <ArrowBack />
                </div>
                <button
                    className='bg-blue-500 text-sm text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors'
                    onClick={handlePrint}
                >
                    Download Receipt
                </button>
            </div>

            <div ref={printRef} style={{ background: '', border: '1px solid black', padding: '30px', maxWidth: '700px', margin: 'auto' }}>
                <div className="receipt-header " style={{ borderBottom: '2px solid black', marginBottom: '20px', paddingBottom: '10px' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: ' 1rem', borderBlockEnd: '2px solid black' }}>
                        Nexeas Bank - Official Receipt
                    </h1>
                    <div>
                        <p>Date: {new Date(transactionData.date).toLocaleDateString()}</p>
                        <p className='break-words '>Transaction ID: NXB-{transactionData._id.toUpperCase()}</p>
                    </div>
                </div>

                <div className="transaction-details">
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
                        Transaction Details
                    </h2>
                    <p style={{ marginBlockEnd: '5px' }}>Sent to : {transactionData.account.name}</p>
                    <p style={{ marginBlockEnd: '5px' }}>Account Number:{transactionData.account.code}</p>
                    <p style={{ marginBlockEnd: '5px' }}>Amount: ${transactionData.amount.toLocaleString()}.00</p>
                    <p style={{ marginBlockEnd: '5px' }}>Bank: {transactionData.account.channel}</p>
                    <p style={{ marginBlockEnd: '5px' }}>Transaction Type: {transactionData.type} transaction</p>
                    <p style={{ marginBlockEnd: '5px' }}>Description: {transactionData.description == 'Transfer to card from External wallet' ? 'Deposit to Debit Card' : transactionData.description}</p>
                    <p style={{ marginBlockEnd: '5px' }}>Status: {transactionData.status}</p>
                </div>

                <div className="mt-6 px-4 border-t pt-4 flex flex-wrap justify-between items-end w-full " style={{ marginBlockStart: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'end', width: '100%' }}>

                    <div>
                        <p className="font-semibold">Thank you for banking with us!</p>
                        <p className="text-sm text-gray-600 mt-2">
                            For any inquiries, please contact support@nexeasbank.com
                        </p>
                    </div>
                    <div className=''>                             <img src={Signature} alt="" />
                        <div><hr /></div>
                        <p className="text-sm text-gray-600 mt-2">
                            Authorized Signature
                        </p>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Receipt