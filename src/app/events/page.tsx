'use client'

import EventsList from '@/components/EventsList';
import Page from '@/components/Page';
import { Button } from '@/components/ui/button';
import { selectEvents } from '@/store/events/events.selectors';
import { useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import React from 'react';
import { BsPlus } from 'react-icons/bs';

const EventsPage = () => {
    const events = useAppSelector(selectEvents);
    const router = useRouter();

  return (
    <Page
      id='eventsPage'
      title={
        <div className='flex w-full justify-between items-center'>
          <p>Events</p>
          
          <Button
            className='cursor-pointer bg-blue-500 text-stone-200 hover:bg-blue-600 hover:text-white active:bg-blue-600 active:text-white'
            onClick={() => router.push('/events/new')}
          >
            <BsPlus className='text-stone-200 text-xl'/>
            Create event
          </Button>
        </div>
      }
    >
        <EventsList events={events} />
    </Page>
  )
}

export default EventsPage;