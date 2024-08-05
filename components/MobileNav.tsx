'use client'

import React from 'react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { SidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const MobileNav = () => {
  const pathname = usePathname()

  return (
    <section className='w-full max-w-[260px]'>

      <Sheet>
        <SheetTrigger asChild>
          <Image
            src={'/icons/hamburger.svg'}
            alt='menu'
            width={36}
            height={36}
            className='cursor-pointer sm:hidden'
          />
        </SheetTrigger>

        <SheetContent side={'left'} className='bg-dark-1 border-none'>

          <Link
            href={'/'}
            className='flex items-center gap-1 relative'
          >
            <Image
              src='/icons/logo.svg'
              alt='logo'
              width={32}
              height={32}
              className='max-sm:size-10'
            />
            <p className='font-extrabold text-[26px] text-white '>Conference</p>

          </Link>

          <div className='flex h-[calc(100vh-76px)] flex-col overflow-y-auto justify-between'>

            <SheetClose asChild>
              <div className='flex flex-col gap-4 mt-16 text-white'>
                {
                  SidebarLinks.map((link) => {
                    const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`)
                    return (
                      <SheetClose asChild key={link.label}>
                        <Link
                          href={link.route}

                          className={cn('flex items-center gap-4 w-full max-w-60   p-4 rounded-lg', {
                            'bg-blue-1': isActive,
                          })
                          }
                        >
                          <Image
                            src={link.img}
                            alt={link.label}
                            width={20}
                            height={20}
                          />

                          <p className='font-semibold'>{link.label}</p>
                        </Link>
                      </SheetClose>
                    )
                  })
                }
              </div>
            </SheetClose>

          </div>

        </SheetContent>

      </Sheet>
    </section>
  )
}

export default MobileNav