import useWindowSize from '@/lib/hooks/use-window-size'
import Image, { StaticImageData } from 'next/image'
import React from 'react'

export default function UserRepoProfile({
  image,
  alt,
  follower,
  following,
  username,
  onClick
}: {
  image: string | StaticImageData;
  username: string;
  alt: string;
  following: string;
  follower: string;
  onClick: () => void;
}) {
  const { isDesktop } = useWindowSize()
  const imageWidth = isDesktop ? '200px' : '120px'

  return (
    <div className='flex w-full max-w-xl  py-10 border-2 rounded-md border-white mx-auto justify-center p-2 gap-4 md:gap-8'>
      <div >
        <Image src={image}
          alt={alt}
          width={0}
          height={0}
          sizes="100vw"
          priority
          style={{ width: imageWidth, height: imageWidth, borderRadius: '50%' }} />
      </div>
      <div className='flex flex-col text-white justify-center  gap-4'>
        <h1 className='md:mb-4 font-semibold text-2xl md:text-3xl tracking-wider hover:text-blue-500 hover:cursor-pointer hover:underline' onClick={onClick}>
          {username}
        </h1>
        <div className='flex justify-between gap-10 text-lg md:text-2xl'>
          <div className='flex flex-col'>
            <h1>{follower}</h1>
            <h1>Followers</h1>
          </div>
          <div className='flex flex-col'>
            <h1>{following}</h1>
            <h1>following</h1>
          </div>
        </div>
      </div>
    </div>
  )
}
