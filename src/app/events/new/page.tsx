import Page from '@/components/Page';
import React from 'react';

const CreateEventForm = () => {
  return (
    <Page
      id='createNewEventPage'
      title={
        <div className='flex flex-col gap-1'>
          <span>Create an Event</span>
          <span className='text-sm text-stone-400 font-normal'>
            Fill in your events&apos;s details.
          </span>
        </div>
      }
    >
      <></>
    </Page>
  )
}

export default CreateEventForm;