'use client'

import { SidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
  const pathname = usePathname()
  return (
    <section className='sticky left-0 top-0 h-screen bg-dark-1  flex flex-col justify-between px-6 pt-28 text-white max-sm:hidden lg:w-[264px]'>
      <div className='flex flex-1 flex-col gap-6'>
        {
          SidebarLinks.map((link) => {
            const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`)
            return (
              <Link
                href={link.route}
                key={link.label}
                className={cn('flex items-center gap-4 justify-start p-4 rounded-lg', {
                  'bg-blue-1': isActive,
                })
                }
              >
                <Image
                  src={link.img}
                  alt={link.label}
                  width={24}
                  height={24}
                />

                <p className='font-semibold text-lg max-lg:hidden'>{link.label}</p>
              </Link>
            )
          })
        }
      </div>
    </section >
  )
}

export default Sidebar