'use client'

import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'

const MeetingSetup = ({ setisMeetingSetup }: { setisMeetingSetup: (item: boolean) => void }) => {
  const [isMicCamToggleOn, setisMicCamToggleOn] = useState<boolean>(false)

  const call = useCall()

  if (!call) {
    throw new Error('usecall must be used whithin StreamCall component')
  }

  useEffect(() => {
    if (!isMicCamToggleOn) {
      call?.camera.disable()
      call?.microphone.disable()
    } else {
      call?.camera.enable()
      call?.microphone.enable()
    }
  }, [isMicCamToggleOn, call?.camera, call?.microphone])

  function joinMeeting() {
    setisMeetingSetup(true)
    call?.join()
  }

  return (
    <section className='flex-center w-full h-screen flex-col gap-3 text-white'>
      <h1 className='text-2xl font-bold'>Setup</h1>
      <VideoPreview />
      <div className='flex-center gap-3 h-16' >
        <label className='flex-center font-medium gap-3'>
          <input
            type="checkbox"
            checked={isMicCamToggleOn}
            onChange={(e) => setisMicCamToggleOn(e.target.checked)}
          />
          Join with camera and microphone
        </label>
        <DeviceSettings />
      </div>

      <Button className='rounded-md bg-green-500 px-4 py-2.5 ' onClick={joinMeeting}>
        Join meeting
      </Button>
    </section>
  )
}

export default MeetingSetup