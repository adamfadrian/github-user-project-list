import { Button } from '@mui/material'
import React from 'react'
import LoadingDots from './loading-dots'

interface CustomButtonProps {
    isLoading?: boolean,
    icon?: React.ReactNode,
}

export default function CustomButton({
    isLoading = false,
    icon
}: CustomButtonProps) {
    return (
        <Button type='submit' variant="outlined"
            sx={{
                color: 'white',
                borderColor: 'white',
                "&:hover": {
                    borderColor: 'white',
                },
                "&.Mui-focusVisible": {
                    borderColor: 'white',
                }
            }}>
            {isLoading ? <LoadingDots /> : icon}
        </Button>
    )
}
