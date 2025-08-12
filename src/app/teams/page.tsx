'use client';

import Page from '@/components/Page';
import TeamsList from '@/components/TeamsList';
import { Button } from '@/components/ui/button';
import { LINKS } from '@/lib/links';
import { useAppSelector } from '@/store/hooks';
import { selectTeams } from '@/store/teams/teams.selectors';
import { useRouter } from 'next/navigation';
import React from 'react';
import { BsPlus } from "react-icons/bs";

const TeamsPage = () => {
  // const teamsPromise = getTeams();
  const teams = useAppSelector(selectTeams);
  const router = useRouter();

  return (
    <Page
      id='teamsPage'
      title={
        <div className='flex w-full justify-between items-center'>
          <p>Teams</p>
          
          <Button
            className='cursor-pointer bg-blue-500 text-stone-200 hover:bg-blue-600 hover:text-white active:bg-blue-600 active:text-white'
            onClick={() => router.push(LINKS.TEAMS_NEW)}
          >
            <BsPlus className='text-stone-200 text-xl'/>
            Create team
          </Button>
        </div>
      }
    >

      <TeamsList teams={teams} />
      {/* <Suspense fallback={<div className='text-center'>Loading...</div>}>
        <TeamsList teamsPromise={teamsPromise} />
      </Suspense> */}
    </Page>
  )
}

export default TeamsPage;