'use client'

import React, { useState } from 'react'
import HomeCard from './HomeCard'
import MeetingModel from './MeetingModel'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import { useToast } from './ui/use-toast'
import { Textarea } from './ui/textarea'
import ReactDatePicker from 'react-datepicker'
import { Input } from './ui/input'

interface IValues {
  dateTime: Date,
  link: string,
  description: string,
}

const MeetingTypeList = () => {
  const { toast } = useToast()

  const [meetingState, setMeetingState] = useState<'isSheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>()
  const [values, setvalues] = useState<IValues>({
    dateTime: new Date(),
    link: '',
    description: '',
  })
  const [callDetails, setCallDetails] = useState<Call>()


  const { user } = useUser()
  const streamClient = useStreamVideoClient()

  const router = useRouter();

  async function createMeeting() {
    if (!user || !streamClient) return

    try {
      if (!values.dateTime) {
        toast({ title: 'Select date and time' })
        return
      }
      const callId = crypto.randomUUID()
      const call = streamClient.call('default', callId);

      if (!call) throw new Error('Can;t join to meeting')

      const startAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString()
      const desripton = values.description || 'Instant meeting'

      await call.getOrCreate({
        data: {
          starts_at: startAt,
          custom: {
            desripton,
          }
        }
      })

      setCallDetails(call)

      if (!values.description) router.push(`/meeting/${call.id}`)
      toast({ title: 'Meeting created' })
    } catch (error) {
      console.warn(error);
      toast({ title: "Fail to create meeting try again" })
    }
  }

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`
  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
      <HomeCard
        backroundColor='bg-orange-1'
        icon='/icons/add-meeting.svg'
        title='New Meeting'
        text='Setup a new recording'
        handleClick={() => setMeetingState('isInstantMeeting')}
      />
      <HomeCard
        backroundColor='bg-blue-1'
        icon='/icons/join-meeting.svg'
        title='Join Meeting'
        text='via invitation link'
        handleClick={() => setMeetingState('isJoiningMeeting')}
      />
      <HomeCard
        backroundColor='bg-purple-1'
        icon='/icons/schedule.svg'
        title='Schedule Meeting'
        text='Plan your meeting'
        handleClick={() => setMeetingState('isSheduleMeeting')}
      />
      <HomeCard
        backroundColor='bg-yellow-1'
        icon='/icons/recordings.svg'
        title='View Recordings'
        text='Meeting recordings'
        handleClick={() => router.push('/recordings')}
      />
      {
        !callDetails ? (
          <MeetingModel
            isOpen={meetingState === 'isSheduleMeeting'}
            onClose={() => setMeetingState(undefined)}
            title='Create meeting'
            handleClick={createMeeting}
          >
            <div className='flex flex-col gap-5'>
              <div className='flex flex-col gap-2.5'>
                <label className='text-sky-2 font-normal leading-[22px] text-base' htmlFor="desc">Add a description</label>
                <Textarea
                  className='bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0 border-none outline-none'
                  id='desc'
                  onChange={(e) => setvalues({ ...values, description: e.target.value })}
                />
              </div>
              <div className='flex flex-col gap-2.5'>
                <label className='text-sky-2 font-normal leading-[22px] text-base' htmlFor="desc">Select Date & Time</label>
                <ReactDatePicker
                  selected={values.dateTime}
                  onChange={(date) => setvalues({ ...values, dateTime: date! })}
                  showTimeSelect
                  timeFormat='HH:MM'
                  timeIntervals={15}
                  timeCaption='time'
                  dateFormat={'MMMM d, yyyy h:mm aa'}
                  className='w-full rounded-md bg-dark-3 border-none p-2 text-sky-2'
                />
              </div>
            </div>
          </MeetingModel>
        ) : (
          <MeetingModel
            isOpen={meetingState === 'isSheduleMeeting'}
            onClose={() => setMeetingState(undefined)}
            title='Meeting Created'
            className='text-center'
            buttonText='Copy meeting link'
            handleClick={() => {
              navigator.clipboard.writeText(meetingLink)
              toast({ title: 'Link copied' })
            }}
            image='/icons/checked.svg'
            buttonIcon='/icons/copy.svg'
          />
        )
      }

      <MeetingModel
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title='Start an instant meeting'
        className='text-center'
        buttonText='Start meeting'
        handleClick={createMeeting}
      />

      <MeetingModel
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        title='Type the link here'
        className='text-center'
        buttonText='join meeting'
        handleClick={() => router.push(values.link)}
      >
        <Input
          placeholder='Type a link'
          className='border-none focus-visible:ring-offset-0 bg-dark-3'
          onChange={(e) => setvalues({ ...values, link: e.target.value })}
        />
      </MeetingModel>
    </section>
  )
}

export default MeetingTypeList