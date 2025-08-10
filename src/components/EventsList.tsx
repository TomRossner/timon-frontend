'use client';

import { Event, Events } from '@/types/event';
import Image from 'next/image';
import Link from 'next/link';
import React, { useMemo } from 'react';

type Props = {
    events: Events;
}

const EventsList = ({ events }: Props) => {
    const eventsArr = useMemo(() => Array.from(events.values()), [events]);
  return (
    <ul className='flex flex-col w-full p-4 gap-2'>
      {eventsArr.map((event: Event) => (
        <li key={event.eventId} className='w-full border hover:border-blue-500 border-stone-200 rounded-sm hover:scale-[1.02] active:scale-[1.02] transition-all duration-100 overflow-hidden'>
            <Link
                className='flex gap-3 items-center cursor-pointer p-3 text-blue-400 font-semibold text-lg w-full text-start hover:bg-stone-50 active:bg-stone-50 transition-colors duration-100'
                href={`/events/${event.title.replace('/', '-')}`}
            >
                {event.logo && <Image src={event.logo || ""} alt="" className='bg-white rounded-full size-9 border-2 border-gray-300' />}
                {event.title}
            </Link>
        </li>
      ))}
    </ul>
  )
}

export default EventsList;