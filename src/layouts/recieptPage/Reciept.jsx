import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React from 'react'
import { useRef } from 'react'
import Signature from 'assets/images/73934051_9819201-removebg-preview.png'
const Receipt = () => {
    const printRef = useRef();

    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        const printableContent = printRef.current.innerHTML;

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
                                -webkit-print-color-adjust: exact;
                            }
                        }
                        .print-container {
                            width: 210mm;
                            min-height: 297mm;
                            padding: 20px;
                          
                        }
                        .no-print {
                            display: none !important;
                        }
                        .print-content {
                            margin: 40px auto;
                            max-width: 600px;
                          /*  background: white;*/
                          background:baf8ff;
                            padding: 30px;
                            box-shadow: 0 0 10px rgba(0,0,0,0.1);
                        }
                        .receipt-header {
                            text-align: center;
                            border-bottom: 2px solid #000;
                            margin-bottom: 20px;
                            padding-bottom: 10px;
                        }
                        .text-4xl {
                            font-size: 2.25rem;
                            line-height: 2.5rem;
                        }
                    </style>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/4.0.0-beta.10/lib.min.js" integrity="sha512-iZkSskGK6ztK3mG293FyahxuEzQjj/qpKBnvMCoXD42sBLOd3ljqCt4nZWbS2YYAEQiNMex832AhAU4nFILWoQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
                </head>
                <body>
                    <div class="print-container">
                        ${printableContent}
                    </div>
                </body>
            </html>
        `);

        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 500);
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <div className='p-2 w-full flex justify-between items-center border border-solid rounded-2 no-print mb-4'>
                <button
                    className='bg-blue-500 text-sm text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors'
                    onClick={handlePrint}
                >
                    Download Receipt
                </button>
            </div>

            {/* Printable Content */}
            <div ref={printRef} className="print-content bg-blue-300 p-5">
                <div className="receipt-header">
                    <h1 className="text-4xl font-bold mb-4">
                        Nexeas Bank - Official Receipt
                    </h1>
                    <div className="text-lg">
                        <p>Date: {new Date().toLocaleDateString()}</p>
                        <p>Transaction ID: TXN-{Math.floor(Math.random() * 1000000000000000000000000000)}</p>
                    </div>
                </div>

                <div className="mt-8 p-2 rounded-3 bg-blue-200">
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold">Transaction Details</h2>
                        <div className="mt-2">
                            <p>Account Holder: John Doe</p>
                            <p>Account Number: **** 1234</p>
                            <p>Amount: $500.00</p>
                            <p>Transaction Type: Transfer</p>
                        </div>
                    </div>

                    <div className="mt-6 px-4 border-t pt-4 flex justify-between items-end w-full ">

                        <div>
                            <p className="font-semibold">Thank you for banking with us!</p>
                            <p className="text-sm text-gray-600 mt-2">
                                For any inquiries, please contact support@nexeasbank.com
                            </p>
                        </div>
                        <div className=''>
                            <img src={Signature} alt="" />
                            <div>--------------------------------------</div>
                            <p className="text-sm text-gray-600 mt-2">
                                Authorized Signature
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Receipt