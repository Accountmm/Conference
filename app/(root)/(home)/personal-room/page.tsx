'use client'

import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useGetCallByID } from '@/hooks/getCallById'
import { useUser } from '@clerk/nextjs'
import { useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import React from 'react'

const Table = ({ title, desc }: { title: string, desc: string }) => (
  <div className='flex flex-col items-start gap-2 xl:flex-row'>
    <h1 className='text-sky-1 font-medium  text-base lg:text-xl lg:min-w-32'>{title}</h1>
    <h1 className='truncata text-white font-bold text-2xl max-sm:max-w-[320px]'>{desc}</h1>
  </div>
)

const PersonalRoom = () => {
  const router = useRouter();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const { toast } = useToast();

  const meetingId = user?.id;

  const { call } = useGetCallByID(meetingId!);

  const startRoom = async () => {
    if (!client || !user) return;

    const newCall = client.call("default", meetingId!);

    if (!call) {
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }

    router.push(`/meeting/${meetingId}?personal=true`);
  };
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;

  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <h1 className='text-3xl font-bold'>Personal room</h1>

      <div className='flex w-full xl:max-w-[900px] flex-col gap-8 '>
        <Table title='Topic' desc={`${user?.username}'s meeting room`} />
        <Table title='Meeting ID:' desc={`${meetingId}`} />
        <Table title='Invite Link:' desc={`${meetingLink}`} />
      </div>

      <div className='flex gap-5'>
        <Button className='bg-blue-1' onClick={startRoom}>
          Start the meeting
        </Button>
        <Button
          className="bg-dark-3"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({
              title: "Link Copied",
            });
          }}
        >
          Copy Invitation
        </Button>
      </div>
    </section>
  )
}

export default PersonalRoom