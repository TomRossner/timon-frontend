'use client';

import Page from '@/components/Page';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAppSelector } from '@/store/hooks';
import { selectTeams } from '@/store/teams/teams.selectors';
import { Players } from '@/types/player';
import { useParams } from 'next/navigation';
import React, { useMemo } from 'react';
import { SlOptionsVertical } from "react-icons/sl";
import { IoNavigate, IoShareSocial, IoCopySharp  } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

const TeamPage = () => {
  const { name } = useParams();
  const teams = useAppSelector(selectTeams);

  const team = useMemo(() => (
    teams.size
      ? Array.from(teams.values())
        .find(t =>
          t.name.toLowerCase() === name?.toString().toLowerCase()
        )
      : null
  ), [teams, name]);

  return (
    <Page
      id='teamPage'
      title={
        <div className='flex w-full items-center gap-4'>
          <Avatar className='size-16'>
            <AvatarImage src={team?.logo} />
            <AvatarFallback className='text-2xl font-semibold text-stone-400 bg-stone-200'>
              {name?.toString().split(" ").map(part => part.charAt(0).toUpperCase())}
            </AvatarFallback>
          </Avatar>
          <p className='text-stone-800 grow'>{name?.toString()}</p>

          <DropdownMenu>
            <DropdownMenuTrigger className='bg-stone-200 rounded-md text-base p-2 text-stone-500'><SlOptionsVertical /></DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>{name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem><MdEdit /> Edit</DropdownMenuItem>
              <DropdownMenuItem><IoShareSocial /> Share</DropdownMenuItem>
              <DropdownMenuItem><IoCopySharp /> Copy field address</DropdownMenuItem>
              <DropdownMenuItem><IoNavigate /> Navigate</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      }
    >
      <section className='flex flex-col gap-3'>
        <div>
          <p className='text-stone-500 font-semibold'>Manager</p>
          <div className='flex items-center gap-2'>
            <Avatar className='size-9'>
              <AvatarImage src={team?.logo} />
              <AvatarFallback className='text-lg font-semibold text-stone-400 bg-stone-200'>
                {team?.manager.firstName.charAt(0).toUpperCase()}
                {team?.manager.lastName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <p className='flex gap-1'>
              <span>{team?.manager.firstName}</span>
              <span>{team?.manager.lastName}</span>
            </p>
          </div>
        </div>
        
        <div>
          <p className='text-stone-500 font-semibold'>Coach(es)</p>
          {Array.from((team?.coaches as Players).values()).map(player => (
            <div key={player.user.uid} className='flex items-center gap-2'>
              <Avatar className='size-9'>
                <AvatarImage src={team?.logo} />
                <AvatarFallback className='text-lg font-semibold text-stone-400 bg-stone-200'>
                  {player.user.firstName.charAt(0).toUpperCase()}
                  {player.user.lastName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <p className='flex gap-1'>
                <span>{team?.manager.firstName}</span>
                <span>{team?.manager.lastName}</span>
              </p>
            </div>
          ))}
        </div>
      </section>
    </Page>
  )
}

export default TeamPage;