import Image from 'next/image'
import React, { FC } from 'react'

interface IParams {
  backroundColor: 'bg-blue-1' | 'bg-purple-1' | 'bg-yellow-1' | 'bg-orange-1'
  icon: string
  title: string
  text: string
  handleClick?: () => void
}
const HomeCard: FC<IParams> = ({ backroundColor, icon, text, title, handleClick }) => {

  return (
    <div
      className={`px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer ${backroundColor}`}
      onClick={handleClick}
    >
      <button className='flex-center glassmorphism size-12 rounded-[10px]'

      >
        <Image
          src={icon}
          alt='plus icon'
          width={30}
          height={30}
        />
      </button>

      <div className='flex flex-col gap-1 '>
        <h3 className='text-lg font-bold text-white'>{title}</h3>
        <p className='text-base text-sky-2 font-normal'>{text}</p>
      </div>
    </div>
  )
}

export default HomeCard