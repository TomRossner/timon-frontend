'use client';

import Page from '@/components/Page';
import { Button } from '@/components/ui/button';
import { selectUserProfile } from '@/store/auth/auth.selectors';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { openModal } from '@/store/modals/modals.slice';
import Image from 'next/image';
import React from 'react';

const width = 120;
const height = 120;

const ProfilePage = () => {
    const userProfile = useAppSelector(selectUserProfile);
    const fullName = `${userProfile?.firstName} ${userProfile?.lastName}`;

    const dispatch = useAppDispatch();
  return (
    <Page id='profilePage' title='My Profile'>
        <div className='flex gap-4 items-center'>
            {userProfile?.image
                ? <Image
                    src={userProfile.image}
                    alt=''
                    width={width}
                    height={height}
                    className='rounded-full border-gray-400 border-2 bg-white'
                />
                : <div
                    style={{
                        width: `${width}px`,
                        height: `${height}px`
                    }}
                    className='rounded-full border-gray-400 border-2 bg-white'
                />
            }
            <h2 className='font-semibold text-2xl'>{fullName} {userProfile?.userName && <span className='text-lg font-normal text-gray-400 italic'>({userProfile?.userName})</span>}</h2>
        </div>

        <div className=''>
            <Button
                onClick={() => dispatch(openModal('deleteAccount'))}
                className='cursor-pointer text-white bg-red-500 hover:bg-red-400'
            >
                Delete my account
            </Button>
        </div>
    </Page>
  )
}

export default ProfilePage;