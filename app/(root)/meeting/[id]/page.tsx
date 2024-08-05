'use client'

import Loader from '@/components/Loader'
import MeetingRoom from '@/components/MeetingRoom'
import MeetingSetup from '@/components/MeetingSetup'
import { useGetCallByID } from '@/hooks/getCallById'
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk'
import { FC, useState } from 'react'

interface IProps {
  params: { id: string }
}

const Meeting: FC<IProps> = ({ params: { id } }) => {
  const { isLoaded, user } = useUser()
  const [isMeetingSetup, setisMeetingSetup] = useState<boolean>(false)

  const { call, isCallLoading } = useGetCallByID(id)

  if (!isLoaded || isCallLoading) return <Loader />

  return (
    <main className='w-full h-screen'>
      <StreamCall call={call}>
        <StreamTheme>
          {
            isMeetingSetup ? (
              <MeetingRoom />
            )
              : (
                <MeetingSetup setisMeetingSetup={setisMeetingSetup} />
                // TODO: Meeting Setup
              )
          }
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default Meeting