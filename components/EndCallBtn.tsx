'use client'

import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

const EndCallBtn = () => {
  const router = useRouter()

  const call = useCall()

  const isCreatedByMe = call?.isCreatedByMe

  if (!isCreatedByMe) return <></>

  return (
    <Button
      className='bg-red-500 '
      onClick={async () => {
        await call.endCall()
        router.push('/')
      }} >
      End call for everyone
    </Button>
  )
}

export default EndCallBtn