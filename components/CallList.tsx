'use client'

import { useGetCalls } from '@/hooks/useGetCalls'
import React, { useEffect, useState } from 'react'
import Loader from './Loader'
import { useRouter } from 'next/navigation'
import { Call, CallRecording } from '@stream-io/video-react-sdk'
import MeetingCard from './MeetingCard'
import { useToast } from './ui/use-toast'

const CallList = ({ type }: { type: 'upcoming' | 'previous' | 'recordings' }) => {
  const { isLoading, previousCalls, recordingCalls, upcomingCalls } = useGetCalls()

  const [recordings, setRecordings] = useState<CallRecording[]>([])

  const router = useRouter()
  const { toast } = useToast()

  const getCalls = () => {
    switch (type) {
      case 'previous':
        return previousCalls
      case 'recordings':
        return recordings
      case 'upcoming':
        return upcomingCalls
    }
  }
  const getNoCallsMessage = () => {
    switch (type) {
      case 'previous':
        return 'No Previous calls'
      case 'recordings':
        return 'No Recorded calls'
      case 'upcoming':
        return 'No Upcoming calls'
    }
  }

  const calls = getCalls()
  const noCallsMessage = getNoCallsMessage()
  useEffect(() => {

    const fetchRecordings = async () => {
      try {
        const callData = await Promise.all(
          recordingCalls?.map((meeting) => meeting.queryRecordings()) ?? [],
        );

        const recordings = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings);

        setRecordings(recordings);
      } catch (error) {
        if (error instanceof Error) {
          toast({ title: error.name, })
        }
      }
    };

    if (type === 'recordings') {
      fetchRecordings();
    }
  }, [type, recordings]);

  if (isLoading) return <Loader />

  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2'>
      {
        calls && calls.length ?
          calls.map((meeting: Call | CallRecording) => (
            <MeetingCard
              key={(meeting as Call).id}
              icon={
                type === 'previous'
                  ? '/icons/previous.svg'
                  : type === 'upcoming'
                    ? '/icons/upcoming.svg'
                    : '/icons/recordings.svg'
              }
              title={
                (meeting as Call).state?.custom?.description?.substring(0, 25) ||
                (meeting as CallRecording).filename?.substring(0, 20) ||
                'Personal meeting'
              }
              date={
                (meeting as Call).state?.startsAt?.toLocaleString() ||
                (meeting as CallRecording).start_time?.toLocaleString()
              }
              isPreviousMeeting={type === 'previous'}
              link={
                type === 'recordings'
                  ? (meeting as CallRecording).url
                  : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`
              }
              buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
              buttonText={type === 'recordings' ? 'Play' : 'Start'}
              handleClick={
                type === 'recordings'
                  ? () => router.push(`${(meeting as CallRecording).url}`)
                  : () => router.push(`/meeting/${(meeting as Call).id}`)
              }
            />
          ))
          : <h1>{noCallsMessage}</h1>
      }
    </section>
  )
}

export default CallList