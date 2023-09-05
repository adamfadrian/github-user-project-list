import React, { ReactNode } from 'react'

export default function UserRepoList({
    name,
    visibility,
    onClick,
    children
}: {
    name: string;
    visibility: string;
    children: ReactNode;
    onClick: () => void;
}) {
    return (
        <div className='flex flex-col w-full border rounded-md  text-white p-4 gap-10' >
            <div className='flex gap-4'>
                <button onClick={onClick}>
                    <h1 className='text-blue-400 font-bold text-lg md:text-xl hover:cursor-pointer hover:underline'>
                        {name}
                    </h1>
                </button>
                <div className='border rounded-full  w-14 flex text-center items-center justify-center'>
                    <p className='text-[12px] mb-[5px]'>{visibility[0].toUpperCase() + visibility.slice(1)}</p>
                </div>
            </div>
            <div className='flex flex-wrap gap-2'>
                {children}
            </div>
        </div>
    )
}
