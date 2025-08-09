'use client';

import Page from '@/components/Page';
import { useParams } from 'next/navigation';
import React from 'react';

const EventPage = () => {
  const { title } = useParams();
  return (
    <Page id='eventPage' title={title}>
      <>{title}</>
    </Page>
  )
}

export default EventPage;