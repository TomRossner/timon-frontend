'use client';

import { Team, Teams } from '@/types/team';
import Link from 'next/link';
import React from 'react';

type Props = {
    teams: Teams;
}

const TeamsList = ({ teams }: Props) => {
    // const teamsMap = use(teamsPromise);

  return (
    <ul className='flex flex-col w-full p-4 gap-2'>
      {teams?.map((team: Team) => (
        <li key={team.teamId} className='w-full border hover:border-blue-500 border-stone-200 rounded-sm hover:scale-[1.02] active:scale-[1.02] transition-all duration-100 overflow-hidden'>
          <Link
            className='flex gap-3 items-center cursor-pointer p-3 text-blue-400 font-semibold text-lg w-full text-start hover:bg-stone-50 active:bg-stone-50 transition-colors duration-100'
            href={`/teams/${team.name}`}
          >
              <div className='size-9 rounded-full bg-stone-200 flex items-center justify-center text-stone-100'>{team.name.split(" ").map(part => part.charAt(0).toUpperCase())}</div>
              {team.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default TeamsList;