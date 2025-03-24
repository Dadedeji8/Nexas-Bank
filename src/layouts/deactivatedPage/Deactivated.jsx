import { Typography } from '@mui/material'
import React from 'react'

const Deactivated = () => {
    return (
        <div className='w-full h-dvh bg-white  items-center'>
            <div className='bg-red-200 p-3 flex flex-col items-center justify-center w-full h-56'>
                <Typography className='text-red-700 font-bold '>Opps!</Typography>
                <Typography className='text-red-700 font-thin text-sm'>Your Account Has Been Deactivated!</Typography>
            </div>
            <div className='p-3 md:px-8 mt-12 mb-5'>

                <Typography className='text-red-700 font-bold text-3xl'>Your Account Has Been Deactivated!</Typography>
                <p className=' '>
                    We noticed Some irregular transactions from your account. Your Account has been deactivated for security reasons that best protect your interest. Visit one of our branches for verification and Re-activation of your account. All your Assets are intact and will be available upon verification
                </p>
            </div>
        </div>
    )
}

export default Deactivated
