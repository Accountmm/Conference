import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { FC, ReactNode } from 'react'

interface IParams {
  children: ReactNode
}

const HomeLayout: FC<IParams> = ({ children }) => {
  return (
    <main className='relative'>
      <Navbar />

      <div className='flex'>
        <Sidebar />

        <section className='flex flex-col min-h-screen flex-1 px-6 pb-6 pt-28 max-md:pb-14 sm:px-14 '>
          <div className='w-full'>
            {children}
          </div>
        </section>
      </div>
    </main>
  )
}

export default HomeLayout