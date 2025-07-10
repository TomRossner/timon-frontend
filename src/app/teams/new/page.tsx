import CreateTeamForm from '@/components/CreateTeamForm';
import Page from '@/components/Page';
import React from 'react';

const CreateNewTeamPage = () => {
  
  return (
    <Page
      id='createNewTeamPage'
      title={
        <div className='flex flex-col gap-1'>
          <span>Create a Team</span>
          <span className='text-sm text-stone-400 font-normal'>
            Fill in your team&apos;s details.
          </span>
        </div>
      }
    >
      <CreateTeamForm />
    </Page>
  )
}

export default CreateNewTeamPage;