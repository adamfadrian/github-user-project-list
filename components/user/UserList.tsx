import React, { ReactNode } from 'react'

export default function UserList({
    search,
    children,
    total
}: {
    search: string;
    children?: ReactNode;
    total: number;
}) {
    return (
        <div className='flex flex-col max-w-4xl border-2 rounded-md w-full mx-auto items-center md:px-6 md:py-4 gap-2'>
            <h1>Hasil Pencarian : <span className='font-semibold text-lg'>{search}</span> (Total: {total})</h1>
            <div className='grid md:grid-cols-2 grid-cols-1 gap-5 w-full p-4 justify-center items-center'>
                {children}
            </div>
        </div>
    )
}
