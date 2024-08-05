import MeetingTypeList from '@/components/MeetingTypeList'
import React from 'react'

const Home = () => {
  const now = new Date()

  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  const date = (new Intl.DateTimeFormat('en-US', { dateStyle: 'full' })).format(now)

  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>
        <div className='flex flex-col justify-between h-full max-sm:px-5 max-sm:py-8 lg:p-11'>
          <h2 className='glassmorphism font-normal text-base max-w-[260px] text-center py-2 rounded'>Upcoming meeting at 12 PM</h2>
          <div className='flex flex-col gap-2'>
            <h1 className='font-extrabold text-4xl lg:text-6xl'>{time}</h1>
            <p className='text-[#C9DDFF] text-lg lg:text-2xl font-medium'>{date}</p>
          </div>
        </div>
      </div>

      <MeetingTypeList />
    </section>
  )
}

export default Home