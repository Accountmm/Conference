import { cn } from '@/lib/utils'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { CallControls, CallingState, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk'
import { LayoutList, Users } from 'lucide-react'
import React, { ReactNode, useState } from 'react'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useRouter, useSearchParams } from 'next/navigation'
import EndCallBtn from './EndCallBtn'
import Loader from './Loader'

type CallLayoutType = 'grid' | 'speaker-right' | 'speaker-left'

const MeetingRoom = () => {
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left')
  const [showPartisipients, setShowPartisipients] = useState<boolean>(false)

  const searchParams = useSearchParams()
  const isPrivateRoom = !!searchParams.get('pesonal')

  const router = useRouter()

  const { useCallCallingState } = useCallStateHooks()
  const callingState = useCallCallingState()

  if (callingState !== CallingState.JOINED) return <Loader />

  const CallLayout = (): ReactNode => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />
      case 'speaker-left':
        return <SpeakerLayout participantsBarPosition={'right'} />
      default:
        return <SpeakerLayout participantsBarPosition={'left'} />
    }
  }
  return (
    <section className='relative h-screen w-full overflow-hidden pt-4 text-white'>
      <div className='relative flex size-full items-center justify-center'>
        <div className='flex size-full max-w-[1000px] items-center'>
          <CallLayout />
        </div>

        <div className={cn('h-[100vh-86px] hidden ml-2', { 'show-block': showPartisipients })}>
          <CallParticipantsList onClose={() => setShowPartisipients(false)} />
        </div>
      </div>

      <div className='fixed flex-center bottom-0 w-full gap-5 flex-wrap '>

        <CallControls onLeave={() => router.push('/')} />

        <DropdownMenu>
          <div className='flex items-center'>
            <DropdownMenuTrigger className='cursor-pointer rounded-full bg-[#19232d] p-3 hover:bg-[#4c535d]' >
              <LayoutList size={16} className='text-white' />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className='border-none bg-dark-1 rounded-lg overflow-hidden text-white'>
            {
              ['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, i) => (
                <div key={i}>
                  <DropdownMenuItem className='cursor-pointer px-4 py-3 hover:bg-[#4c535d]' onClick={() => setLayout(item.toLowerCase() as CallLayoutType)}>
                    {item}
                  </DropdownMenuItem>

                  {/* <DropdownMenuSeparator className='border-dark-2' /> */}
                </div>
              ))
            }
          </DropdownMenuContent>
        </DropdownMenu>

        <button onClick={() => setShowPartisipients((prev) => !prev)}>
          <div className='cursor-pointer rounded-full bg-[#19232d] p-3 hover:bg-[#4c535d] '>
            <Users size={16} className='text-white' />
          </div>
        </button>

        <CallStatsButton />
        {
          !isPrivateRoom && (
            <EndCallBtn />
          )
        }
      </div>
    </section>
  )
}

export default MeetingRoom