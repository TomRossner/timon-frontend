'use client'

import EventsList from '@/components/EventsList';
import Page from '@/components/Page';
import { selectEvents } from '@/store/events/events.selectors';
import { useAppSelector } from '@/store/hooks';
import React from 'react';

const EventsPage = () => {
    const events = useAppSelector(selectEvents);

  return (
    <Page id='eventsPage' title='Events'>
        <EventsList events={events} />
    </Page>
  )
}

export default EventsPage;