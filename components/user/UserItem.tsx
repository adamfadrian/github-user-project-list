/* eslint-disable react-hooks/rules-of-hooks */
import React, { useMemo } from 'react'
import Image from 'next/image'
import { BsArrowRight } from 'react-icons/bs'
import useWindowSize from '@/lib/hooks/use-window-size'
export default function UserItem({
    username,
    image,
    onClick
}: {
    username: string;
    image: string;
    onClick: () => void;
}) {
    const { isDesktop } = useWindowSize()
    return (
        <div className='flex justify-between items-center w-full  border rounded-md px-4 py-2 hover:bg-gray-300/70  hover:cursor-pointer'>
            <div className='flex gap-3 items-center '>
                <Image src={image}
                    alt={username}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '80px', height: '80px', borderRadius: '50%' }} />
                <h1 className='font-semibold hover:cursor-pointer hover:underline' onClick={onClick}>{username}</h1>
            </div>
            <button onClick={onClick} className='hover:translate-x-2 duration-75'>
                <BsArrowRight size={isDesktop ? 30 : 20} />
            </button>
        </div>
    )
}
