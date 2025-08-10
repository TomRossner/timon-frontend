'use client';

import Page from '@/components/Page';
import { useParams } from 'next/navigation';
import React from 'react';

const EventPage = () => {
  const { title } = useParams<{ title: string }>();
  const decodedTitle = decodeURIComponent(title);

  return (
    <Page id='eventPage' title={decodedTitle}>
      <section>
        
      </section>
    </Page>
  )
}

export default EventPage;