import { TextField } from "@mui/material";
import { InputHTMLAttributes } from "react";
import React from 'react'

export default function CustomInput({
    value,
    onChange
}: {
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>
}) {
    return (
        <TextField value={value} variant='outlined' onChange={onChange}
            placeholder="type username here.."
            InputProps={{
                style: {
                    color: 'white',
                    borderColor: 'white'
                },
            }}
            sx={{
                "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                        borderColor: 'white'
                    },
                    "&:hover fieldset": {
                        borderColor: 'white'
                    },
                    "&.Mui-focused fieldset": {
                        borderColor: 'primary',
                    }
                }
            }}
        />
    )
}
